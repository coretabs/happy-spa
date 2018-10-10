<template>
  <div>
    <div id="box" class="error" >
      <span class="iconAlert">
          <i class="material-icons">report</i>
      </span>
      <h2>{{ErrorMsg}}</h2>
      <a @click="Error = false ; showError()  " class="close">Close</a>
    </div>
    <div id="box" class="confirm">
      <span class="iconAlert">
          <i class="material-icons">report</i>
      </span>
      <h2>{{confirmMsg}}</h2>
      <a @click="confirm = false ; showConfirm(true)  " class="close">نعم</a>
      <a @click="confirm = false ; showConfirm(false)  " class="close">لا</a>
    </div>
    <div class="grayContentPage spaceFooter spaceHeaderH">

      <div id="overlay" @click="showMenu"  v-if="menu"></div>

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

      <div class="backList box-shadow" :id="post.id"  v-if="posts"  v-for="post in posts" :key="post.id">
        <div class="backgroundSend">
          <div class="bgTextSend bgTextAndImageSend">
            <div @click="$router.push(`/post?postid=${post.id}`)"  class="textSend">
              <p v-if="post.content != ''"> {{ post.content }}</p>
            </div>
            <div class="bgImage" @click="$router.push(`/post?postid=${post.id}`)"  v-if="post.mediafile">
              <img class="box-shadowL" :src="post.mediafile" v-if="media[post.id] != 'mp4'">
              <div v-if="media[post.id]== 'mp4'">
                <video class="box-shadowL" controls="" autoplay="false"   name="media" >
                  <source :src="post.mediafile" >
                </video>
              </div>
            </div>
            
            <div class="communion center fullWidth">
              <a @click="Corefun.like.post(post.id)"><i class="material-icons">thumb_up</i><span>{{ post.likes_count  }}</span></a>
              <a @click="Corefun.dislike.post(post.id)"><i class="material-icons">thumb_down</i><span>{{ post.dislikes_count }}</span></a>
              <a @click="$router.push(`/comments?postid=${post.id}`)" ><i class="material-icons">forum</i><span>{{ post.comments_count }}</span></a>
            </div>
          </div>
          <hr>
          <div class="myMenu">
            <a @click="showMenu(post.id)" class="left whiteGray">
              <span>{{post.time_since}}</span>
              <i v-if="post.author == username"  class="material-icons">more_vert</i>
            </a>
          </div>

          <div v-if="menu && post.id == postid" class=' menuPost box-shadow center absolute '>
            <a @click="editPost"  class="class">تعديل</a>
              <hr>
            <a @click="confirm = true ; showConfirm()" class="class wrongValue">حذف</a>
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
        
        <div class="bodyAnswer" @click="$router.push(`/comments?postid=${post.id}`)" v-if="post.top_comment">
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
          <li><router-link class="actieFooterLink" to='/home'><i class="material-icons fontSize30">home</i></router-link></li>
          <li><router-link to="#"><i class="material-icons fontSize30">notifications</i></router-link></li>
          <li><router-link to="/newpost"><i class="material-icons plusIcon fontSize30">add</i></router-link></li>
          <li><router-link to="#"><i class="material-icons fontSize28">explore</i></router-link></li>
          <li><router-link to="/profile" ><i class="material-icons fontSize30">person</i></router-link></li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script src='./script.js'></script>