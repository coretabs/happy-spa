<template>
  <div>
    <div class="overlay" v-if="report" @click="closeReport"></div>
    <div class="overlay" v-if="error" @click="closeError"></div>
    <div class="overlay" v-if="alert" @click="closeAlert"></div>
    <div class="overlay" v-if="confirm" @click="closeConfirm"></div>
    <div class="overlay" v-if="next" @click="closeNext"></div>
  </div>
</template>

<script>
  export default {
    props : ['closeError' , 'error' , 'closeAlert' , 'alert' , 'closeReport' , 'confirm' , 'closeConfirm' , 'report' , 'next' , 'closeNext'],
    data : function () { 
      return {
      }
    },
    methods : {
      reportClosed : () => this.report = false,
      errorClosed : () => this.error = false,
      alertClosed : () => this.alert = false,
      confirmClosed : () => this.confirm = false,
      nextClosed : () => this.next = false,
      reportOpend : () => this.report = true,
      errorOpend : () => this.error = true,
      alertOpend : () => this.alert = true,
      confirmOpend : () => this.confirm = true,
      nextOpend : () => this.next = true,
    },
    created () {
      this.$on('reportClosed' , this.reportClosed)
      this.$on('errorClosed' , this.errorClosed)
      this.$on('alertClosed' , this.alertClosed)
      this.$on('confirmClosed' , this.confirmClosed)
      this.$on('nextClosed' , this.nextClosed)
      this.$on('openReport' , this.reportOpend)
      this.$on('openError' , this.errorOpend)
      this.$on('openAlert' , this.alertOpend)
      this.$on('openConfirm' , this.confirmOpend)
      this.$on('openNext' , this.nextOpend)
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
