<template>
  <div class="grayContentPage spaceFooterSP">

    <large-header>{{$t("information.editProfile")}}</large-header>

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
            :placeholder="$t('information.firstName')"
            v-validate="'required|alpha_spaces'"
            name="firstName"
            dir="auto"
            :class="[dirRTL, 
            { 
              'is-danger': fields.firstName ? !fields.firstName.valid && fields.firstName.changed : false,
              'wrongValue': fields.firstName ? !fields.firstName.valid && fields.firstName.changed : false,
              'is-success': fields.firstName ? fields.firstName.valid && fields.firstName.changed : false 
            }]"
          >
        </div>
        <p v-if="fields.firstName ? !fields.firstName.valid && fields.firstName.changed : false" class="help is-danger">{{$t('information.characters')}}</p>
      </div>

      <div class="field">
        <div class="control">
          <input 
            class="input" 
            v-validate="'required|alpha_spaces'" 
            name="lastName"
            v-model="userInfo.profile.last_name" 
            type="text"
            dir="auto"
            :placeholder="$t('information.lastName')"
            :class="[dirRTL, 
            { 
              'is-danger': fields.lastName ? !fields.lastName.valid && fields.lastName.changed : false,
              'wrongValue': fields.lastName ? !fields.lastName.valid && fields.lastName.changed : false,
              'is-success': fields.lastName ? fields.lastName.valid && fields.lastName.changed : false 
            }]"
          >
        </div>
        <p v-if="fields.lastName ? !fields.lastName.valid && fields.lastName.changed : false" class="help is-danger">{{$t('information.characters')}}</p>
      </div>

      <div class="field">
        <div class="control" :class="has_icons">
          <input 
            class="input"
            name="username"
            v-validate="'required|alpha_dash'"
            type="text" 
            v-model="userInfo.username" 
            dir="auto" 
            :placeholder="$t('information.userName')"
            :class="[dirRTL, 
            { 
              'is-danger': fields.username ? !fields.username.valid && fields.username.changed : false,
              'wrongValue': fields.username ? !fields.username.valid && fields.username.changed : false,
              'is-success': fields.username ? fields.username.valid && fields.username.changed : false 
            }]"
          >
          <span class="icon is-small" :class="is_way">
            <i class="person fontSize20"></i>
          </span>
        </div>
        <p v-if="fields.username ? !fields.username.valid && fields.username.changed : false" class="help is-danger">{{$t('information.characters')}}</p>
      </div>

      <div class="field">
        <p class="control" :class="has_icons">
          <input 
            class="input"
            v-model="userInfo.profile.birth_date" 
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
            type="text"
            name="date"
            v-validate = "'date_format:YYY/MM/DD'"
            dir="auto"
            :placeholder="$t('information.birthday')"
            :class="[dirRTL, 
            { 
              'is-danger': fields.date ? !fields.date.valid && fields.date.changed : false,
              'wrongValue': fields.date ? !fields.date.valid && fields.date.changed : false,
              'is-success': fields.date ? fields.date.valid && fields.date.changed : false
            }]"
          >
          <span class="icon is-small" :class="is_way">
            <i class="date_range fontSize20"></i>
          </span>
        </p>
        <p v-if="fields.date ? !fields.date.valid && fields.date.changed : false" class="help is-danger">{{$t('information.characters')}}</p>
      </div>

      <div class="field">
        <p class="control" :class="has_icons">
          <input class="input" dir="auto" :class="dirRTL" type="text" v-model="userInfo.profile.location" :placeholder="$t('information.city')">
          <span class="icon is-small" :class="is_way">
            <i class="person_pin_circle"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <div class="control">
          <textarea class="textarea" dir="auto" :class="dirRTL" v-model="userInfo.profile.bio" type="text" :placeholder="$t('information.cv')"></textarea>
        </div>
      </div>

    </div>

    <footer class="lastDivision borderRadius50 width80">
      <div class="field">
        <p class="control">
          <button :disabled='errors.items.length != 0' class="button is-danger" :class="{'is-loading' : loading}"  @click="sendInformation">
            {{$t("information.editProfile")}}
          </button>
        </p>
      </div>
    </footer>
  </div>
</template>

<script src='./script.js'></script>
