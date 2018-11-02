<template>
  <div>
    <div id="box" >
      <span class="iconAlert">
        <i class="report"></i>
      </span>
      <h2>{{ErrorMsg}}</h2>
      <a @click="Error = false ; showErorr()" class="close">Close</a>
    </div>
    <div class="grayContentPage">
      <div id="overlay" @click="Error = false ; showErorr()" v-if='Error'></div>
      <div class="mianHeader">
      <a @click="$router.go(-1)">
          <i class="arrow_forward"></i>
        </a>
        <p>إدارة الروابط</p>
        <img src="@/../image/mainWhite.png">
      </div>

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
              حفظ
            </button>
          </p>
        </div>
      </footer>

    </div>
  </div>
</template>
<script>
import Corefun from '@/api'
export default {
  data : () => {
    return {
      links : {
        IG : '',
        FB : '',
        YT : ''
      },
      ids : {},
      count : 0,
      socialApps : [
        {app : 'YouTube' , key:'YT'}, 
        {app : 'FaceBook' , key:'FB'}, 
        {app :'InstaGram' , key:'IG'}
      ],
      Error: false,
      loading : true,
      ErrorMsg: 'راسلنا رجاء'
    }
  },
  methods : {
    getLinks () {
      Corefun.links.get().then(re => {
        this.loading = false
        if (re.length > 0) {
          re.forEach(link => {
            this.links[link.social_app] = link.social_link
            this.ids[link.social_app] = link.id 
            this.count++
          })
        }
      })
    },
    deleteLink(id , app) {
     if (id) {
        Corefun.links.delete(id)
        this.links[app] = ''
      } 
    },
    showErorr() {
      if (this.Error) {
        document.querySelector('#box').style.display = 'block'
        document.querySelector('.grayContentPage').classList.add('blur')
      } else {
        document.querySelector('#box').style.display = 'none'
        document.querySelector('.grayContentPage').classList.remove('blur')
      }
    }
  },
  created () {
    this.getLinks()
  }
}
</script>

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
