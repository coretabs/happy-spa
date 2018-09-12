<template>
    <div class="grayContentPage spaceFooterS">
    
        <div class="mianHeader">
            <router-link to="/">
                <i class="material-icons">arrow_forward</i>
            </router-link>
            <p>تعديل الملف الشخصي</p>
            <img src="@/../image/mainWhite.png">
        </div>
    
        <div class="contentPageHeader">
           
            <div class="file is-boxed">
            <label class="file-label personalPicture">
                
                <input class="file-input" @change="file($event)"  type="file" name="resume">
                <span class="file-cta">
                <span class="file-icon">
                    <i class="material-icons golden">photo_camera</i>
                </span>
                </span>
            </label>
            </div>
        
            <div class="field">
            <div class="control">
                <input class="input" type="text" placeholder="الإسم الأول">
            </div>
            </div>
            
            <div class="field">
            <div class="control">
                <input class="input" type="text" placeholder="الإسم الأخير">
            </div>
            </div>
                
            <div class="field">
            <div class="control has-icons-right">
                <input class="input" type="text" placeholder="اسم المستخدم">
                <span class="icon is-small is-right">
                    <i class="material-icons fontSize20">person</i>
                </span>
            </div>
            </div>
            
            <div class="field">
            <p class="control has-icons-right">
                <input class="input" type="text" placeholder="يوم/شهر/سنة">
                <span class="icon is-small is-right">
                    <i class="material-icons fontSize18">date_range</i>
                </span>
            </p>
            </div> 
            
            <div class="field">
                <p class="control has-icons-right">
                    <input class="input" type="text" placeholder="المدينة">
                    <span class="icon is-small is-right">
                        <i class="material-icons">person_pin_circle</i>
                    </span>
                </p>
            </div>
            
            <div class="field">
                <div class="control">
                    <textarea class="textarea" type="text" placeholder="اكتب سيرتك الذاتية..."></textarea>
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
        <img :src='previweUrl'  >
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data : () => {
        return {
            userInfo : {

            },
            previweUrl :''
        }
    },
    methods : {
        file(e) {
            this.userInfo.avatar = e.target.files[0];
            this.previweUrl = URL.createObjectURL(this.userInfo.avatar)
        }
    }

}
</script>