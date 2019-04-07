<template>
  <v-footer z-index="60" height="50" app inset class="box-shadow white">
    <v-layout
      justify-center
      row
      wrap
    >
      <v-btn flat inset @click="$router.push('/home')" v-if>
        <i :class="activeHome" class="home fontSize30"></i>
      </v-btn>
      <v-btn flat @click="$router.push('#')">
        <i class="notifications fontSize30 blue-grey--text text--lighten-3"></i>
      </v-btn>
      <v-btn flat @click="$router.push('/newpost')">
        <i :class="activeNewpost" class="add_box fontSize30"></i>
      </v-btn>
      <v-btn flat @click="$router.push('#')">
        <i class="explore fontSize28 blue-grey--text text--lighten-3"></i>
      </v-btn>
      <v-btn flat @click="$router.push('/profile')">
        <i :class="activeProfile" class="person fontSize30"></i>
      </v-btn>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  props: ["home", "newpost", "profile", "isAvatar"],
  data() {
    return {
      footerChat: false,
    };
  },
  computed: {
    activeHome() {
      return this.home == 'isHome' 
        ? 'yellow--text accent-3'
        : 'blue-grey--text text--lighten-3'
    },
    activeNewpost() {
      return this.newpost == 'isNewpost'
        ? 'yellow--text accent-3'
        : 'blue-grey--text text--lighten-3'
    },
    activeProfile() {
      return this.profile == 'isProfile'
        ? 'yellow--text accent-3'
        : 'blue-grey--text text--lighten-3'
    }
  }
}
</script>

<style lang="scss">
    @import '../assets/style/vars';

    footer {
      z-index: 60!important;
      .layout {
        button {
          height: 50px;
          margin: 0;
          width: 20%;
          min-width: 0;
        }
      }
    }
</style>