<template>
    <header class="topHeader box-shadow">
        <router-link to="/more" class="left" v-if="mainMenu">
            <i class="more_vert"></i>
        </router-link>
        <a @click="$router.go(-1)" v-if="backArrow">
            <i class="arrow_forward"></i>
        </a>
        <img src="@/../image/grinn.svg" v-if="logo">
        <p v-if="Setting">{{$t("setting.settings")}}</p>
        <button @click="newPostSend" :disabled="buttonOptions" class="share" v-if="share">
            {{$t("newPost.share")}}
        </button>
    </header>
</template>

<script>
export default {
    props:{
        a1: String, 
        a2: String, 
        a3: String, 
        a4: String, 
        a5: String, 
        newPostSend: Function,
        buttonOptions: Boolean
    },
    data() {
        return {
            backArrow: false,
            mainMenu: false,
            logo: false,
            share: false,
            Setting: false,
        }
    },
    methods: {
        
    },
    created() {
        if (this.a1 == "back") {
            this.backArrow = true
        }
        if (this.a2 == "menu") {
            this.mainMenu = true
        }
        if (this.a3 == "image") {
            this.logo = true
        }
        if (this.a4 == "button") {
            this.share = true
        }
        if (this.a5 == "para") {
            this.Setting = true
        }
        if (this.buttonOptions) {
            this.action = false
        }
    }
}

</script>