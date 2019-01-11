<template>
    <div>
        <div class="backgroundSend">
            <div class="bgTextSend bgTextAndImageSend">
                <div class="respondent-content">
                    <div class="textSend">
                        <p>وصف طويل للصورة مكون من سطرين. كل سطر يوجد به كلام ليس له معنى</p>
                    </div>
                    <div class="bgImage">
                        <img src="@/../image/fox.jpg" alt="">
                    </div>
                </div>
                <ul class="communion center fullWidth">
                    <li>
                        <a href="#">
                        <span>120</span>
                        <i class="question_answer"></i>
                        </a>
                    </li>
                    <li class="hand-Up">
                        <a href="#">
                        <span>120</span>
                        <img class="middle" src="@/../image/smile.svg">
                        </a>
                    </li>
                    <li class="hand-Down">
                        <a href="#">
                        <span>120</span>
                        <img class="middle" src="@/../image/sad.svg">
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <span>120</span>
                        <i class="icon-reply"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="myMenu">
                <a class="left whiteGray">
                    <span>الوقت</span>
                    <i @click="showMenu(isResult.id)" class="more_vert"></i>
                </a>
            </div>
            <div v-if="isMenu && isResult.id == resultid" class="menuPost box-shadow center absolute">
                <a
                    @click="deleteResult(isResult)"
                    class="class wrongValue"
                    >حذف النتيجة</a>
                <hr>
                <a class="class" @click="$emit('openReport' , isResult.id)">تبليغ</a>
            </div>
            <div class="personPost">
                <a href="#">
                <img src="@/../image/cat.jpg">
                </a>
                <a class="personName">{{isResult.name}}</a>
            </div>
        </div>
        <hr class="fullWidth">
    </div>
</template>

<script>
export default {
    props: {
        isMenu: Boolean,
        isResult: Object
    },
    data() {
        return {
            
        }
    },
    created() {
        
    }
}
</script>
