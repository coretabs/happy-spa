<template>
  <div>
    <div id="box" class="error" >
      <span class="iconAlert">
        <i class="report"></i>
      </span>
      <h2>{{ErrorMsg}}</h2>
      <a @click="Error = false ; showError()  " class="close">Close</a>
    </div>
    <div class="withAppW spaceHeader spaceFooterB">
      <div class="overlay" v-if="loading">
        <div class="spinner"></div>
      </div>
      <header class="topHeader box-shadow">
        <a @click="$router.go(-1)">
          <i class="arrow_forward"></i>
        </a>
        <p>logo</p>
      </header>

      <vue-data-loading :completed='!pagination.next' :loading="pagination.loading" :listens="['pull-down', 'infinite-scroll']" @infinite-scroll="update" @pull-down="update(true , false)">
        <div id="bodyComments" v-for="comment in comments"  v-if="comments">	
          <div class="bodyAnswer">
            <div class="answer">
              <div class="personPost">
                <router-link :to="`/profile?id=${comment.author}`">
                  <img :src="comment.author_avatar">
                </router-link>
                <router-link :to="`/profile?id=${comment.author}`" class="personName">{{comment.author}}</router-link>
              </div>
              <div class="answerPara">
                <p class="relative">{{comment.content}}</p>
              </div>
            </div> 
            <div class="communion">
              <a @click="likeComment(comment.id)"><i :class="{golden: comment.reaction == 'liked'}"  class="thumb_up"></i><span>{{comment.likes_count}}</span></a>
              <a @click="dislikeComment(comment.id)"><i :class="{golden: comment.reaction == 'disliked'}" class="thumb_down"></i><span>{{comment.dislikes_count}}</span></a>
              <a @click=" ; $router.push({path : 'replies' , query : {postid : id , commentid : comment.id}  })"><i class="question_answer"></i><span>{{comment.replies_count}}</span></a>
              <a href="#" class="left headElements center CMTtime">
                <span>{{comment.time_since}}</span>
              </a>
            </div>
          </div>

          <div class="bodyAnswer reply" v-if="comment.top_reply">
            <div class="answer">
              <div class="personPost">
                <router-link :to="`/profile?id=${comment.top_reply.author}`">
                  <img :src="comment.top_reply.author_avatar">
                </router-link>
                <router-link :to="`/profile?id=${comment.top_reply.author}`" class="personName">{{comment.top_reply.author}}</router-link>
              </div>
              <div class="answerPara">
                <p >{{comment.top_reply.content}}</p>
              </div>
            </div> 
            <div class="communion">
              <a @click="likeReply(comment.id)"><i :class="{golden: comment.top_reply.reaction == 'liked'}"  class="thumb_up"></i><span>{{comment.top_reply.likes_count}}</span></a>
              <a @click="dislikeReply(comment.id)"><i :class="{golden: comment.top_reply.reaction == 'disliked'}" class="thumb_down"></i><span>{{comment.top_reply.dislikes_count}}</span></a>
              <a href="#" class="left headElements center CMTtime">
                <span>{{comment.top_reply.time_since}}</span>
              </a>
            </div>
            <div class="underline center" @click="$router.push({path : 'replies' , query : {postid : id , commentid : comment.id}  })">إقرا المزيد</div>
          </div>
          
        </div>
      </vue-data-loading>

      <footer class="bottomFooter box-shadow footerAndChat">
        <div class="chat" v-if="avatar">
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <form action="" @submit="$event.preventDefault()"  method="POST">
                <textarea class="textarea" type="text" :disabled='loading'  v-model="commentTxt"  rows="1" placeholder="اكتب تعليق..."></textarea>
                <div class="left leftTextarea">
                  <a class="icon is-small">
                    <i @click="addcomment"  class="keyboard_arrow_left fontSize20"></i>
                  </a>
                  <a v-if="false" class="icon is-small">
                    <i  class="sentiment_satisfied fontSize20"></i>
                  </a>
                </div>
                <div class="personChat">
                  <a class="icon is-small is-right">
                    <img :src="avatar">
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ul>
          <li><router-link to='/home'><i class="home fontSize30"></i></router-link></li>
          <li><router-link to="#"><i class="notifications fontSize30"></i></router-link></li>
          <li><router-link to="/newpost"><i class="add plusIcon fontSize30"></i></router-link></li>
          <li><router-link to="#"><i class="explore fontSize28"></i></router-link></li>
          <li><router-link to"/pofile" ><i class="person fontSize30"></i></router-link></li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script src = './script.js'></script>