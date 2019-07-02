<template>
  <div>
    <div class="grayContentPage">
      <large-header>{{$t("social.manage_links")}}</large-header>

      <div class="socialPage contentPageHeader">
        <img src="@/../image/social-ideas.svg" class="mainPoster">

        <ul id="menuItems" v-for="app in apps">
          <li>
            <div class="field linkMSM">
              <div class="linkSSM">
                <div class="control linkSM-para">
                  <div class="social">
                    <p>{{app}}</p>
                  </div>
                </div>
                <p class="control has-icons-left linkSM">
                  <input
                    dir="auto"
                    :name="app"
                    :class="{ 
                      'is-danger': fields[app] ? !fields[app].valid : false,
                      'is-success': fields[app] ? fields[app].valid && fields[app].changed : false 
                    }"
                    class="input linkSM-input"
                    :disabled="loading"
                    v-validate="'url:require_protocol'"
                    type="link"
                    v-model="links[app]"
                  >
                  <span class="icon is-small RBR">
                    <i @click="deleteLink(app)" v-if="links[app]" class="icon-delete fontSize22"></i>
                  </span>
                </p>
              </div>
              <p
                v-if="fields[app] ? !fields[app].valid : false"
                class="help margin-left has-text-left is-danger"
              >add valid link please</p>
            </div>
          </li>
        </ul>
      </div>

      <footer class="lastDivision borderRadius50 width80 orderFooterTop orderFooterBottom">
        <div class="field">
          <p class="control">
            <button
              class="button is-success"
              :class="{'is-loading':loading}" 
              :disabled = 'loading'
              @click="saveLinks"
            >{{$t("social.save")}}</button>
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script src='./script.js'></script>

<style scoped>
.linkAD {
  display: inline-block !important;
  background-color: #fff;
  padding: 5px 15px;
  border-radius: 50px;
  box-shadow: 0px 0px 8px 0px #e8e7e7;
  text-align: center;
}
</style>
