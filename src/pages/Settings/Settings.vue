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
                        <li class="headElements"  v-for="lang in languages" :key="lang.title" @click="changeLang(lang.language)">
                            <flag :iso="lang.flag" :squared=false /> 
                            {{lang.title}}
                        </li>
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
import {check_email_status} from '@/mixins/check';
import Cookies from 'js-cookie'
import Vue from 'vue';

export default {
    mixins: [check_email_status],
    data: () => {
        return {
            languages: [
                {
                    language: 'ar',
                    title: 'العربية',
                    flag: 'sa'
                },
                {
                    language: 'en',
                    title: 'English',
                    flag: 'us'
                }
            ],
            isShow: false,
            browserLang: ''
        }
    },
    methods : {
        changeLang(lang) {
            this.$i18n.locale = lang;
            Cookies.set('locale', lang);
            this.isShow = false;
            console.log("i18n.locale = " + this.$i18n.locale);
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