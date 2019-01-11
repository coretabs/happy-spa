<template>
  <div class="grayContentPage height-max">
    <div class="mianHeader">
      <a @click="$router.go(-1)">
        <i class="arrow_forward"></i>
      </a>
      <p>بنود سياسة الخصوصية</p>
      <img src="@/../image/mainWhite.png">
    </div>

    <app-policy :isProcedures="procedures" :isPersonalData="personalData" :isRights="rights"></app-policy>
    
  </div>
</template>

<script src='./script.js'></script>
