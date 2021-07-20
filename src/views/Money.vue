<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {RecordItem} from '@/custom';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs, Tags, FormItem, NumberPad},
})
export default class Money extends Vue {
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  get recordList() {
    return this.$store.state.recordList; // recordList 地址复制到 recordList
  }

  recordTypeList = recordTypeList;

  created() {
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
  }
}
</script>

<style lang="scss" scoped>
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