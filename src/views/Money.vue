<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags/>
    {{ count }}
    <button @click="add">+1</button>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {RecordItem} from '@/custom';

@Component({
  components: {Tags, FormItem, Types, NumberPad},
  computed: {
    count() {
      return this.$store2.count;
    },
    recordList(){
      return this.$store2.recordList; // recordList 地址复制到 recordList
    }
  }
})
export default class Money extends Vue {
  add() {
    this.$store2.addCount();
  }

  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    this.$store2.createRecord(this.record);
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