<template>
  <div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~@/assets/styles/helper.scss";
@import "~@/assets/styles/reset.scss";
body {
  background: #f5f5f5;
}

#app {
  /*针对苹果系统的优化*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*浅黑色*/
  color: #333;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
}
</style>
