<template>
    <div class="grayContentPage spaceFooterS">
    
        <div class="mianHeader">
            <router-link :to="'/'">
                <i class="material-icons">arrow_forward</i>
            </router-link>
            <p>تعديل الملف الشخصي</p>
            <img src="@/../image/mainWhite.png">
        </div>
    
        <div class="contentPageHeader">
           
            <div class="file is-boxed myImg" v-if='previweUrl'>
                <label class="file-label personalPicture">
                    <img :src='previweUrl'>
                </label>
                
                <label class="file-label personalPicture personalPictureImg">
                    <input class="file-input" accept="image/*"  @change="file($event)"  type="file" name="resume">
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="material-icons golden">photo_camera</i>
                        </span>
                    </span>
                </label>
            </div>

            <div class="file is-boxed" v-if='!previweUrl && !userInfo.avatarLink '>
                <label class="file-label personalPicture">     
                    <input class="file-input" accept="image/*"  @change="file($event)"  type="file" name="resume">
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="material-icons golden">photo_camera</i>
                        </span>
                    </span>
                </label>
            </div>
        
            <div class="field">
                <div class="control">
                    <input :class="firstNameClasses" @keyup="validateFirstName"  v-model="userInfo.profile.first_name"  type="text" placeholder="الإسم الأول">
                </div>
                <p v-if="firstNameError" class="help is-danger">يجب ان لا يقل الأسم عن 3 احرف</p>
            </div>
            
            <div class="field">
                <div class="control">
                    <input :class="lastNameClasses" @keyup="validateLastName"  v-model="userInfo.profile.last_name" type="text" placeholder="الإسم الأخير">
                </div>
                <p v-if="lastNameError" class="help is-danger">يجب ان لا يقل الأسم عن 3 احرف</p>
            </div>
                
            <div class="field">
                <div class="control has-icons-right">
                    <input :class="usernameClasses" @keyup="validateUsername"  type="text"  v-model="userInfo.username" placeholder="اسم المستخدم">
                    <span class="icon is-small is-right">
                        <i class="material-icons fontSize20">person</i>
                    </span>
                </div>
                <p v-if="usernameError" class="help is-danger">يجب ان لا يقل عن 3 احرف</p>
            </div>
            
            <div class="field">
                <p class="control has-icons-right">
                    <input :class="dateClasses" @keyup="validateDate"  v-model="userInfo.profile.birth_date" onfocus="(this.type='date')"   onblur="(this.type='text')"  type="text" placeholder="يوم/شهر/سنة">
                    <span class="icon is-small is-right">
                        <i class="material-icons fontSize18">date_range</i>
                    </span>
                </p>
                <p v-if="dateError" class="help is-danger"> {{dateError}}  </p>
            </div> 
            
            <div class="field">
                <p class="control has-icons-right">
                    <input class="input" type="text" v-model="userInfo.profile.location"  placeholder="المدينة">
                    <span class="icon is-small is-right">
                        <i class="material-icons">person_pin_circle</i>
                    </span>
                </p>
            </div>
            
            <div class="field">
                <div class="control">
                    <textarea class="textarea" v-model="userInfo.profile.bio"  type="text" placeholder="اكتب سيرتك الذاتية..."></textarea>
                </div>
            </div>
        
        </div>
		
        <footer class="lastDivision borderRadius50 width80 orderFooterBottom">
			<div class="field">
                <p class="control">
                    <button class="button is-success" @click="sendInformation">
                        حفظ
                    </button>
                </p>
            </div>
		</footer>
    </div>
</template>

<script src='./script.js'></script>