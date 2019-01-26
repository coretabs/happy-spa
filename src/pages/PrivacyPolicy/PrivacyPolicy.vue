<template>
  <div class="grayContentPage height-max">

    <large-header>{{$t("privacyPolicy.privacy_policy")}}</large-header>

    <app-policy :isProcedures="procedures" :isPersonalData="personalData" :isRights="rights"></app-policy>
    
  </div>
</template>

<script src='./script.js'></script>
