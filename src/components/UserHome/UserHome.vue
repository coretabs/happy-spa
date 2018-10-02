<template>
  <div class="grayContentPage spaceFooter spaceHeaderH">

    <div class="overlay" v-if="loading">
      <div class="spinner">
      </div> 
    </div>	  

    <header class="topHeader box-shadow">
      <router-link to='/more' class="left">
        <i class="material-icons">more_vert</i>
      </router-link>
      <p>logo</p>
    </header>

    <div class="backList box-shadow" v-if="posts"  v-for="post in posts" :key="post.id">
      <div class="backgroundSend">
        <div class="bgTextSend bgTextAndImageSend">
          <div @click="$router.push(`/post?postid=${post.id}`)"  class="textSend">
            <p v-if="post.content != ''"> {{ post.content }}</p>
          </div>
          <div class="bgImage" v-if="post.mediafile">
            <img class="box-shadowL" :src="post.mediafile" v-if="media[post.id] != 'mp4'">
            <div v-if="media[post.id]== 'mp4'">
              <video class="box-shadowL" controls="" autoplay="false"   name="media" >
                <source :src="post.mediafile" >
              </video>
            </div>
          </div>
          <div class="communion center fullWidth">
            <a href="#"><i class="material-icons">thumb_up</i><span>{{ post.likes_count  }}</span></a>
            <a href="#"><i class="material-icons">thumb_down</i><span>{{ post.dislikes_count }}</span></a>
            <a @click="$router.push(`/post?postid=${post.id}`)" ><i class="material-icons">forum</i><span>{{ post.comments_count }}</span></a>
          </div>
        </div>
          
        <div class="myMenu">
          <a href="#" class="left darkBlue">
            <span>{{post.time_since}}</span>
            <i class="material-icons">more_vert</i>
          </a>
        </div>
          
        <div class="personPost">
          <router-link :to="`/profile?id=${post.author}`">
            <img :src='post.author_avatar'>
          </router-link> 
          <router-link :to="`/profile?id=${post.author}`" class="personName">{{post.author}}</router-link>
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
      
      <div class="bodyAnswer" v-if="post.top_comment">
        <div class="answer">
          <div class="personPost">
            <router-link :to="`/profile?id=${post.author}`">
              <img :src="post.top_comment.author_avatar">
            </router-link>
            <router-link :to="`/profile?id=${post.author}`" class="personName">{{post.top_comment.author}}</router-link>
          </div>
          <div class="answerPara">
            <p>{{post.top_comment.content}}</p>
          </div>
        </div> 
      </div>

    </div>
    <footer class="bottomFooter box-shadow">
      <ul>
        <li><router-link class="actieFooterLink" :to='`/home?id=${$route.query.id}`'><i class="material-icons fontSize30">home</i></router-link></li>
        <li><router-link to="#"><i class="material-icons fontSize30">notifications</i></router-link></li>
        <li><router-link to="/newpost"><i class="material-icons plusIcon fontSize30">add</i></router-link></li>
        <li><router-link to="#"><i class="material-icons fontSize28">explore</i></router-link></li>
        <li><router-link  :to="`/profile?id=${$route.query.id}`" ><i class="material-icons fontSize30">person</i></router-link></li>
      </ul>
    </footer>
  </div>
</template>

<script src='./script.js'></script>