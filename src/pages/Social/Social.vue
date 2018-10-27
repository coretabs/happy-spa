<template>
  <div>
    <div id="box" >
      <span class="iconAlert">
        <i class="material-icons">report</i>
      </span>
      <h2>{{ErrorMsg}}</h2>
      <a @click="Error = false ; showErorr()" class="close">Close</a>
    </div>
    <div class="grayContentPage">
      <div id="overlay" @click="Error = false ; showErorr()" v-if='Error'></div>
      <div class="mianHeader">
      <a @click="$router.go(-1)">
          <i class="material-icons">arrow_forward</i>
        </a>
        <p>إدارة الروابط</p>
        <img src="@/../image/mainWhite.png">
      </div>

      <div class="contentPageHeader">

        <img src="@/../image/social-ideas.svg" class="mainPoster">

        <ul id="menuItems"  v-for="link in links">
          <li>
            <div class="field linkMSM">
              <div class="linkSSM">
                <div class="control linkSM-para">
                  <div class="select">
                    <div>
                      <select v-model="link.social_app" @change="selectApp(link)"  :disabled = '!link.created'>
                        <option selected='selected' v-if="!link.created"  :value="link.social_app">{{socialApps[link.social_app]}}</option>
                        <option v-if="link.created" v-for="sLink in selectable"  :value="sLink">{{socialApps[sLink]}}</option>
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
            <i class="icon-baseline-add-24px"></i>
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
  </div>
</template>
<script>
import Corefun from '@/api'
export default {
  data : () => {
    return {
      selectable : ['YT' ,'FB' ,'IG'], // links that are not seted
      select : {},
      links : {},
      count : 0,
      available : [], // can be selected any time
      createdLinks : [],
      inputs : [],
      socialApps : {
        'YT' : 'YouTube', 
        'FB' : 'FaceBook', 
        'IG' :'InstaGram'
      },
      Error: false,
      ErrorMsg: 'راسلنا رجاء'
    }
  },
  methods : {
    getLinks () {
      Corefun.links.get().then(re => {
        re.forEach(l => {
          this.links[`app${this.count}`] = l
          this.count++
        })
        this.setSelectable()
      })
    },
    setSelectable() {
      this.selectable = Object.keys(this.socialApps)
      if (this.links.length > 0) {
        this.links.forEach(link => {
          let index = this.selectable.indexOf(link.social_app)
          this.selectable.splice(index , 1)
        })
      }
    },
    selectApp(link) {
      link.created = false
      this.selectable.splice(this.selectable.indexOf(link.social_app) , 1)
    },
    deleteLink(id) {
     id ? Corefun.links.delete(id) : ''
      this.links.forEach((link , index , links) => {
        if(link.id == id) {
          links.splice(index , 1) 
        }
      })
      this.setSelectable()
    },
    addLink() {
      if(this.count < 3){
        let newLink = {
          created : true
        }
        this.links[`app${this.count}`] = newLink
      } else{
        this.ErrorMsg = 'عذرا لايمكنك إضافة المزيد حاليا'
        this.Error = true
        this.showErorr()
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
