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
                                @keyup.enter="addResults()"
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
                    :class="{ROUL: allPost && allPerson && !respondentPerson && !respondentPost}" 
                    @click="postAndPerson()">
                        <a 
                        href="#" 
                        :class="{ROULA: allPost && allPerson && !respondentPerson && !respondentPost}" 
                        >الكل</a></li>
                    <li 
                    :class="{ROUL: !allPost && !allPerson && respondentPost && !respondentPerson}" 
                    @click="post()">
                        <a 
                        href="#" 
                        :class="{ROULA: !allPost && !allPerson && respondentPost && !respondentPerson}" 
                        >منشورات</a></li>
                    <li 
                    :class="{ROUL: !allPost && !allPerson && !respondentPost && respondentPerson}" 
                    @click="person()">
                        <a 
                        href="#" 
                        :class="{ROULA: !allPost && !allPerson && !respondentPost && respondentPerson}"
                        >أشخاص</a></li>
                </ul>
            </div>
        </header>

        

            <div class="respondent-results" @click="selectedResearch()">
                <div class="respondent-post" v-if="allPost">
                    <div class="main-content fullWidth">
                        <ul class="search-process">
                            <li class="last-search">
                                <a href="#" class="delete-research-results" @click="moreResults()">مشاهدة المزيد</a>
                                <p class="last-research-results">أفضل المنشورات</p>
                                <a href="#" class="close-results" @click="closeAllPost()"><i class="fontSize18 closeX"></i></a>
                            </li>
                            <hr>
                        </ul>
                    </div>
                    <div class="backList" v-for="(result, index) in afterFiltered" :key="index" v-if="result.show">
                        <result-post :isMenu="menu" :isResult="result"></result-post>
                    </div>
                </div>
                <div class="respondent-person" v-if="allPerson">
                    <div class="main-content fullWidth">
                        <ul class="search-process">
                            <li class="last-search">
                                <a href="#" class="left delete-research-results" @click="moreResults()">مشاهدة المزيد</a>
                                <p class="right last-research-results">الأشخاص</p>
                                <a href="#" class="close-results" @click="closeAllPerson()"><i class="fontSize18 closeX"></i></a>
                            </li>
                            <hr>
                        </ul>
                    </div>
                    <div class="mySend fullWidth" v-for="(result, index) in afterFiltered" :key="index" v-if="result.show">
                        <result-person :isResult="result"></result-person>
                    </div>
                </div>
                <div class="respondent-post" v-if="respondentPost">
                    <div class="main-content fullWidth">
                        <ul class="search-process">
                            <li class="last-search">
                                <a href="#" class="delete-research-results" @click="moreResults()">مشاهدة المزيد</a>
                                <p class="last-research-results">أفضل المنشورات</p>
                                <a href="#" class="close-results" @click="respondentPost = false"><i class="fontSize18 closeX"></i></a>
                            </li>
                            <hr>
                        </ul>
                    </div>
                    <div class="backList" v-for="(result, index) in afterFiltered" :key="index" v-if="index < 2">
                        <result-post :isMenu="menu" :isResult="result"></result-post>
                    </div>
                </div>
                <div class="respondent-person" v-if="respondentPerson">
                    <div class="main-content fullWidth">
                        <ul class="search-process">
                            <li class="last-search">
                                <a href="#" class="left delete-research-results" @click="moreResults()">مشاهدة المزيد</a>
                                <p class="right last-research-results">الأشخاص</p>
                                <a href="#" class="close-results" @click="respondentPerson = false"><i class="fontSize18 closeX"></i></a>
                            </li>
                            <hr>
                        </ul>
                    </div>
                    <div class="mySend fullWidth" v-for="(result, index) in afterFiltered" :key="index" v-if="index < 5">
                        <result-person :isResult="result"></result-person>
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