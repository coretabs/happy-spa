<template>
    <div class="grayContentPage setting height-0">

        <app-header a1="back" a5="para"></app-header>
          
        <div class="headContent">
            <div class="settingPara">
                <p>إعدادات الحساب</p>
            </div>
            
            <div class="backList settingList">
                <router-link to="/information">تعديل الملف الشخصي</router-link>
                <hr>
                <router-link to="/changepassword">تغيير كلمة السر</router-link>
                <hr>
                <router-link to="/manageemails">إدارة البريد الإلكتروني</router-link>
                <hr>
                <router-link to="/links">إدارة الروابط</router-link>
            </div>
        </div>  

      <app-footer></app-footer>
    </div>
</template>