<template>
  <svg>
    <use :xlink:href="'#'+name"></use>
  </svg>
</template>

<script lang="ts">
// eslint-disable-next-line no-undef
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}

export default {
  props: ['name'],
  name: 'Icon'
};
</script>

<style lang="scss" scoped>

</style>