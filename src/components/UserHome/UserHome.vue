<template>
  <div class="grayContentPage spaceFooter spaceHeaderH">

    <div class="overlay" v-if="loading">
      <div class="spinner">
      </div> 
    </div>	  

    <header class="topHeader box-shadow">
      <router-link to='/' class="left">
          <i class="material-icons">more_vert</i>
      </router-link>
      <p>logo</p>
    </header> 

    <div class="backList box-shadow" v-if="posts"  v-for="post in posts" :key="post.id">
      <div class="backgroundSend">
        <div class="bgTextSend bgTextAndImageSend">
          <div class="textSend">
            <p v-if="post.content != ''"> {{ post.content }}</p>
          </div>
          <div class="bgImage" v-if="post.mediafile">
            <img :src="post.mediafile">
          </div>
          <div class="communion center fullWidth">
            <a href="#"><i class="material-icons">thumb_up</i><span>{{ post.likes_count  }}</span></a>
            <a href="#"><i class="material-icons">thumb_down</i><span>{{ post.dislikes_count }}</span></a>
            <a href="#"><i class="material-icons">forum</i><span>{{ post.comments_count }}</span></a>
          </div>
        </div>
          
        <div class="myMenu">
          <a href="#" class="left darkBlue">
            <span>{{post.time_since}}</span>
            <i class="material-icons">more_vert</i>
          </a>
        </div>
          
        <div class="personPost">
          <a :href="post.author">
            <img src='@/../image/cat.jpg'>
          </a> 
          <router-link :to="`/profile/${post.author}`" class="personName">{{post.author}}</router-link>
        </div>
        
      </div>
      
      
      
      <div class="bodyWasm" v-if="post.tags">
        
        <div class="wasm">
          <a href="#"><i class="material-icons">label</i>meme</a>
          <span></span>
          <a href="#"><i class="material-icons">label</i>meme</a>
          <span></span>
          <a href="#"><i class="material-icons">label</i>meme</a>
          <span></span>
          <a href="#"><i class="material-icons">label</i>meme</a>
          <span></span>
          <a href="#"><i class="material-icons">label</i>meme</a>
        </div>
        <div class="showAll">
          <a href="#">عرض الكل</a>
        </div>
      </div>
      
      <div class="bodyAnswer" v-if="post.top_comment.content != ''">
        <div class="answer">
          <div class="personPost">
            <a href="#">
              <img src="@/../image/cat.jpg">
            </a>
            <a href="#" class="personName"></a>
          </div>
          
          <div class="answerPara">
            <p>meow meow</p>
          </div>
        
        </div>
      </div>
    </div>
      <footer class="bottomFooter box-shadow">
        <ul>
          <li><router-link class="actieFooterLink" :to='`/home?id=${$route.query.id}`'><i class="material-icons fontSize30">home</i></router-link></li>
          <li><router-link to="#"><i class="material-icons fontSize30">notifications</i></router-link></li>
          <li><router-link to="#"><i class="material-icons plusIcon fontSize30">add</i></router-link></li>
          <li><router-link to="#"><i class="material-icons fontSize28">explore</i></router-link></li>
          <li><router-link  :to="`/profile?=${$route.query.id}`" ><i class="material-icons fontSize30">person</i></router-link></li>
        </ul>
      </footer>
  </div>
</template>

<script src='./script.js'></script>