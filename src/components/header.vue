<template>
    <v-toolbar app height="50" class="box-shadow white">
        <v-spacer></v-spacer>
        <v-btn icon class="btn-icon" @click="$router.go(-1)" v-if="backArrow">
            <i class="arrow_forward text-bold fontSize30"></i>
        </v-btn>
        <img class="grinn" src="@/../image/grinn.svg" v-if="logo">
        <v-toolbar-title>
            <p class="center" v-if="Setting">{{$t("setting.settings")}}</p>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat dark small round @click="newPostSend" :disabled="buttonOptions" class="share fontSize18 yellow accent-3" v-if="share">
            {{$t("newPost.share")}}
        </v-btn>
        <v-btn flat fab small @click="$router.push('/more')" class="left header-menu" v-if="mainMenu">
            <i class="more_vert fontSize30"></i>
        </v-btn>
    </v-toolbar>
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

<style lang="scss">
    @import '../assets/style/vars';

    nav {
        z-index: 60!important;
        .v-toolbar__content {
            .btn-icon {
                position: fixed;
                margin: $auto;
                font-weight: bold;
                color: $dark-blue-color;
                cursor: pointer;
                z-index: 5;
            }
            .grinn {
                position: fixed;
                left: 0;
                right: 0;
                height: inherit;
                width: 3em;
                margin: auto;
            }
            .share {
                margin: 0;
                cursor: pointer;
                z-index: 5;
            }
            .header-menu {
                margin: 0;
            }
        }
        .v-toolbar__title {
            margin: $auto;
            p {
                margin: $auto;
                font-weight: bold;
                color: $dark-blue-color;
            }
        }
    }

</style>