<template>
    <div class="withApp">
    
        <app-header a1="back" a3="image"></app-header>

        <v-layout row>
            <v-flex>
                <v-list tow-line>
                    <v-list-tile @click="$router.push('/settings')" :class="[textAlgin, Blist]">
                        <v-list-tile-action>
                            <i class="settings fontSize24 blue-grey--text text--lighten-3"></i>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="blue-grey--text text--lighten-3">{{$t("more.setting")}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <hr>
                    <v-list-tile v-if="false" @click="$router.push('#')" :class="[textAlgin, Blist]">
                        <v-list-tile-content>
                            <v-list-tile-title class="blue-grey--text text--lighten-3">العناصر المحفوظة</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <hr v-if="false">
                    <v-list-tile @click="$router.push('/connect-us')" :class="[textAlgin, Blist]">
                        <v-list-tile-content>
                            <v-list-tile-title class="blue-grey--text text--lighten-3">{{$t("more.connectUs")}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <hr>
                    <v-list-tile @click="$router.push('/privacy-policy')" :class="[textAlgin, Blist]">
                        <v-list-tile-content>
                            <v-list-tile-title class="blue-grey--text text--lighten-3">{{$t("more.terms")}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <hr>
                    <v-list-tile @click="$router.push('#')" :class="[textAlgin, Blist]">
                        <v-list-tile-content>
                            <v-list-tile-title class="blue-grey--text text--lighten-3">{{$t("more.about")}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <hr>
                    <v-list-tile @click="signout" :class="[textAlgin, Blist]">
                        <v-list-tile-action>
                            <i class="exit_to_app fontSize24 blue-grey--text text--darken-4"></i>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="blue-grey--text text--darken-4">{{$t("more.signOut")}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
        </v-layout>

      <app-footer></app-footer>
    </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    methods : {
        signout() {
            Cookies.remove('logedinUser')
            this.$router.push('/')
        },
        chatra(){
            Chatra('openChat', true)
        }
    },
    created () {
        if(!Cookies.getJSON('logedinUser')) {
            this.$router.push('/login')
        }
        Chatra('show')
    },
    destroyed(){
        Chatra('hide')
    },
    'computed': {
        textAlgin: function () {
            return (this.$i18n.locale == 'ar') ? 'row' : 'rerow';
        },
        Blist: function () {
            return (this.$i18n.locale == 'ar') ? 'BRlist' : 'BLlist';
        }
    }
}
</script>

<style lang="scss">
    @import '../../assets/style/vars';

    .layout {
        .flex {
            .v-list {
                padding: 0;
                margin: 55px 0 0;
                hr {
                    width: 80%;
                    margin: 0 auto;
                }
                div {
                    a {
                        width: 80%;
                        padding: 0;
                        margin: auto;
                        transition-property: padding;
                        transition-duration: 1s;
                        .v-list__tile__action {
                            min-width: 0;
                        }
                        .v-list__tile__content {
                            flex: inherit;
                        }
                    }
                }
            }
        }
    }
    .theme--light.v-list .v-list__tile--link:hover {
        padding: 0 10%;
    }
    .BRlist a:hover {
        border-right: 5px solid $main-color;
    }
    .BLlist a:hover {
        border-left: 5px solid $main-color;
    }
    .row a {
        flex-direction: row;
    }
    .rerow a {
        flex-direction: row-reverse;
    }
</style>