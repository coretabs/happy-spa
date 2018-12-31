<template>
  <div>
    <div class="overlay" v-if="report" @click="closeReport"></div>
    <div class="overlay" v-if="error" @click="closeError"></div>
    <div class="overlay" v-if="confirm" @click="closeConfirm"></div>
  </div>
</template>

<script>
  export default {
    props : ['closeError' , 'error'  , 'closeReport' , 'confirm' , 'closeConfirm' , 'report'],
    data : function () { 
      return {
      }
    },
    methods : {
      reportClosed : () => this.report = false,
      errorClosed : () => this.error = false,
      confirmClosed : () => this.confirm = false,
      reportOpend : () => this.report = true,
      errorOpend : () => this.error = true,
      confirmOpend : () => this.confirm = true,
    },
    created () {
      this.$on('reportClosed' , this.reportClosed)
      this.$on('errorClosed' , this.errorClosed)
      this.$on('confirmClosed' , this.confirmClosed)
      this.$on('openReport' , this.reportOpend)
      this.$on('openError' , this.errorOpend)
      this.$on('openConfirm' , this.confirmOpend)
    },
    watch : {
      report : function () {
        if (this.report) {
          this.reportOpend()
        } else {
          this.reportClosed()
        }
      }
    }
  }
</script>

<style scoped>
.overlay {
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  position: fixed;
  left: 0;
  overflow: hidden;
  top: 0;
  z-index: 20;
  cursor: pointer;
  display: block;
}
</style>
