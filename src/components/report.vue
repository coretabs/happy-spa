<template>
  <div id="box-report">
    
    <h1>{{$t("report.choose_reason")}}</h1>
    
    <div class="items">
      <input v-model="reason" value="SPAM"  id="item1" type="radio" name="repot">
      <label for="item1">{{$t("report.spam")}}</label>

      <input v-model="reason" value="VIOLENCE"  id="item2" type="radio" name="repot">
      <label for="item2">{{$t("report.violence")}}</label>

      <input v-model="reason" value="nude"  id="item3" type="radio" name="repot">
      <label for="item3">{{$t("report.nude")}}</label>
    </div>

    <div class="submit-report">
      <a @click="reportDone" class="close">{{$t("report.send")}}</a>
    </div>
    
  </div>
</template>

<script>
export default {
  props : ['postid' , 'closeReport'],
  data : ()=> {
    return {
      reason : ''
    }
  },
  methods : {
    reportDone () {
      this.reason == 'nude' ? this.reason = 'SPAM' : ''
      this.$api.posts.report(this.postid , this.reason)
      this.closeReport()
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../assets/style/vars';

*::before, *::after {
  box-sizing: border-box;
}

#box-report {
  display: none;
  max-width: 450px;
  width: 70%;
  margin: 0 auto;
  border-top: 5px solid $main-color;
  color: #142833;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  padding: 10px;
  user-select: none;

  h1 {
    margin: 0;
    padding: 10px;
    background-color: #f9f9f9;
    font-size: 1.2em;
    text-align: center;
  }

  .items {
    display: flex;
    flex-direction: column;
    padding: 20px;

    input {
      display: block;
      height: 53px;
      margin: 0 0 -53px -9999px;
      outline: none;
    }

    label {
      display: block;
      position: relative;
      padding: 0.5em 45px 0.5em 0;
      border-top: 2px dashed #f9f9f9;
      cursor: pointer;
      text-align: right;
    }

    label::before {
      content: '\e928';
      display: block;
      position: absolute;
      top: 13px;
      right: 10px;
      font: 1.2em 'icon';
    }

    label:hover, input:focus + label {
      background-color: #f9f9f9;
      border-right: 4px solid $main-color;
      
    }

    input:checked + label::before {
      content: '\e927'; /* circle checkmark */
    }
  }

  .submit-report {
    .close {
      font-size: 20px;
      color: white;
      padding: 10px 20px;
      cursor: pointer;
      background-color: $main-color;
      border-radius: 5px;
      margin: 0 auto;
      display: block;
      width: max-content;
    }
  }

}
</style>


