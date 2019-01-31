<template>
  <div>
    <div class="grayContentPage">

      <large-header>{{$t("signUp.new_user")}}</large-header>

      <div class="contentPageHeader">
        <div class="field">
          <div class="control" :class="has_icons_R">
            <input 
              class="input" 
              v-model='email' 
              v-validate="'required|email'" 
              name="email" 
              dir="auto"
              type="email" 
              :placeholder="$t('signUp.email')"
              :class="[dirRTL, { 
                'is-danger': fields['email'] ? !fields['email'].valid && fields['email'].changed : false,
                'is-success': fields['email'] ? fields['email'].valid && fields['email'].changed : false 
              }]"
            >
            <span class="icon is-small" :class="is_way_R">
              <i class="mail fontSize15"></i>
            </span>
          </div>
          <p v-if="fields['email'] ? !fields['email'].valid && fields['email'].changed : false" class="help is-danger" :class="textAlgin">
            {{$t("signUp.wrongEmail")}}
          </p>
        </div>

        <div class="field">
          <p class="control" :class="[has_icons_R, has_icons_L]">
            <input 
              class="input" 
              v-model="password1" 
              id="pwd" 
              :type="passwordType" 
              :placeholder="$t('signUp.password')" 
              name="password1"
              dir="auto"
              v-validate="'required|password'" 
              :class="[dirRTL, { 
                'is-danger': fields['password1'] ? !fields['password1'].valid && fields['password1'].changed : false,
                'is-success': fields['password1'] ? fields['password1'].valid && fields['password1'].changed : false 
              }]"
              ref="password"
            >
            <span class="icon is-small" :class="is_way_R">
              <i class="outline-https fontSize15"></i>
            </span>
            <span class="icon is-small eyePWD" :class="is_way_L" @click="showPassword" id="eye">
              <i :class="icon + ' fontSize20'"></i>
            </span>
          </p>
          <p v-if="fields['password1'] ? !fields['password1'].valid && fields['password1'].changed : false" class="help is-danger" :class="textAlgin">
            {{$t("signUp.invalidpassword")}} <br>
            {{$t("signUp.least_one_number")}} <br>
            {{$t("signUp.least_one_letter")}} <br>
            {{$t("signUp.less_elements")}}
          </p>
        </div>

        <div class="field">
          <p class="control" :class="[has_icons_R, has_icons_L]">
            <input 
              class="input" 
              id="pwd2" 
              name="password2" 
              dir="auto"
              v-model="password2" 
              :type="passwordType"
              :placeholder="$t('signUp.password')"
              v-validate="{is : password1 , required : true}" 
              :class="[dirRTL, { 
                'is-danger': fields['password2'] && fields['password1'] ? !fields['password2'].valid && fields['password1'].valid  && fields['password2'].changed : false,
                'is-success': fields['password2'] && fields['password1']? fields['password2'].valid && fields['password1'].valid  && fields['password2'].changed : false 
              }]"
            >
            <span class="icon is-small" :class="is_way_R">
              <i class="outline-https fontSize15"></i>
            </span>
            <span class="icon is-small eyePWD" :class="is_way_L" @click="showPassword" id="eye">
              <i :class="icon + ' fontSize20'"></i>
            </span>
          </p>
          <p v-if="fields['password2'] ? !fields['password2'].valid && fields['password2'].changed : false" class="help is-danger" :class="textAlgin">
            {{$t("signUp.samePassword")}}
          </p>
        </div>

        <div class="field">
          <p class="control">
            <button 
              :disabled='button' 
              class="button is-success" 
              @click="sendInfo"
              :class="{'is-loading' : buttonLoading}"
            >
              {{$t("signUp.next")}}
            </button>
          </p>
        </div>

        <div class="noteConditions">
          <p>
            {{$t("signUp.note")}} <router-link to="/terms-of-service" class="forgettingLink">{{$t("signUp.termsOfService")}}</router-link> {{$t("signUp.and")}} <router-link to="/privacy-policy" class="forgettingLink">{{$t("signUp.privacyPolicy")}}</router-link>
          </p>
        </div>

      </div>

      <footer class="lastDivision">

        <p class="noteSginIn double-line"> {{$t("signUp.another")}} </p>

        <div class="buttonsSginIn">
          <div class="buttonSIN">
            <a href="https://corefun.herokuapp.com/accounts/facebook/login/" class="buttonFacebook">
              {{$t("signUp.facbook")}}
              <img src="@/../image/facebook.svg">
            </a>
          </div>

          <div class="buttonSIN">
            <a href="https://corefun.herokuapp.com/accounts/google/login/" class="buttonGoogle">
              {{$t("signUp.gmail")}}
              <img src="@/../image/google.svg">
            </a>
          </div>
        </div>

        <div class="paraFooter">
          <p>
            {{$t("signUp.logIn_para")}} <router-link to="/login">{{$t("signUp.logIn_link")}}</router-link>
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script src='./script.js'></script>
