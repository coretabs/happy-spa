<template>
    <div class="grayContentPage">

        <large-header>{{$t("forgotPassword.forgotPassword")}}</large-header>
        
        <div class="contentPageHeader">
            
            <img src="@/../image/undraw.svg" class="mainPoster">
            
            <p class="paraContent">{{$t("forgotPassword.passwordRecovery")}}</p>
            
            <div class="field">
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="email" :placeholder="$t('forgotPassword.enterEmail')" v-model="fEmail">
                <span class="icon is-small is-right">
                <i class="mail fontSize18"></i>
                </span>
            </div>
            </div>
            
            <div class="field">
            <p class="control">
                <button class="button is-success" @click="postFEmail">
                {{$t("forgotPassword.send")}}
                </button>
            </p>
            </div>

        </div>
        
        <footer class="orderFooterTop orderFooterBottom">
        
        <div class="paraFooter">
                <p>
                    {{$t('forgotPassword.no_account')}}
                    <router-link to="/signup">{{$t('forgotPassword.sign_up')}}</router-link>
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name : 'Forgot',
    data : () => {
        return {
            fEmail : '',
            info : ''
        }
    },
    methods : {
        postFEmail () {
            if (this.$parent.validateEmail(this.fEmail)) {
                this.info = {
                    email : this.fEmail
                }

                console.log(this.info)
            }
        },
        
    }
}
</script>