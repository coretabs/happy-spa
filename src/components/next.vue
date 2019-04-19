<template>
  <div id="box" class="next">
    <span class="iconAlert">
      <i class="report"></i>
    </span>
    <h2>{{nextMsg}}</h2>
    <a @click="ok() ; closeNext()  " class="close">{{$t("next.close")}}</a>
  </div>
</template>

<script>
export default {
  props : ['ok' , 'closeNext' , 'nextMsg']
}
</script>
