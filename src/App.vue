<template>
  <div>
    <error-msg 
      :closeError="closeError" 
      :errorMsg="error.msg" 
      :class="{'block' : error.box}"
    ></error-msg>
    <report 
      :class="{'block' : report.box}" 
      :closeReport="closeReport" 
      :postid="report.postid"
    ></report>
    <overlay
      :report="report.box"
      :closeReport="closeReport"
      :error="error.box"
      :closeError="closeError"
    ></overlay>
    <transition name="pages-anim">
      <router-view
        class="relative"
        @openReport="reportClick($event)"
        @error="errorClick($event)"
        :class="{'nopostblur' : box }"
      />
    </transition>
  </div>
</template>

<script>
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
        callback : ''
      }
    };
  },
  methods: {
    reportClick(postid) {
      this.box = true;
      this.report.box = true;
      this.report.postid = postid;
      console.log(postid);
    },
    errorClick(opt) {
      this.box = true;
      this.error.box = true;
      this.error.msg = opt.msg;
      this.error.callback = opt.callback
    },
    closeReport() {
      this.report.box = false;
      this.box = false;
    },
    closeError() {
      this.error.box = false;
      this.box = false;
      this.error.callback ?  this.error.callback() : ''
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
