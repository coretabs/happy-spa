<template>
  <footer class="bottomFooter box-shadow">
    <div class="chat" v-if="isAvatar && footerChat">
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <form action @submit="$event.preventDefault()">
            <textarea
              dir="auto"
              class="textarea"
              :disabled="loading"
              type="text"
              v-model="commentTxt"
              rows="1"
              placeholder="اكتب تعليق..."
            ></textarea>
            <div class="leftTextarea left">
              <a @click="addcomment" class="icon is-small">
                <i class="keyboard_arrow_left fontSize20"></i>
              </a>
              <a v-if="false" class="icon is-small">
                <i class="sentiment_satisfied fontSize20"></i>
              </a>
            </div>
            <div class="personChat">
              <a class="icon is-small right">
                <img :src="avatar">
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
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
  props: ["home", "newpost", "profile", "chat", "isAvatar"],
  data() {
    return {
      footerChat: false
    };
  },
  created() {
    if (this.chat == "isChat") {
      this.footerChat = true;
    }
  }
};
</script>
