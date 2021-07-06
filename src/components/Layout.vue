<template>
  <div class="layout-wrapper">
    <div class="content" :class="contentClass">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  props: ['contentClass'],
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  overflow: auto;
  /*尽量把所有的高度都给 content*/
  flex-grow: 1;
}
</style>