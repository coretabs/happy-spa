<template>
  <div class="grayContentPage spaceFooterSP">

    <div class="mianHeader">
      <a @click="$router.go(-1)">
        <i class="arrow_forward"></i>
      </a>
      <p>تعديل الملف الشخصي</p>
      <img src="@/../image/mainWhite.png">
    </div>

    <div class="contentPageHeader">

      <div class="file is-boxed myImg" v-if='previweUrl'>

        <div class="personalPicture t0Mb0">
          <div class="myMainPicture">
            <div class="myPicture">
              <div class="handControl relative">
                <input 
                  class="file-input" 
                  accept="image/*" 
                  @change="file($event)" 
                  type="file" 
                  name="pic2" 
                >
                <span class="inputFileIcon t0Mb0">
                <i class="camera_alt golden"></i>
                </span>
                <img :src='previweUrl' class="borderRadius50">

              </div>
            </div>
          </div>

          <div class="file-label borderRadius50 personalPictureImg absolute t0Mb0" v-if='!previweUrl && !userInfo.avatarLink '>
            <input 
              class="file-input" 
              type="file" 
              name="pic1" 
              accept="image/*" 
              @change="file($event)"
            >
            <span class="file-cta">
              <span class="file-icon relative">
                <i class="camera_alt golden personalPictureBtn fontSize18 absolute"></i>
              </span>
            </span>
          </div>
        </div>

      </div>

      <div class="field">
        <div class="control">
          <input 
            class="input"  
            v-model="userInfo.profile.first_name" 
            type="text"
            placeholder="الإسم الأول"
            v-validate="'required|alpha_spaces'"
            name="firstName"
            :class="{ 
              'is-danger': fields.firstName ? !fields.firstName.valid && fields.firstName.changed : false,
              'wrongValue': fields.firstName ? !fields.firstName.valid && fields.firstName.changed : false,
              'is-success': fields.firstName ? fields.firstName.valid && fields.firstName.changed : false 
            }"
          >
        </div>
        <p v-if="fields.firstName ? !fields.firstName.valid && fields.firstName.changed : false" class="help is-danger">يجب ان لا يقل الأسم عن 3 احرف</p>
      </div>

      <div class="field">
        <div class="control">
          <input 
            class="input" 
            v-validate="'required|alpha_spaces'" 
            name="lastName"
            v-model="userInfo.profile.last_name" 
            type="text"
            placeholder="الإسم الأخير"
            :class="{ 
              'is-danger': fields.lastName ? !fields.lastName.valid && fields.lastName.changed : false,
              'wrongValue': fields.lastName ? !fields.lastName.valid && fields.lastName.changed : false,
              'is-success': fields.lastName ? fields.lastName.valid && fields.lastName.changed : false 
            }"
          >
        </div>
        <p v-if="fields.lastName ? !fields.lastName.valid && fields.lastName.changed : false" class="help is-danger">يجب ان لا يقل الأسم عن 3 احرف</p>
      </div>

      <div class="field">
        <div class="control has-icons-right">
          <input 
            class="input"
            name="username"
            v-validate="'required|alpha_dash'"
            type="text" 
            v-model="userInfo.username" 
            placeholder="اسم المستخدم"
            :class="{ 
              'is-danger': fields.username ? !fields.username.valid && fields.username.changed : false,
              'wrongValue': fields.username ? !fields.username.valid && fields.username.changed : false,
              'is-success': fields.username ? fields.username.valid && fields.username.changed : false 
            }"
          >
          <span class="icon is-small is-right">
            <i class="person fontSize20"></i>
          </span>
        </div>
        <p v-if="fields.username ? !fields.username.valid && fields.username.changed : false" class="help is-danger">يجب ان لا يقل عن 3 احرف</p>
      </div>

      <div class="field">
        <p class="control has-icons-right">
          <input 
            class="input"
            v-model="userInfo.profile.birth_date" 
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
            type="date"
            name="date"
            v-validate = "'date_format:YYY/MM/DD'"
            placeholder="يوم/شهر/سنة"
            :class="{ 
              'is-danger': fields.date ? !fields.date.valid && fields.date.changed : false,
              'wrongValue': fields.date ? !fields.date.valid && fields.date.changed : false,
              'is-success': fields.date ? fields.date.valid && fields.date.changed : false 
            }"
          >
          <span class="icon is-small is-right">
            <i class="date_range fontSize18"></i>
          </span>
        </p>
        <p v-if="fields.date ? !fields.date.valid && fields.date.changed : false" class="help is-danger"> أدخل تاريخ صالح من فضلك </p>
      </div>

      <div class="field">
        <p class="control has-icons-right">
          <input class="input" type="text" v-model="userInfo.profile.location" placeholder="المدينة">
          <span class="icon is-small is-right">
            <i class="person_pin_circle"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <div class="control">
          <textarea class="textarea" v-model="userInfo.profile.bio" type="text" placeholder="اكتب سيرتك الذاتية..."></textarea>
        </div>
      </div>

    </div>

    <footer class="lastDivision borderRadius50 width80">
      <div class="field">
        <p class="control">
          <button :disabled='errors.items.length != 0' class="button is-danger" :class="{'is-loading' : loading}"  @click="sendInformation">
            تعديل الملف الشخصي
          </button>
        </p>
      </div>
    </footer>
  </div>
</template>

<script src='./script.js'></script>
