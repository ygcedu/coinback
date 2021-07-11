<template>
  <div>
    <label class="formItem">
      {{ value }}
      <span class="name">{{ this.fieldName }}</span>
      <input type="text"
             v-model="value"
             @input="$emit('update:value',$event.target.value)"
             :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) value!: string;

  @Prop({required: true}) fieldName!: string;
  // @Prop({default: '在这里输入备注'}) placeholder!: string;
  @Prop() placeholder?: string;

  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    // padding: 16px 0;
    // line-height: 64px;
    height: 44px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>