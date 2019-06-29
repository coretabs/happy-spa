<template>
    <div class="grayContentPage height-0">

        <large-header>{{$t('verificationStep.activate')}}</large-header>
        
        <div class="contentPageHeader contentCenter">

            <img src="@/../image/undraw-mail.svg" class="mainPoster">
            
            <p class="paraContent">{{$t('verificationStep.activateEmail')}}</p>
            
            <div class="field">
            <p class="control has-icons-left">
                <span class="icon iconCenter is-small is-left">
                <i class="arrow_back"></i>
                </span>
            </p>
            </div>
            
            <div class="paraFooter">
                <p>
                    {{$t('verificationStep.receiveActivate')}}
                    <a @click="re_send">{{$t('verificationStep.re_send')}}</a>
                </p>
            </div>
            
        </div>

    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    data: () => {
        return {
            detail: {},
            email: "",
            user: ""
        };
    },
    methods: {
        re_send() {
            this.detail = {
                email: Cookies.getJSON('logedinUser').user.email
            }
            this.$api.auth
            .confirmation(this.detail)
            .then(re => {
                this.$emit("alert", {
                msg: this.$t("verificationStep.activateEmail")
              });
            })
            .catch(er => {
                console.log("error");
                console.log(er)
            })
        },
        isActivate() {
            this.user = Cookies.getJSON('logedinUser');
            this.$api.user
            .profile(this.user.user.username)
            .then(re => {
                this.user.user = re;
                
                Cookies.set("logedinUser", this.user);
                if (Cookies.getJSON('logedinUser').user.email_status) {
                this.$router.push(`/information`);
            }
            })
            .catch(er => {
                console.log(er)
            })
        }
    },
    created() {
        if (Cookies.getJSON('logedinUser')) {
            this.isActivate();
        }
    }
}
</script>
