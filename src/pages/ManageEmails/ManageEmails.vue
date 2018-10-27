<template>
    <div class="grayContentPage">
        <div class="mianHeader">
            <a @click="$router.go(-1)">
                <i class="arrow_forward"></i>
            </a>
            <p>إدارة البريد الإلكتروني</p>
            <img src="@/../image/mainWhite.png">
        </div>
        
        <div class="contentPageHeader">
            
            <img src="@/../image/opened-mail.svg" class="mainPoster">
            
            <div id="menuItems">
                <div class="enterMail">
                    <p class="paraContent">البريد الإلكتروني الأساسي</p>

                    <div class="field">
                    <p class="control has-icons-right">
                        <input class="input" type="email" placeholder="أدخل بريدك الإلكتروني">
                        <span class="icon is-small is-right">
                        <i class="mail fontSize18"></i>
                        </span>
                    </p>
                    </div>
                </div>

                <div class="enterMail">
                    <p class="paraContent">البريد الإلكتروني الإحتياطي</p>

                    <div class="field">
                    <p class="control has-icons-right">
                        <input class="input" type="email" placeholder="أدخل بريدك الإلكتروني">
                        <span class="icon is-small is-right">
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
                حفظ
                </button>
            </p>
            </div>
        
        </footer>
    </div>
</template>

<script src='./script.js'></script>