<template>
  <Layout>
    <Types class-prefix="type" :value.sync="yyy"/>
    <Tabs class-prefix="type" :data-source="array2" :value.sync="yyy"/>
    <Tabs class-prefix="interval" :data-source="array" :value.sync="hhh"/>
  </Layout>
</template>

<style lang="scss" scoped>
//.x /deep/ li {
//  border: 1px solid red;
//}
::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/Money/Types.vue';
import Tabs from '@/components/Tabs.vue';

@Component({components: {Tabs, Types},})
export default class Statistics extends Vue {
  yyy = '-';
  hhh = 'day';
  array = [
    {text: '按天', value: 'day'},
    {text: '按周', value: 'week'},
    {text: '按月', value: 'month'}
  ];
  array2 = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'}
  ];
}
</script>