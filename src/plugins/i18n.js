import Vue from 'vue'
import VueI18n from "vue-i18n";
import {ar} from "@/lang/ar";
import {en} from "@/lang/en";

Vue.use(VueI18n);

const messages = {
    ar, 
    en
}

export const i18n = new VueI18n({
    fallbackLocale: 'en',
    locale: 'en',
    messages
})
