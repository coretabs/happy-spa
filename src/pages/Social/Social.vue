<template>

  <div class="grayContentPage">
    <div class="mianHeader">
      <a href="#">
        <i class="material-icons">arrow_forward</i>
      </a>
      <p>إدارة الروابط</p>
      <img src="@/../image/mainWhite.png">
    </div>

    <div class="contentPageHeader">

      <img src="@/../image/social-ideas.svg" class="mainPoster">

      <ul id="menuItems" v-if="links.length > 0" v-for="link in links">
        <li>
          <div class="field linkMSM">
            <div class="linkSSM">
              <div class="control linkSM-para">
                <div class="select">
                  <div>
                    <select v-model="link.social_app" @change="setSelectable"  :disabled = '!link.created'>
                      <option selected='selected' v-if="!link.created"  :value="link.social_app">{{socialApps[link.social_app]}}</option>
                      <option selected='selected' v-if="link.created" v-for="sLink in selectable"  :value="sLink">{{socialApps[sLink]}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <p class="control has-icons-left linkSM">
                <input class="input linkSM-input" type="link" v-model="link.social_link"  placeholder="https://www.wep-site.com">
                <span class="icon is-small RBR">
                  <i class="material-icons fontSize22" @click="deleteLink(link.id)" >delete</i>
                </span>
              </p>
            </div>
          </div>
        </li>
      </ul>

      <div class="linkAD" >
        <a @click="addLink" id="RABT">
          <i class="material-icons">add</i>
          أضف رابطاً آخر
        </a>
      </div>

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
</template>
<script>
import Corefun from '@/api'
export default {
  data : () => {
    return {
      selectable : ['YT' ,'FB' ,'IG'], // links that are not seted
      select : {},
      links : [],
      available : [], // can be selected any time
      createdLinks : [],
      selected : [],
      inputs : [],
      socialApps : {
        'YT' : 'YouTube', 
        'FB' : 'FaceBook', 
        'IG' :'InstaGram'
      }
    }
  },
  methods : {
    getLinks () {
      Corefun.links.get().then(re => {
        this.links = re
        this.setSelectable()
      })
    },
    setSelectable() {
      if (this.links.length > 0) {
        this.links.forEach(link => {
          let index = this.selectable.indexOf(link.social_app)
          this.selectable.splice(index , 1)
          this.selected.push(link.social_app)
        })
      }
      
    },
    deleteLink(id) {
     Corefun.links.delete(id)
     this.setSelectable()
      this.links.forEach((link , index , links) => {
        link.id == id ? links.splice(index , 1) : ''
      })
    },
    addLink() {
      let newLink = {
        created : true
      }
      this.links.push(newLink)
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
