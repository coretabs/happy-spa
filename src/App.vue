<template>
  <div>
    <error-msg :closeError="closeError" :errorMsg="error.msg" :class="{'block' : error.box}"></error-msg>
    <alert-msg :closeAlert="closeAlert" :alertMsg="alert.msg" :class="{'block' : alert.box}"></alert-msg>
    <report :class="{'block' : report.box}" :closeReport="closeReport" :postid="report.postid"></report>
    <confirm
      :class="{'block' : confirm.box}"
      :yes="confirm.yes"
      :no="confirm.no"
      :confirmMsg="confirm.msg"
      :closeConfirm="closeConfirm"
    ></confirm>
    <next 
      :class="{'block' : next.box}" 
      :ok="next.ok" 
      :nextMsg="next.msg" 
      :closeNext="closeNext"
    ></next>
    <overlay
      :report="report.box"
      :closeReport="closeReport"
      :error="error.box"
      :closeError="closeError"
      :alert="alert.box"
      :closeAlert="closeAlert"
      :confirm="confirm.box"
      :closeConfirm="closeConfirm"
      :next="next.box"
      :closeNext="closeNext"
    ></overlay>
    <transition name="pages-anim">
      <router-view
        class="relative"
        @openReport="reportClick($event)"
        @error="errorClick($event)"
        @alert="alertClick($event)"
        @confirm="confirmClick($event)"
        @next="nextClick($event)"
        :class="{'nopostblur' : box }"
      />
    </transition>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: "App",
  data: function() {
    return {
      box: false,
      report: {
        box: false,
        postid: ""
      },
      error: {
        box: false,
        msg: "",
        callback: ""
      },
      alert: {
        box: false,
        msg: "",
        callback: ""
      },
      confirm: {
        box: false,
        msg: "",
        yes: () => {},
        no: () => {}
      },
      next: {
        box: false,
        msg: "",
        ok: () => {}
      }
    };
  },
  methods: {
    reportClick(postid) {
      this.box = true;
      this.$scroll.deny();
      this.report.box = true;
      this.report.postid = postid;
      console.log(postid);
    },
    errorClick(opt) {
      this.box = true;
      this.$scroll.deny();
      this.error.box = true;
      this.error.msg = opt.msg;
      this.error.callback = opt.callback;
    },
    alertClick(opt) {
      this.box = true;
      this.$scroll.deny();
      this.alert.box = true;
      this.alert.msg = opt.msg;
      this.alert.callback = opt.callback;
    },
    confirmClick(opt) {
      this.box = true;
      this.$scroll.deny();
      this.confirm.box = true;
      this.confirm.yes = opt.yes;
      this.confirm.msg = opt.msg;
      this.confirm.no = opt.no;
    },
    nextClick(opt) {
      this.box = true;
      this.$scroll.deny();
      this.next.box = true;
      this.next.ok = opt.ok;
      this.next.msg = opt.msg;
    },
    closeReport() {
      this.report.box = false;
      this.box = false;
    },
    closeError() {
      this.error.box = false;
      this.box = false;
      this.error.callback ? this.error.callback() : "";
    },
    closeAlert() {
      this.alert.box = false;
      this.box = false;
      this.alert.callback ? this.alert.callback() : "";
    },
    closeConfirm() {
      this.confirm.box = false;
      this.box = false;
    },
    closeNext() {
      this.next.box = false;
      this.box = false;
    }
  },
  created() {
    if (Cookies.get('locale')) {
        this.$i18n.locale = Cookies.get('locale');
        console.log(this.$i18n.locale);
    } else {
        this.browserLang = navigator.language || navigator.userLanguage || "en";
        console.log(this.browserLang)
        if (this.browserLang.includes("-")) {
            var browserSplit = this.browserLang.split("-")
            this.$i18n.locale = browserSplit[0];
            console.log(this.$i18n.locale)
        } else {
            this.$i18n.locale = this.browserLang;
            console.log(this.$i18n.locale)
        }
    }
  }
};
</script>

<style>
.block {
  display: block !important;
}
.pages-anim-enter-active {
  animation: in 0.2s;
  animation-delay: 0.2s;
  opacity: 0;
}
.pages-anim-leave-active {
  animation: out 0.2s;
}

@keyframes out {
  from {
    left: 0px;
  }
  to {
    left: -30px;
    opacity: 0;
  }
}

@keyframes in {
  from {
    left: -30px;
    opacity: 0;
  }
  to {
    left: 0px;
    opacity: 1;
  }
}
</style>
