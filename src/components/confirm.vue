<template>
  <div id="box" class="confirm">
    <span class="iconAlert">
      <i class="report"></i>
    </span>
    <h2>{{confirmMsg}}</h2>
    <a @click="yes() ; closeConfirm()  " class="close">{{$t("confirm.yes")}}</a>
    <a @click="no() ; closeConfirm()  " class="close">{{$t("confirm.no")}}</a>
  </div>
</template>

<script>
export default {
  props : ['yes' , 'no' , 'closeConfirm' , 'confirmMsg']
}
</script>
