<template>
  <footer class="bottomFooter box-shadow">
    <ul>
      <li>
        <router-link :class="{actieFooterLink: this.home == 'isHome'}" to="/home" v-if>
          <i class="home fontSize30"></i>
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <i class="notifications fontSize30"></i>
        </router-link>
      </li>
      <li>
        <router-link :class="{actieFooterLink: this.newpost == 'isNewpost'}" to="/newpost">
          <i class="add_box fontSize30"></i>
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <i class="explore fontSize28"></i>
        </router-link>
      </li>
      <li>
        <router-link :class="{actieFooterLink: this.profile == 'isProfile'}" to="/profile">
          <i class="person fontSize30"></i>
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  props: ["home", "newpost", "profile", "isAvatar"],
  data() {
    return {
      footerChat: false
    };
  }
};
</script>
