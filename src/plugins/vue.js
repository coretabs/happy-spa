import VueDataLoading from "@/components/vue-data-loading";
import Report from "@/components/report";
import ErrorMsg from "@/components/error-msg";
import AlertMsg from "@/components/alert-msg";
import Overlay from "@/components/overlay";
import Header from "@/components/header";
import LargeHeader from "@/components/large-header";
import Footer from "@/components/footer";
import Confirm from "@/components/confirm";
import ResultPost from "@/components/result-post";
import ResultPerson from "@/components/result-person";
import PrivacyPolicy from "@/components/privacy-policy";
import Vue from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import VeeValidate from "vee-validate";
import { EmojiPickerPlugin } from "vue-emoji-picker";
import FlagIcon from 'vue-flag-icon';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import "@/api/api";

const Plugins = {
  addComponents: Vue => {
    Vue.component("VueDataLoading", VueDataLoading);
    Vue.component("Report", Report);
    Vue.component("ErrorMsg", ErrorMsg);
    Vue.component("AlertMsg", AlertMsg);
    Vue.component("Confirm", Confirm);
    Vue.component("Overlay", Overlay);
    Vue.component("app-header", Header);
    Vue.component("large-header", LargeHeader);
    Vue.component("app-footer", Footer);
    Vue.component("result-post", ResultPost);
    Vue.component("result-person", ResultPerson);
    Vue.component("app-policy", PrivacyPolicy);
  },
  addGVars: Vue => {
    window.$ = e => document.querySelector(e);
    Vue.prototype.$scroll = {
      allow: () => $("html").classList.remove("overflowHidden"),
      deny: () => $("html").classList.add("overflowHidden")
    };
  },
  chatreInit: (d, w, c) => {
    w.ChatraID = "Ty9iqgBujvxhx94bB";
    var s = d.createElement("script");
    w[c] =
      w[c] ||
      function() {
        (w[c].q = w[c].q || []).push(arguments);
      };
    s.async = true;
    s.src = "https://call.chatra.io/chatra.js";
    if (d.head) d.head.appendChild(s);
  },
  install(vue) {
    this.addComponents(vue);
    this.chatreInit(document, window, "Chatra");
    this.chatraSettings();
    this.addGVars(vue);
  },
  validators: {
    password: {
      getMessage: field => "this password is not valid",
      validate: value => {
        let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return reg.test(value);
      }
    },
    password2: {
      getMessage: field => "it must be like the first password",
      validate: (password2, { password } = {}) => password2 == password
    }
  },
  chatraSettings: () => {
    Chatra("setButtonSize", 40);
    Chatra("setColors", {
      buttonText: "#ffe600",
      buttonBg: "#ffffff"
    });
    Chatra("hide");
  }
};

VeeValidate.Validator.extend("password", Plugins.validators.password);
VeeValidate.Validator.extend("password2", Plugins.validators.password2, {
  paramNames: ["password"]
});

Vue.use(Plugins);
Vue.use(VeeValidate, {
  events: "keyup"
});
Vue.use(EmojiPickerPlugin);
Vue.use(FlagIcon);
Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
});