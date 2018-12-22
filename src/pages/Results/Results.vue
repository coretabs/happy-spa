<template>
<div>
    <div class="grayContentPage results-page relative spaceFooter">
        <header class="search-input left right box-shadow top">
            <div class="container">
                <ul>
                    <li class="back-search">
                        <a @click="$router.go(-1)">
                                <i class="arrow_forward"></i>
                        </a>
                    </li>
                    <li class="search-content">
                        <div class="field">
                            <p class="control has-icons-left">
                                <input 
                                type= "text" 
                                class= "input" 
                                placeholder= "بحث" 
                                v-model= "search" 
                                @focus= "searchStatus = true" 
                                @blur= "searchStatus = false" 
                                >
                                <span class="icon is-small is-left cleanSearch" v-if="search" @click="cleanSearch()">
                                <i class="closeX fontSize22"></i>
                                </span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="results-options">
                <ul>
                    <li 
                    :class="{ROUL: respondentPost && respondentPerson}" 
                    @click="postAndPerson()">
                        <a 
                        href="#" 
                        :class="{ROULA: respondentPost && respondentPerson}" 
                        >الكل</a></li>
                    <li 
                    :class="{ROUL: respondentPost && !respondentPerson}" 
                    @click="post()">
                        <a 
                        href="#" 
                        :class="{ROULA: respondentPost && !respondentPerson}" 
                        >منشورات</a></li>
                    <li 
                    :class="{ROUL: !respondentPost && respondentPerson}" 
                    @click="person()">
                        <a 
                        href="#" 
                        :class="{ROULA: !respondentPost && respondentPerson}"
                        >أشخاص</a></li>
                </ul>
            </div>
        </header>

        

            <div class="respondent-results">
                <div class="respondent-post" v-if="respondentPost">
                    <div class="main-content fullWidth">
                        <ul class="search-process">
                            <li class="last-search">
                                <a href="#" class="left delete-research-results" @click="moreResults()">مشاهدة المزيد</a>
                                <p class="right last-research-results">أفضل المنشورات</p>
                            </li>
                            <hr>
                        </ul>
                    </div>
                    <div class="backList" v-for="result in filteredSearchs">
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
                                    <i class="more_vert"></i>
                                </a>
                            </div>
                            <div class="personPost">
                                <a href="#">
                                <img src="@/../image/cat.jpg">
                                </a>
                                <a class="personName">{{result.name}}</a>
                            </div>
                        </div>
                        <hr class="fullWidth">
                    </div>
                </div>
                <div class="respondent-person" v-if="respondentPerson">
                    <div class="main-content fullWidth">
                        <ul class="search-process">
                            <li class="last-search">
                                <a href="#" class="left delete-research-results" @click="moreResults()">مشاهدة المزيد</a>
                                <p class="right last-research-results">الأشخاص</p>
                            </li>
                            <hr>
                        </ul>
                    </div>
                    <div class="mySend fullWidth" v-for="result in filteredSearchs">
                        <div class="personPost">
                            <a href="#">
                                <img src="@/../image/puppy.jpg">
                            </a>
                            <p>علق<a href="#" class="personName"> {{result.name}} </a>على صورتك
                            <br>
                            <span>الوقت</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        <footer class="bottomFooter box-shadow">
            <ul>
                <li>
                <router-link class="actieFooterLink" to="/home">
                    <i class="home fontSize30"></i>
                </router-link>
                </li>
                <li>
                <router-link to="#">
                    <i class="notifications fontSize30"></i>
                </router-link>
                </li>
                <li>
                <router-link to="/newpost">
                    <i class="add_box fontSize30"></i>
                </router-link>
                </li>
                <li>
                <router-link to="#">
                    <i class="explore fontSize28"></i>
                </router-link>
                </li>
                <li>
                <router-link to="/profile">
                    <i class="person fontSize30"></i>
                </router-link>
                </li>
            </ul>
        </footer>
    </div>
</div>
</template>

<script src='./script.js'></script>