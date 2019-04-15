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
                    <a href="#">{{$t('verificationStep.re_send')}}</a>
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

        };
    },
    methods: {
        
    },
    created() {
        if (Cookies.getJSON('logedinUser').user.email_status) {
            this.$router.push(`/profile`);
        }
    }
}
</script>
