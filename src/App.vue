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
// TailwindCSS
@import "tailwindcss/base";

@import "tailwindcss/components";

@import "tailwindcss/utilities";
// Bulma
@import url("https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css");
@import "~bulma";
@import "~buefy/src/scss/buefy";
.field-bottom{
  display: flex;
  align-items: flex-end;
}
</style>