<template>
  <div>
    <ul class="types">
      <!-- 如果是 false，vue 会智能地忽略掉 -->
      <!-- 等价于: type === '-' ? 'selected' : ''-->
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  props: {
    propMessage: String
  }
})
export default class Types extends Vue {
  type = '-';// '-'表示支出，'+'表示收入
  helloMsg = 'hello, ' + this.propMessage;

  selectType(type: string) {// type 只能是 '-' 和 '+' 中的一个
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.type = type;
  }
}

// export default {
//   name: 'Types',
//   props: ['xxx'],
//   data() {
//     return {
//       type: '-'// '-'表示支出，'+'表示收入
//     }
//   },
//   mounted() {
//     console.log(this.xxx)
//   },
//   methods: {}
// }
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    // 行高和高度一致是为了保证文字垂直居中
    // line-height: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    // 使用伪元素法而不是用 border-bottom，因为加 border 会让文字上移
    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>