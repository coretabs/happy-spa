<template>
  <div>
    <div id="box" class="error" >
      <span class="iconAlert">
          <i class="report"></i>
      </span>
      <h2>{{ErrorMsg}}</h2>
      <a @click="Error = false ; showError()  " class="close">Close</a>
    </div>
    <div id="box" class="confirm">
      <span class="iconAlert">
          <i class="report"></i>
      </span>
      <h2>{{confirmMsg}}</h2>
      <a @click="confirm = false ; showConfirm(true)  " class="close">نعم</a>
      <a @click="confirm = false ; showConfirm(false)  " class="close">لا</a>
    </div>

    <div class="grayContentPage spaceFooter">

      <div v-if="menu" @click="showMenu"  id="overlay"></div>

      <div class="overlay" v-if="loading">
        <div class="spinner">
        </div> 
      </div>	

      <header class="topHeader box-shadow">
        <router-link to='/more' class="left">
          <i class="more_vert"></i>
        </router-link>
        <p>logo</p>
      </header> 
          
      <div class="backList box-shadow" v-if="user">
        <div class="aboutMe center">
          <a :href="user.avatar_url"><img :src="user.avatar_url"></a>
            <h1 id="h">{{user.profile.displayed_name}}</h1>
          <p class="reverse">@{{user.username}}</p>
        </div>
        
        <div class="description" v-if="user.profile.bio">
          <h2 class="center">{{user.profile.bio}}</h2>
        </div>
        
        <div class="aboutMyInfo center">
          <div class="place">
            <i class="location fontSize15"></i>
            <span>{{user.profile.location}}</span>
          </div>
          <div class="birth">
            <i class="date_range fontSize15"></i>
            <span>{{user.profile.birth_date}}</span>
          </div>
        </div>
          
        <hr>
          
        <div class="mySocial center" v-if="user.profile.link.length != 0" >
          <a v-for="link in fillteredLinks"  :href="link.link"><i class="social-fa">{{link.app}}</i></a>
        </div>

        </div>
        
        <vue-data-loading :completed='!pagination.next' :loading="pagination.loading" :listens="['pull-down', 'infinite-scroll']" @infinite-scroll="getPosts(false , false)" @pull-down="getPosts(true ,false)">
          <div class="backList box-shadow" v-if="posts"  v-for="post in posts" :key="post.id">
            <div class="backgroundSend">
              <div class="bgTextSend bgTextAndImageSend">
                <div class="textSend" @click="$router.push(`/post?postid=${post.id}`)">
                <p v-if="post.content != ''"> {{ post.content }}</p>
                </div>
                <div @click="$router.push(`/post?postid=${post.id}`)" class="bgImage" v-if="post.mediafile">
                  <img class="borderMedia fullWidth" :src="post.mediafile" v-if="media[post.id] != 'mp4'">
                  <div v-if="media[post.id]== 'mp4'">
                    <video class="borderMedia" controls="" autoplay="false"   name="media" >
                      <source :src="post.mediafile" >
                    </video>
                  </div>
                </div>
                  
                <div class="communion center fullWidth">
                  <a @click="likePost(post.id)"><i :class="{golden: post.reaction == 'liked'}"  class="thumb_up"></i><span>{{post.likes_count}}</span></a>
                  <a @click="dislikePost(post.id)"><i :class="{golden: post.reaction == 'disliked'}" class="thumb_down"></i><span>{{post.dislikes_count}}</span></a>
                  <a @click="$router.push(`/comments?postid=${post.id}`)"><i class="question_answer"></i><span>{{ post.comments_count }}</span></a>
                </div>
              </div>
              <hr>
              <div class="myMenu">
                <a class="left whiteGray">
                  <span>{{post.time_since}}</span>
                  <i @click="showMenu(post.id)" v-if="post.author == username" class="more_vert"></i>
                </a>
              </div>

              <div v-if="menu && post.id == postid" class=' menuPost box-shadow center absolute '>
                <a @click="editPost"  class="class">تعديل</a>
                  <hr>
                <a @click="confirm = true ; showConfirm()" class="class wrongValue">حذف</a>
              </div>
                
              <div class="personPost">
                <a :href="user.avatar_url">
                  <img :src="user.avatar_url">
                </a>
                <a @click="$router.push('/profile')" class="personName">{{user.username}} </a>
              </div>
              
            </div>
          
          
          
          <div class="bodyWasm" v-if="post.tags">
            
            <div class="wasm">
              <a href="#"><i class="label">
                label</i>meme</a>
              <span></span>
              <a href="#"><i class="label">
                label</i>meme</a>
              <span></span>
              <a href="#"><i class="label">
                label</i>meme</a>
              <span></span>
              <a href="#"><i class="label">
                label</i>meme</a>
              <span></span>
              <a href="#"><i class="label">
                label</i>meme</a>
            </div>
            <div class="showAll">
              <a href="#">عرض الكل</a>
            </div>
            
          </div>
          
          <div class="bodyAnswer" @click="$router.push(`/comments?postid=${post.id}`)"  v-if="post.top_comment">
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
      </vue-data-loading>

      <footer class="bottomFooter box-shadow">
        <ul>
          <li><router-link to='/home'><i class="home fontSize30"></i></router-link></li>
          <li><router-link to="#"><i class="notifications fontSize30"></i></router-link></li>
          <li><router-link to="/newpost"><i class="add plusIcon fontSize30"></i></router-link></li>
          <li><router-link to="#"><i class="explore fontSize28"></i></router-link></li>
          <li><router-link class="actieFooterLink" to="/profile" ><i class="person fontSize30"></i></router-link></li>
        </ul>
      </footer>
    </div>
  </div>
</template>


<script src = './script.js'></script>
