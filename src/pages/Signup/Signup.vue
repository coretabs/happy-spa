<template>
  <div>
    <div class="grayContentPage">

      <large-header>حساب جديد</large-header>

      <div class="contentPageHeader">
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input 
              class="input" 
              v-model='email' 
              v-validate="'required|email'" 
              name="email" 
              dir="auto"
              type="email" 
              placeholder="بريدك الالكتروني"
              :class="{ 
                'is-danger': fields['email'] ? !fields['email'].valid && fields['email'].changed : false,
                'is-success': fields['email'] ? fields['email'].valid && fields['email'].changed : false 
              }"
            >
            <span class="icon is-small is-right">
              <i class="mail fontSize15"></i>
            </span>
          </div>
          <p v-if="fields['email'] ? !fields['email'].valid && fields['email'].changed : false" class="help is-danger">البريد
            غير صحيح</p>
        </div>

        <div class="field">
          <p class="control has-icons-right  has-icons-left">
            <input 
              class="input" 
              v-model="password1" 
              id="pwd" 
              :type="passwordType" 
              placeholder="كلمة المرور" 
              name="password1"
              dir="auto"
              v-validate="'required|password'" 
              :class="{ 
                'is-danger': fields['password1'] ? !fields['password1'].valid && fields['password1'].changed : false,
                'is-success': fields['password1'] ? fields['password1'].valid && fields['password1'].changed : false 
              }"
              ref="password"
            >
            <span class="icon is-small is-right">
              <i class="outline-https fontSize15"></i>
            </span>
            <span class="icon is-small is-left eyePWD" @click="showPassword" id="eye">
              <i :class="icon + ' fontSize20'"></i>
            </span>
          </p>
          <p v-if="fields['password1'] ? !fields['password1'].valid && fields['password1'].changed : false" class="help is-danger">
            كلمة المرور غير صالحة<br> يجب ان تحوي رقم واحد على الأقل<br> وحرف إنجليزي واحد على الأقل<br> وان لا تقل عن
            8 عناصر</p>
        </div>

        <div class="field">
          <p class="control has-icons-right  has-icons-left">
            <input 
              class="input" 
              id="pwd2" 
              name="password2" 
              dir="auto"
              v-model="password2" 
              :type="passwordType"
              placeholder="كلمة المرور"
              v-validate="{is : password1 , required : true}" 
              :class="{ 
                'is-danger': fields['password2'] && fields['password1'] ? !fields['password2'].valid && fields['password1'].valid  && fields['password2'].changed : false,
                'is-success': fields['password2'] && fields['password1']? fields['password2'].valid && fields['password1'].valid  && fields['password2'].changed : false 
              }"
            >
            <span class="icon is-small is-right">
              <i class="outline-https fontSize15"></i>
            </span>
            <span class="icon is-small is-left eyePWD" @click="showPassword" id="eye">
              <i :class="icon + ' fontSize20'"></i>
            </span>
          </p>
          <p v-if="fields['password2'] ? !fields['password2'].valid && fields['password2'].changed : false" class="help is-danger">كلمة
            المرور غير مطابقة</p>
        </div>

        <div class="field">
          <p class="control">
            <button 
              :disabled='button' 
              class="button is-success" 
              @click="sendInfo"
              :class="{'is-loading' : buttonLoading}"
            >
              التالي
            </button>
          </p>
        </div>

        <div class="noteConditions">
          <p>
            عن طريق تسجيلك, انت توافق على <router-link to="/terms-of-service" class="forgettingLink">شروط الإستخدام</router-link> و <router-link to="/privacy-policy" class="forgettingLink">سياسة الخصوصية</router-link>
          </p>
        </div>

      </div>

      <footer class="lastDivision">

        <p class="noteSginIn double-line"> أو تسجيل عن طريق </p>

        <div class="buttonsSginIn">
          <div class="buttonSIN">
            <a href="https://corefun.herokuapp.com/accounts/facebook/login/" class="buttonFacebook">
              فيس بوك
              <img src="@/../image/facebook.svg">
            </a>
          </div>

          <div class="buttonSIN">
            <a href="https://corefun.herokuapp.com/accounts/google/login/" class="buttonGoogle">
              جوجل
              <img src="@/../image/google.svg">
            </a>
          </div>
        </div>

        <div class="paraFooter">
          <p>
            هل لديك حساب؟ <router-link to="/login">تسجيل الدخول</router-link>
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script src='./script.js'></script>
