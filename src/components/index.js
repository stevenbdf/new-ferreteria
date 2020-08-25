import Vue from "vue";
const components = ['Navbar']

components.forEach(map => {
 Vue.component(map.toLowerCase(),()=>import(`@/components/${map}.vue`))
})