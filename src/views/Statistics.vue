<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" height="48px"/>
    <div>
      type:{{ type }}
      <br/>
      interval:{{ interval }}
    </div>
    <div>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3>{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id">
              {{ item.amount }} {{ item.createdAt }}
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import {RecordItem, RootState} from '@/custom';

@Component({components: {Tabs},})
export default class Statistics extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    // this.recordList;
    // 推荐写法：
    const {recordList} = this;
    type HashTableValue = { title: string, items: RecordItem[] };
    // 声明一个对象的 key、value 类型，这里的 key 只是一个示意值，也可以是其他的
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [data, time] = recordList[i].createdAt!.split('T');
      console.log(data);
      hashTable[data] = hashTable[data] || {title: data, items: []}; //如果是空的，就等于一个数组
      hashTable[data].items.push(recordList[i]);
    }
    console.log(hashTable);
    return hashTable;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: white;

    &.selected {
      background: #c4c4c4;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    /*height: 48px;*/
  }
}
</style>