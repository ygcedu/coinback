<template>
  <div class="nav-warpper">
    <div class="content">
      Statistics.vue
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Statistics'
};
</script>

<style lang="scss" scoped>
.nav-warpper {
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  border: 1px solid blue;
  overflow: auto;
  /*尽量把所有的高度都给 content*/
  flex-grow: 1;
}
</style>