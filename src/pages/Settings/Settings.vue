<template>
    <div class="grayContentPage setting height-0">
        <header class="topHeader box-shadow">
            <a @click="$router.go(-1)">
                <i class="arrow_forward"></i>
            </a>
            <p>الإعدادات</p>
        </header> 
            
          
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

        <footer class="bottomFooter box-shadow">
            <ul>
                <li><router-link  :to='`/home?id=${$route.query.id}`'><i class="home fontSize30"></i></router-link></li>
                <li><router-link to="#"><i class="notifications fontSize30"></i></router-link></li>
                <li><router-link to="/newpost"><i class="add_box fontSize30"></i></router-link></li>
                <li><router-link to="#"><i class="explore fontSize28"></i></router-link></li>
                <li><router-link :to="`/profile?id=${$route.query.id}`" ><i class="person fontSize30"></i></router-link></li>
            </ul>
      </footer>
    </div>
</template>