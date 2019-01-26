<template>
    <div class="grayContentPage setting height-0">

        <app-header a1="back" a5="para"></app-header>
          
        <div class="headContent">
            <div class="settingPara" :class="statDirection">
                <p>{{$t("setting.accountSettings")}}</p>
            </div>
            
            <div class="backList settingList" :class="textAlgin">
                <router-link to="/information">{{$t("setting.editProfile")}}</router-link>
                <hr>
                <a @click="isShow=!isShow">{{$t("setting.language")}}</a>
                    <ul v-if="isShow" class="languages" :class="statDirection">
                        <li class="headElements"  v-for="lang in languages" :key="lang.title" @click="changeLang(lang.language)">{{lang.title}}</li>
                    </ul>
                <hr>
                <router-link to="/changepassword">{{$t("setting.changePassword")}}</router-link>
                <hr>
                <router-link to="/manageemails">{{$t("setting.manageEmail")}}</router-link>
                <hr>
                <router-link to="/links">{{$t("setting.manageLinks")}}</router-link>
            </div>
        </div>  

      <app-footer></app-footer>
    </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    name: 'LaguageSwitcher',
    data: () => {
        return {
            languages: [
                {
                    language: 'ar',
                    title: 'العربية'
                },
                {
                    language: 'en',
                    title: 'English'
                }
            ],
            isShow: false,
        }
    },
    methods : {
        changeLang(lang) {
            this.$i18n.locale = lang;
            this.isShow = false;
            console.log(this.$i18n.locale);
            
        }
    },
    'computed': {
        textAlgin: function () {
            return (this.$i18n.locale == 'ar') ? 'txtR' : 'txtL';
        },
        statDirection: function () {
            return (this.$i18n.locale == 'ar') ? 'directionRTL' : 'directionLTR';
        }
    }
}
</script>