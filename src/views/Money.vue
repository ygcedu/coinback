<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
// import model from '@/model.js';
const model = require('@/model.js').default;

const version = window.localStorage.getItem('version') || '0';
const recordList: Record[] = model.fetch();

if (version === '0.0.1') {
  // 数据库升级，数据迁移
  recordList.forEach(record => {
    record.createAt = new Date(2020, 0, 1);
  });
  // 保存数据
  model.save(recordList);
} else if (version === '0.0.2') {
  // 迁移
}

window.localStorage.setItem('version', '0.0.3');

type Record = {
  tags?: string[]
  notes: string
  type: string
  amount: number // 数据类型 object | string | number ...
  createAt?: Date // 类 / 构造函数
}

@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  recordList: Record[] = recordList;
  record: Record = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    // 深拷贝
    const record2 = JSON.parse(JSON.stringify(this.record));
    record2.createAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }

  @Watch('recordList')
  onRecordListChanged() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  // 从下往上布局
  flex-direction: column-reverse;
}
</style>