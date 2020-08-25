import Vue from "vue";
const components = ['app','landing']

components.forEach(map => {
 Vue.component(map.toLowerCase(),()=>import(`@/layout/${map}.vue`))
})