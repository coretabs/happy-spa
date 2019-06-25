<template>
  <div class="grayContentPage height-max">

    <large-header>{{$t("contactUs.contact_us")}}</large-header>

    <div class="backList box-shadow main-policy directionRTL">
        <div class="contentPageHeader">

            <img src="@/../image/world.svg" class="mainPoster">
            
            <div class="field">
                <div class="control" :class="has_icons_R">
                <input 
                    class="input" 
                    name="username" 
                    v-model="username" 
                    v-validate="'required|alpha_dash|min:3'" 
                    :class="[dirRTL, 
                        { 
                        'is-danger': fields.username ? !fields.username.valid && fields.username.changed : false,
                        'wrongValue': fields.username ? !fields.username.valid && fields.username.changed : false,
                        'is-success': fields.username ? fields.username.valid && fields.username.changed : false 
                        }]" 
                    dir="auto"
                    type="text" 
                    :placeholder="$t('contactUs.userName')"
                >
                <span class="icon is-small" :class="is_way_R">
                    <i class="person fontSize20"></i>
                </span>
                </div>
                <p v-if="fields.username ? !fields.username.valid && fields.username.changed : false" class="help is-danger">{{$t('contactUs.characters3')}}</p>
            </div>

            <div class="field">
                <p class="control" :class="has_icons_R">
                    <input class="input" 
                    v-validate="'required|email'" 
                    name="email" 
                    :class="[dirRTL, { 
                        'is-danger': fields['email'] ? !fields['email'].valid && fields['email'].changed : false,
                        'is-success': fields['email'] ? fields['email'].valid && fields['email'].changed : false 
                    }]" 
                    dir="auto" 
                    type="email" 
                    :placeholder="$t('contactUs.email')" 
                    v-model="email" 
                    >
                    <span class="icon is-small" :class="is_way_R">
                    <i class="mail fontSize18"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <div class="control subject" :class="has_icons_R">
                <div class="select is-rounded" :class="dirRTL">
                    <select class=" fullWidth borderRadius50" v-model="title">
                        <option>{{$t('contactUs.subjects.forgot_password')}}</option>
                        <option>{{$t('contactUs.subjects.activation')}}</option>
                        <option>{{$t('contactUs.subjects.Other')}}</option>
                    </select>
                </div>
                </div>
            </div>

            <div class="field" v-if="title == 'غير ذلك'">
                <p class="control" :class="has_icons_R">
                    <input class="input" 
                    v-validate="'required|alpha'" 
                    name="title" 
                    :class="[dirRTL, { 
                        'is-danger': fields['title'] ? !fields['title'].valid && fields['title'].changed : false,
                        'is-success': fields['title'] ? fields['title'].valid && fields['title'].changed : false 
                    }]" 
                    dir="auto" 
                    type="text" 
                    v-model="usrTitle" 
                    >
                </p>
            </div>

            <div class="field">
                <div class="control">
                <textarea 
                class="textarea" 
                v-validate="'required|alpha_dash|min:3'" 
                name="textarea"
                :class="[dirRTL, 
                    { 
                    'is-danger': fields.textarea ? !fields.textarea.valid && fields.textarea.changed : false,
                    'wrongValue': fields.textarea ? !fields.textarea.valid && fields.textarea.changed : false,
                    'is-success': fields.textarea ? fields.textarea.valid && fields.textarea.changed : false 
                    }]" 
                dir="auto" 
                type="text" 
                :placeholder="$t('contactUs.note')" 
                v-model="message"
                ></textarea>
                </div>
                <p v-if="fields.textarea ? !fields.textarea.valid && fields.textarea.changed : false" class="help is-danger">{{$t('contactUs.characters3')}}</p>
            </div>

            
            <footer class="lastDivision borderRadius50 width80 orderFooterBottom">    
                <div class="field">
                    <p class="control">
                        <button class="button is-success" :class="{'is-loading' : loading }" :disabled='loading || fields.textarea ? !fields.textarea.valid && fields.textarea.changed : false' @click="sendContact">
                        {{$t("contactUs.send")}}
                        </button>
                    </p>
                </div>
            </footer>
        </div>

    </div>
  </div>
</template>

<script src='./script.js'></script>