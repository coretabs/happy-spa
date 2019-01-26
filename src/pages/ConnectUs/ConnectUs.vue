<template>
  <div class="grayContentPage height-max">

    <large-header>تواصل معنا</large-header>

    <div class="backList box-shadow main-policy directionRTL">
        <div class="contentPageHeader">

            <img src="@/../image/world.svg" class="mainPoster">
            
            <div class="field">
                <div class="control has-icons-right">
                <input 
                    class="input"
                    type="text" 
                    placeholder="اسم المستخدم"
                >
                <span class="icon is-small is-right">
                    <i class="person fontSize20"></i>
                </span>
                </div>
                <p v-if="fields.username ? !fields.username.valid && fields.username.changed : false" class="help is-danger">يجب ان لا يقل عن 3 احرف</p>
            </div>

            <div class="field">
                <p class="control has-icons-right">
                    <input class="input" type="email" placeholder="أدخل بريدك الإلكتروني">
                    <span class="icon is-small is-right">
                    <i class="mail fontSize18"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <div class="control">
                <textarea class="textarea" type="text" placeholder="اكتب ملاحظتك هنا ..."></textarea>
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

    </div>
  </div>
</template>