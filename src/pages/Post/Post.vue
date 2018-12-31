<template>
  <div>
    <div class="grayContentPage spaceFooterB spaceHeaderH">
      <div id="overlay" @click="showMenu" v-if="menu"></div>
      <!--<header class="topHeader box-shadow">
        <a @click="$router.go(-1)">
          <i class="arrow_forward"></i>
        </a>
        <img src="@/../image/grinn.svg">
      </header>-->
      <app-header a1="back" a3="image"></app-header>
      <div class="overlay" v-if="loading">
        <div class="spinner"></div>
      </div>
      <vue-data-loading
        :completed="!pagination.next"
        :loading="pagination.loading"
        :listens="['pull-down', 'infinite-scroll']"
        @infinite-scroll="getComments"
        @pull-down="getComments(true , false) ; update(false)"
      >
        <div slot="completed" v-if="!comments.length > 0">كن أول من يعلق</div>
        <div class="backList box-shadowL" v-if="post">
          <div class="backgroundSend">
            <div class="bgTextSend bgTextAndImageSend">
              <div class="textSend">
                <p dir="auto" v-if="post.content != ''">{{ post.content }}</p>
              </div>
              <div class="bgImage" v-if="post.mediafile">
                <img
                  class="borderMedia fullWidth"
                  :src="post.mediafile"
                  v-if="post.mediafile.split('.')[post.mediafile.split('.').length - 1] != 'mp4'"
                >
                <div
                  v-if="post.mediafile.split('.')[post.mediafile.split('.').length - 1] == 'mp4'"
                >
                  <video class="borderMedia" controls autoplay="false" name="media">
                    <source :src="post.mediafile">
                  </video>
                </div>
              </div>
              <ul class="communion center fullWidth">
                <li>
                  <a @click="$router.push(`/comments?postid=${id}`)">
                    <span>{{ post.comments_count }}</span>
                    <i class="question_answer"></i>
                  </a>
                </li>
                <li class="hand-Up">
                  <a :class="{bGolden: post.reaction == 'liked'}" @click="likePost()">
                    <span :class="{golden: post.reaction == 'liked'}">{{post.likes_count == 0 ? '' : post.likes_count }}</span>
                    <img class="middle" src="@/../image/smile.svg">
                  </a>
                </li>
                <li class="hand-Down">
                  <a :class="{bGolden: post.reaction == 'disliked'}" @click="dislikePost()">
                    <span :class="{golden: post.reaction == 'disliked'}">{{post.dislikes_count == 0 ? '' : post.dislikes_count }}</span>
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
            <div class="myMenu">
              <a @click="showMenu" class="left whiteGray">
                <span>{{post.time_since}}</span>
                <i class="more_vert"></i>
              </a>
            </div>
            <div v-if="menu" class="menuPost box-shadow center absolute">
              <a @click="editPost" v-if="post.author == username" class="class">تعديل</a>
              <hr v-if="post.author == username">
              <a
                @click="showConfirm()"
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
          <hr>
          <div
            class="bodyAnswer"
            v-if="comments.length != 0"
            v-for="comment in comments"
            :key="comment.id"
          >
            <div
              @click="$router.push({ path : 'replies' , query : {postid : id , commentid : comment.id} })"
              class="answer"
            >
              <div class="postPM">
                <div class="personPost">
                  <router-link :to="`/profile?id=${comment.author}`">
                    <img :src="comment.author_avatar">
                  </router-link>
                  <router-link
                    :to="`/profile?id=${comment.author}`"
                    class="personName"
                  >{{comment.author}}</router-link>
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
                <p dir="auto">{{comment.content}}</p>
              </div>
            </div>
            <div class="communion">
              <a @click="likeComment(comment.id)">
                <span>{{comment.likes_count}}</span>
                <i :class="{golden: comment.reaction == 'liked'}" class="outline-thumb_up"></i>
              </a>
              <a @click="dislikeComment(comment.id)">
                <span>{{comment.dislikes_count}}</span>
                <i :class="{golden: comment.reaction == 'disliked'}" class="outline-thumb_down"></i>
              </a>
              <a
                @click="$router.push({ path : 'replies' , query : {postid : id , commentid : comment.id} })"
              >
                <span>{{comment.replies_count}}</span>
                <i class="question_answer"></i>
              </a>
              <a href="#" class="left headElements center CMTtime whiteGray">
                <span>{{comment.time_since}}</span>
              </a>
            </div>
            <div class="bodyAnswer reply" v-if="comment.top_reply">
              <div class="answer">
                <div class="personPost">
                  <router-link :to="`/profile?id=${comment.top_reply.author}`">
                    <img :src="comment.top_reply.author_avatar">
                  </router-link>
                  <router-link
                    :to="`/profile?id=${comment.top_reply.author}`"
                    class="personName"
                  >{{comment.top_reply.author}}</router-link>
                </div>
                <div class="personMenu">
                  <div class="myMenu">
                    <a class="left whiteGray">
                      <i class="more_vert"></i>
                    </a>
                  </div>
                </div>
                <div class="answerPara">
                  <p dir="auto">{{comment.top_reply.content}}</p>
                </div>
              </div>
              <div class="communion">
                <a @click="likeReply(comment.id)">
                  <span>{{comment.top_reply.likes_count}}</span>
                  <i
                    :class="{golden: comment.top_reply.reaction == 'liked'}"
                    class="outline-thumb_up"
                  ></i>
                </a>
                <a @click="dislikeReply(comment.id)">
                  <span>{{comment.top_reply.dislikes_count}}</span>
                  <i
                    :class="{golden: comment.top_reply.reaction == 'disliked'}"
                    class="outline-thumb_down"
                  ></i>
                </a>
                <a href="#" class="left headElements center CMTtime">
                  <span>{{comment.top_reply.time_since}}</span>
                </a>
              </div>
              <div
                class="double-line center"
                @click="$router.push({path : 'replies' , query : {postid : id , commentid : comment.id}  })"
              >
                إقرا
                المزيد
              </div>
            </div>
          </div>
        </div>
      </vue-data-loading>
      <!--<footer class="bottomFooter box-shadow footerAndChat">
        <div class="chat" v-if="avatar">
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <form action="" @submit="$event.preventDefault()" method="POST">
                <textarea
                  dir="auto" 
                  class="textarea"
                  :disabled="loading"
                  type="text"
                  v-model="commentTxt"
                  rows="1"
                  placeholder="اكتب تعليق..."
                ></textarea>
                <div class="leftTextarea left">
                  <a @click="addcomment" class="icon is-small">
                    <i class="keyboard_arrow_left fontSize20"></i>
                  </a>
                  <a v-if="false" class="icon is-small">
                    <i class="sentiment_satisfied fontSize20"></i>
                  </a>
                </div>
                <div class="personChat">
                  <a class="icon is-small right">
                    <img :src="avatar">
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
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
            <router-link to="/profile">
              <i class="person fontSize30"></i>
            </router-link>
          </li>
        </ul>
      </footer>-->
      <app-footer chat="isChat" :isAvatar="this.avatar"></app-footer>
    </div>
  </div>
</template>

<style scoped>
.reply {
  width: unset !important;
  margin: unset !important;
}
</style>


<script src='./script.js'></script>
