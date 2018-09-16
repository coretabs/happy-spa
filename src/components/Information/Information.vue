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
           
            <div class="file is-boxed myImg" v-if='previweUrl || userInfo.avatarLink '>
                <label class="file-label personalPicture">
                    <img :src='previweUrl'>
                </label>
                
                <label class="file-label personalPicture personalPictureImg">
                    <input class="file-input" @change="file($event)"  type="file" name="resume">
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="material-icons golden">photo_camera</i>
                        </span>
                    </span>
                </label>
            </div>

            <div class="file is-boxed" v-if='!previweUrl && !userInfo.avatarLink '>
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

<script>
import Corefun from '@/api'
import Cookies from 'js-cookie'
export default {
    data : () => {
        return {
            userInfo : {
                profile : {
                    bio : '',
                    first_name : '',
                    last_name : '',
                    location : '',
                    birth_date : '',
                    link : []
                },
                username : '',
                avatar : ''
            },
            previweUrl :'',
            firstNameError : '',
            lastNameError : '',
            usernameError : '',
            dateError : '',
            firstNameClasses : {
                'is-danger' : false,
                'wrongValue' : this['is-danger'],
                'input' : true
            },
            lastNameClasses : {
                'is-danger' : false,
                'wrongValue' : false,
                'input' : true
            },
            usernameClasses : {
                'is-danger' : false,
                'wrongValue' : false,
                'input' : true
            },
            dateClasses : {
                'is-danger' : false,
                'wrongValue' : false,
                'input' : true
            }
        }
    },
    methods : {
        file(e) {
            this.userInfo.avatar = e.target.files[0];
            this.previweUrl = URL.createObjectURL(this.userInfo.avatar)
        },
        validateFirstName () {
            if (this.userInfo.profile.first_name && this.userInfo.profile.first_name.length >= 3) {
                this.firstNameError = false
                this.firstNameClasses['is-danger'] = false
                this.firstNameClasses['wrongValue'] = false
            } else {
                this.firstNameError = true
                this.firstNameClasses['is-danger'] = true
                this.firstNameClasses['wrongValue'] = true
            }
        },
        validateLastName () {
            if (this.userInfo.profile.last_name && this.userInfo.profile.last_name.length >= 3) {
                this.lastNameError = false
                this.lastNameClasses['is-danger'] = false
                this.lastNameClasses['wrongValue'] = false
            } else {
                this.lastNameError = true
                this.lastNameClasses['is-danger'] = true
                this.lastNameClasses['wrongValue'] = true
            }
        },
        validateUsername () {
            if (this.$parent.validateUsername(this.userInfo.username) && this.userInfo.username.length >= 3) {
                this.usernameError = false
                this.usernameClasses['is-danger'] = false
                this.usernameClasses['wrongValue'] = false
            } else {
                this.usernameError = true
                this.usernameClasses['is-danger'] = true
                this.usernameClasses['wrongValue'] = true
            }
        },
        validateDate (e) {
           let date = e.srcElement.value.split('-')
           let year = Number(date[0]) <= 2005 && Number(date[0]) >= 1918
           if (!year) {
               this.dateClasses['is-danger'] = true
               this.dateClasses['wrongValue'] = true
               this.dateError = 'أدخل تاريخ صالح من فضلك'
           } else {
               this.dateClasses['is-danger'] = false
               this.dateClasses['wrongValue'] = false
               this.dateError = undefined
               
           }
        },
        sendInformation () {
            Corefun.information(this.userInfo)
            .then (re => {
                console.log(re)
            })
            .catch(er => console.log(er))
        }
    },
    created () {
        if (Cookies.getJSON('logedinUser')) {
            if(Cookies.getJSON('logedinUser').user.email_status){
                this.userInfo = Cookies.getJSON('logedinUser').user
            }
        } else {
            this.$router.push('/login')
        }
    }

}
</script>