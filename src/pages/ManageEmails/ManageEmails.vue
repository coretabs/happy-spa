<template>
    <div class="grayContentPage">

        <large-header>{{$t("manageEmail.manageE_mail")}}</large-header>
        
        <div class="contentPageHeader">
            
            <img src="@/../image/opened-mail.svg" class="mainPoster">
            
            <div id="menuItems">
                <div class="enterMail">
                    <p class="paraContent" :class="textAlgin">{{$t("manageEmail.basicEmail")}}</p>

                    <div class="field">
                    <p class="control" :class="has_icons">
                        <input class="input" :class="textAlgin" type="email" :placeholder="$t('manageEmail.enterEmail')">
                        <span class="icon is-small" :class="is_way">
                        <i class="mail fontSize18"></i>
                        </span>
                    </p>
                    </div>
                </div>

                <div class="enterMail">
                    <p class="paraContent" :class="textAlgin">{{$t("manageEmail.backupEmail")}}</p>

                    <div class="field">
                    <p class="control" :class="has_icons">
                        <input class="input" :class="textAlgin" type="email" :placeholder="$t('manageEmail.enterEmail')">
                        <span class="icon is-small" :class="is_way">
                        <i class="mail fontSize18"></i>
                        </span>
                    </p>
                    </div>
                </div>
            </div>
            
        </div>
        
        <footer class="lastDivision borderRadius50 width80 orderFooterBottom">
            
        <div class="field">
            <p class="control">
                <button class="button is-success">
                {{$t("manageEmail.save")}}
                </button>
            </p>
            </div>
        
        </footer>
    </div>
</template>

<script src='./script.js'></script>