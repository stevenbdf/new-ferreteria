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