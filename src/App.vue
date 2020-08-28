<template>
  <component v-bind:is="layout"></component>
</template>

<script>
export default {
  computed: {
    layout(){
      return this.$route.meta.layout || 'landing'
    }
  }
}
</script>

<style lang="scss">
@import url("https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css");
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>