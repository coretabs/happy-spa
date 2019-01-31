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
                    :class="dirRTL"
                    dir="auto"
                    type="text" 
                    :placeholder="$t('contactUs.userName')"
                >
                <span class="icon is-small" :class="is_way_R">
                    <i class="person fontSize20"></i>
                </span>
                </div>
                <p v-if="fields.username ? !fields.username.valid && fields.username.changed : false" class="help is-danger">يجب ان لا يقل عن 3 احرف</p>
            </div>

            <div class="field">
                <p class="control" :class="has_icons_R">
                    <input class="input" :class="dirRTL" dir="auto" type="email" :placeholder="$t('contactUs.email')">
                    <span class="icon is-small" :class="is_way_R">
                    <i class="mail fontSize18"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <div class="control">
                <textarea class="textarea" :class="dirRTL" dir="auto" type="text" :placeholder="$t('contactUs.note')"></textarea>
                </div>
            </div>

            <footer class="lastDivision borderRadius50 width80 orderFooterBottom">    
                <div class="field">
                    <p class="control">
                        <button class="button is-success">
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