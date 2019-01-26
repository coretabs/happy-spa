<template>
  <div>
    <div class="grayContentPage">

      <large-header>{{$t("social.manage_links")}}</large-header>

      <div class="contentPageHeader">

        <img src="@/../image/social-ideas.svg" class="mainPoster">

        <ul id="menuItems"  v-for="app in socialApps">
          <li>
            <div class="field linkMSM">
              <div class="linkSSM">
                <div class="control linkSM-para">
                  <div class="social">
                    <p>{{app.app}}</p>
                  </div>
                </div>            
                <p class="control has-icons-left linkSM">
                  <input 
                    dir="auto" 
                    :name="app.key"  
                    :class="{ 
                      'is-danger': fields[app.key] ? !fields[app.key].valid : false,
                      'is-success': fields[app.key] ? fields[app.key].valid && fields[app.key].changed : false 
                    }"  
                    class="input linkSM-input" 
                    :disabled="loading" 
                    v-validate="'url:require_protocol'" 
                    type="link"
                    v-model="links[app.key]"
                  >
                  <span  class="icon is-small RBR">
                    <i @click="deleteLink(ids[app.key] , app.key)" v-if="ids[app.key]"  class="icon-delete fontSize22"></i>
                  </span>
                </p>
              </div>
              <p v-if="fields[app.key] ? !fields[app.key].valid : false"  class="help margin-left  has-text-left  is-danger">add valid link please</p>
            </div>
          </li>
        </ul>
      </div>

      <footer class="lastDivision borderRadius50 width80 orderFooterTop orderFooterBottom">
        <div class="field">
          <p class="control">
            <button class="button is-success">
              {{$t("social.save")}}
            </button>
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
