<template>
  <div>
    <div id="box" class="confirm">
      <span class="iconAlert">
        <i class="report"></i>
      </span>
      <h2>{{confirmMsg}}</h2>
      <a @click="confirm = false ; showConfirm(true)  " class="close">نعم</a>
      <a @click="confirm = false ; showConfirm(false)  " class="close">لا</a>
    </div>
    <div class="grayContentPage spaceFooter">
      <div v-if="menu" @click="showMenu" id="overlay"></div>
      <div class="overlay" v-if="loading">
        <div class="spinner"></div>
      </div>
      <header class="topHeader box-shadow">
        <router-link to="/more" class="left">
          <i class="more_vert"></i>
        </router-link>
        <img src="@/../image/grinn.svg">
      </header>
        
        <div class="backList box-shadow" v-if="user">
          <div class="aboutMe center">
            <a :href="user.avatar_url">
              <img :src="user.avatar_url">
            </a>
            <h1 id="h">{{user.profile.displayed_name}}</h1>
            <p class="reverse">@{{user.username}}</p>
          </div>
          <div class="description" v-if="user.profile.bio">
            <h2 class="center">{{user.profile.bio}}</h2>
          </div>
          <div class="aboutMyInfo center">
            <div class="place">
              <span>{{user.profile.location}}</span>
              <i class="location fontSize15"></i>
            </div>
            <div class="birth">
              <span>{{user.profile.birth_date}}</span>
              <i class="date_range fontSize15"></i>
            </div>
          </div>
          <hr>
          <div class="mySocial center" v-if="user.profile.link.length != 0">
            <a v-for="link in fillteredLinks" :href="link.link">
              <i class="social-fa">{{link.app}}</i>
            </a>
          </div>
        </div>
        <vue-data-loading
        :completed="!pagination.next"
        :loading="pagination.loading"
        :listens="['pull-down', 'infinite-scroll']"
        @infinite-scroll="getPosts"
        @pull-down="getPosts(true , false)"
      >
        <div>
          <div
            class="backList box-shadow"
            :id="post.id"
            v-if="posts"
            v-for="post,index in posts"
            :key="index"
          >
            <div class="backgroundSend">
              <div class="bgTextSend bgTextAndImageSend">
                <div @click="$router.push(`/post?postid=${post.id}`)" class="textSend">
                  <p dir="auto" v-if="post.content != ''">{{ post.content }}</p>
                </div>
                <div
                  class="bgImage"
                  @click="$router.push(`/post?postid=${post.id}`)"
                  v-if="post.mediafile"
                >
                  <img
                    class="borderMedia fullWidth"
                    :src="post.mediafile"
                    v-if="media[post.id] != 'mp4'"
                  >
                  <div v-if="media[post.id]== 'mp4'">
                    <video class="borderMedia" controls autoplay="false" name="media">
                      <source :src="post.mediafile">
                    </video>
                  </div>
                </div>
                    
                  <ul class="communion center fullWidth">
                    <li>
                      <a @click="$router.push(`/comments?postid=${post.id}`)">
                        <span>{{ post.comments_count }}</span>
                        <i class="question_answer"></i>
                      </a>
                    </li>
                      
                      <li class="hand-Up">
                      <a :class="{bGolden: post.reaction == 'liked'}" @click="likePost(post.id)">
                        <span
                          :class="{golden: post.reaction == 'liked'}"
                        >{{post.likes_count == 0 ? '' : post.likes_count }}</span>
                        <img class="middle" src="@/../image/smile.svg">
                      </a>
                    </li>
                    <li class="hand-Down">
                      <a
                        :class="{bGolden: post.reaction == 'disliked'}"
                        @click="dislikePost(post.id)"
                      >
                        <span
                          :class="{golden: post.reaction == 'disliked'}"
                        >{{post.dislikes_count == 0 ? '' : post.dislikes_count }}</span>
                        <img class="middle" src="@/../image/sad.svg">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>0</span>
                        <i class="icon-reply"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              <hr>
              <div class="myMenu">
                <a class="left whiteGray">
                  <span>{{post.time_since}}</span>
                  <i @click="showMenu(post.id)" class="more_vert"></i>
                </a>
              </div>
              <div v-if="menu && post.id == postid" class="menuPost box-shadow center absolute">
                <a @click="editPost" v-if="post.author == username" class="class">تعديل</a>
                <hr v-if="post.author == username">
                <a
                  @click="confirm = true ; showConfirm()"
                  v-if="post.author == username"
                  class="class wrongValue"
                >حذف</a>
                <hr v-if="post.author == username">
                <a class="class" @click="$emit('openReport' , post.id)">تبليغ</a>
              </div>
              <div class="personPost">
                <router-link :to="`/profile?id=${post.author}`">
                  <img :src="post.author_avatar">
                </router-link>
                <router-link :to="`/profile?id=${post.author}`" class="personName">{{post.author}}</router-link>
              </div>
            </div>
            <div class="bodyWasm" v-if="post.tags">
              <div class="wasm">
                <a href="#">
                  <i class="label"></i>meme
                </a>
                <span></span>
                <a href="#">
                  <i class="label"></i>meme
                </a>
                <span></span>
                <a href="#">
                  <i class="label"></i>meme
                </a>
                <span></span>
                <a href="#">
                  <i class="label"></i>meme
                </a>
                <span></span>
                <a href="#">
                  <i class="label"></i>meme
                </a>
              </div>
              <div class="showAll">
                <a href="#">عرض الكل</a>
              </div>
            </div>
            <div
              class="bodyAnswer"
              @click="$router.push(`/comments?postid=${post.id}`)"
              v-if="post.top_comment"
            >
              <div class="answer">
                <div class="postPM">
                  <div class="personPost">
                    <router-link :to="`/profile?id=${post.author}`">
                      <img :src="post.top_comment.author_avatar">
                    </router-link>
                    <router-link
                      :to="`/profile?id=${post.author}`"
                      class="personName"
                    >{{post.top_comment.author}}</router-link>
                  </div>
                  <div class="personMenu">
                    <div class="myMenu">
                      <a class="left whiteGray">
                        <i class="more_vert"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="answerPara">
                  <p dir="auto">{{post.top_comment.content}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vue-data-loading>
      <footer class="bottomFooter box-shadow">
        <ul>
          <li>
            <router-link to="/home">
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
            <router-link class="actieFooterLink" to="/profile">
              <i class="person fontSize30"></i>
            </router-link>
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>


<script src = './script.js'></script>
