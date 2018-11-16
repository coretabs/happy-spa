<template>
  <div id="box" class="error">
    <span class="iconAlert">
      <i class="report"></i>
    </span>
    <h2>{{errorMsg}}</h2>
    <a @click="closeError()" class="close">Close</a>
  </div>
</template>

<script>
export default {
  props : ['errorMsg' , 'closeError']
}
</script>


<style lang="scss">
  @import '../assets/style/vars';

  #box {
  width: 70%;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  padding: 10px;
  text-align: center;
  display: none;

  .iconAlert {
    color: $error-color;
    display: block;
    margin: 20px 0;

    i {
      font-size: 40px;
    }
  }

  h2 {
    color: $error-color;
  }

  .close {
    font-size: 20px;
    color: white;
    padding: 10px 20px;
    margin: 10px 4% 0;
    cursor: pointer;
    background: $error-color;
    display: inline-block;
    border-radius: 5px;
  }

  .close:not(:first-of-type) {
    background: $main-color;
  }

}



</style>

