<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import {RecordItem} from '@/custom';
import tagListModel from '@/models/tagListModel';

const version = window.localStorage.getItem('version') || '0';
const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

if (version === '0.0.1') {
  // 数据库升级，数据迁移
  recordList.forEach(record => {
    record.createAt = new Date(2020, 0, 1);
  });
  // 保存数据
  recordListModel.save(recordList);
} else if (version === '0.0.2') {
  // 迁移
}

window.localStorage.setItem('version', '0.0.3');

@Component({
  components: {Tags, FormItem, Types, NumberPad}
})
export default class Money extends Vue {
  tags = tagList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

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
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }

  @Watch('recordList')
  onRecordListChanged() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  // 从下往上布局
  flex-direction: column-reverse;
}

.notes {
  // 想要 EditLabel 高度不一样，就给外部包裹用 div 加 padding
  padding: 12px 0;
}
</style>