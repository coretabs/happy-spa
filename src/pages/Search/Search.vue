<template>
<div>

<div class="grayContentPage relative height-0 spaceFooterS search-page">
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
</header>
<div class="main-content fullWidth">
    <ul class="search-process"  v-if="search || searchStatus">
        <li class="last-search">
            <a href="#" class="left delete-research-results" @click="deleteResults()">مسح الكل</a>
            <p class="right last-research-results">آخر عمليات البحث</p>
        </li>
        <hr>
        <li class="research-results relative" v-for="result in filteredSearchs">
            <div class="respondent absolute">
                <div class="respondent-img">
                    <a href="#">
                        <img src="@/../image/cat.jpg">
                    </a>
                </div>
                <div class="respondent-name">
                    <a href="#" class="personName">{{result.name}}</a>
                    <p dir="auto">@grinn</p>
                </div>                
            </div>
            <div class="left absolute delete-this-result" @click="deleteResult(result)">
                <a href="#">
                    <i class="closeX fontSize18"></i>
                </a>
            </div>
        </li>
        <!--
        <li class="research-results relative">
            <div class="respondent absolute">
                <div class="respondent-element">
                    <a href="#">
                        <i class="search fontSize22"></i>
                    </a>
                </div>
                <div class="respondent-name">
                    <a href="#" class="personName">كلمة</a>
                </div>                
            </div>
            <div class="left absolute delete-this-result">
                <a href="#">
                    <i class="closeX fontSize18"></i>
                </a>
            </div>
        </li>
        <li class="research-results relative">
            <div class="respondent absolute">
                <div class="respondent-element">
                    <a href="#">
                        <i class="search fontSize22"></i>
                    </a>
                </div>
                <div class="respondent-name">
                    <a href="#" class="personName">صورة</a>
                </div>                
            </div>
            <div class="left absolute delete-this-result">
                <a href="#">
                    <i class="closeX fontSize18"></i>
                </a>
            </div>
        </li>
        -->
        <li class="research-results relative" v-if="search">
            <div class="more-results">
                <a href="#">المزيد من النتائج حول "{{search}}"</a>
            </div>
        </li>
    </ul>
</div>

<div class="centralCircle absolute" v-if="!searchStatus && !search">
	<div class="circle circle-search">
        <img src="@/../image/search.svg" alt="search">
	</div>
    
    <div class="search-idea">
        <p>اكتشف اشياءً جديدة من خلال البحث</p>
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