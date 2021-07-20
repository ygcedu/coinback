<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" height="48px"/>
    <ol>
      <li v-for="group in result" :key="group.title">
        <h3 class="title">{{ beautify(group.title) }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span>{{ tagString(item.tags) }}</span>
            <!-- fixme: 备注是很长的英文时会显示水平滚动条 -->
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>


<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import {RecordItem, RootState, Tag} from '@/custom';
import dayjs from 'dayjs';

const oneDay = 86400 * 1000;
@Component({components: {Tabs},})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  beautify(string: string) {
    const now = new Date();
    if (dayjs(string).isSame(now, 'day')) {
      return '今天';
    } else if (dayjs(string).isSame(now.valueOf() - oneDay, 'day')) {
      return '昨天';
    } else {
      return string;
    }
  }

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

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  @extend %item;
  background: white;
}

.notes {
  margin-right: auto; // 让备注靠左一些
  margin-left: 16px;
  color: #999;
}
</style>
