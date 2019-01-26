<template>
  <div>
    <div class="grayContentPage height-0">

      <large-header>{{$t("logIn.log_in")}}</large-header>

      <div class="contentPageHeader">
        <div class="field">
          <div class="control" :class="has_icons_R">
            <input class="input" :class="textAlgin" type="text" :placeholder="$t('logIn.name_mail')" v-model="username">
            <span class="icon is-small" :class="is_way_R">
              <i class="person fontSize20"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <p class="control" :class="[has_icons_R, has_icons_L]">
            <input class="input password" :class="textAlgin" id="pwd" :type="passwordType" :placeholder="$t('logIn.password')" v-model="password">
            <span class="icon is-small" :class="is_way_R">
              <i class="outline-https fontSize15"></i>
            </span>
            <span class="icon is-small is-left eyePWD" :class="is_way_L" id="eye" @click="showPassword">
              <i :class="icon + ' fontSize20'"></i>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control">
            <button class="button is-success" :class="{'is-loading' : loading }" :disabled='loading' @click="postInfo">
              {{$t("logIn.logIn_btn")}}
            </button>
          </p>
        </div>
        <router-link to="/forgot">
          <a class="forgettingLink">{{$t("logIn.forgotPassword")}}</a>
        </router-link>
      </div>

      <footer class="orderFooterTop">
        <p class="noteSginIn double-line">
          {{$t("logIn.another")}}
        </p>

        <div class="buttonsSginIn width80">
          <div class="buttonSIN">
            <a href="#" class="buttonFacebook">
              {{$t("logIn.facbook")}}
              <img src="@/../image/facebook.svg">
            </a>
          </div>

          <div class="buttonSIN">
            <a href="#" class="buttonGoogle">
              {{$t("logIn.gmail")}}
              <img src="@/../image/google.svg">
            </a>
          </div>
        </div>

        <div class="paraFooter">
          <p>
            {{$t("logIn.signUp_para")}}
            <router-link to="/signup">
              <a>{{$t("logIn.signUp_link")}}</a>
            </router-link>
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script src='./script.js'></script>
