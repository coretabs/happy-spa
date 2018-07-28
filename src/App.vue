<template>
  <div id='app'>
    <!-- <app-header/> -->
    <transition name="pages-anim"> <!-- enter-active-class="animated slideInLeft" > <leave-active-class="animated slideOutRight"-->
      <router-view/>
    </transition>
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
  },
  data : () => {
    return {
      emailValidate : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }
  },
  methods : {
    validateEmail(mail) {
      return this.emailValidate.test(mail);
    }
  }
}
</script>

<style>
  @import '../css/style.css';

  .pages-anim-enter-active {
    animation: in .1s;
    animation-delay: .2s;
    opacity: 0;
  }
  .pages-anim-leave-active {
    animation: out .1s;
  }

  @keyframes out {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-30px);
      opacity: 0;
    }
  }

  @keyframes in {
    from {
      transform: translateX(-30px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
