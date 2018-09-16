<template>
  <div id='app'>
    <transition name="pages-anim">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods : {
    validateEmail(mail) {
      return this.$store.state.emailRegExp.test(mail)
    },
    validatePassword(password) {
      return this.$store.state.passwordRegExp.test(password)
    },
    validateUsername(username) {
      return this.$store.state.usernameRegExp.test(username)
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
