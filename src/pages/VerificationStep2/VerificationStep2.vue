<template>
    <div class="grayContentPage height-0">

        <div class="mianHeader">
            <a @click="$router.go(-1)">
                <i class="arrow_forward"></i>
            </a>
            <p>تفعيل حسابك</p>
            <img src="@/../image/mainWhite.png">
        </div>
        
        <div class="contentPageHeader contentCenter">

            <img src="@/../image/undraw-mail.svg" class="mainPoster">
            
            <p class="paraContent">تم إرسال رسالة التفعيل إلى بريدك الإلكتروني, يرجى تفقد الرسالة لتفعيل حسابك</p>
            
            <div class="field">
            <p class="control has-icons-left">
                <span class="icon iconCenter is-small is-left">
                <i class="arrow_back"></i>
                </span>
            </p>
            </div>
            
            <div class="paraFooter">
                <p>
                    لم تصلك رسالة التفعيل؟
                    <a href="#">أعد إرسال الرسالة</a>
                </p>
            </div>
            
        </div>

    </div>
</template>
