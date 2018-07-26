<template>
  <div id='app'>
    <!-- <app-header/> -->
    <router-view/>
    <!-- <app-footer/> -->
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
export default {
  name: 'App',
  components: {
  //  'app-header': AppHeader,
  //  'app-footer': AppFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
