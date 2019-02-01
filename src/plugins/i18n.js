import Vue from 'vue'
import VueI18n from "vue-i18n";
import {ar} from "@/lang/ar";
import {en} from "@/lang/en";
import axios from "axios";

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

/*Object.defineProperty(Vue.prototype,
    '$locale', {
        get: function () {
            return app.i18n.locale
        },
        set: function (locale) {
            app.i18n.locale = locale
        }
    })

    new Vue(app)

this.$locale
this.$locale = 'ar'*/

//export const defaultLocale = ['ar']
/*
function setI18nLanguage(lang) {
    i18n.locale = lang
    axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}

export function loadLanguageAsync(lang) {
    if (i18n.locale !== lang) {
        if (!loadedLanguages.includes(lang)) {
            return import( webpackChunkName: "lang-[request]"  `@/lang/${lang}`).then(msgs => {
                i18n.setLocaleMessage(lang, msgs.default)
                loadedLanguages.push(lang)
                return setI18nLanguage(lang)
            })
        }
    }
    return Promise.resolve(lang)
}
*/