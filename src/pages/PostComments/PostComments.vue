<template>
  <div>
    
    <div class="withAppW spaceHeader spaceFooterB">
      <div class="overlay" v-if="loading">
        <div class="spinner"></div>
      </div>

      <app-header a1="back" a3="image"></app-header>

      <vue-data-loading :completed='!pagination.next' :loading="pagination.loading" :listens="['pull-down', 'infinite-scroll']" @infinite-scroll="update" @pull-down="update(true , false)">
        <div slot="completed" v-if="!comments.length > 0">{{$t("postComments.first_comment")}}</div>
        <div id="bodyComments" v-for="comment in comments"  v-if="comments">	
          <div class="bodyAnswer">
            <div class="answer">
              <div class="postPM" :class="dirRTL">
                <div class="personPost" :style="personWay">
                    <router-link :to="`/profile?id=${comment.author}`">
                        <img :src="comment.author_avatar">
                    </router-link>
                    <router-link :to="`/profile?id=${comment.author}`" class="personName">{{comment.author}}</router-link>
                </div>
                
                <div class="personMenu" v-if="false"  :style="menuWay">
                    <div v-if="comment.author == username" class="myMenu" :class="[dirRTL, is_way_L]">
                        <a @click="commentMenu(comment.id)" class="whiteGray">
                            <i class="more_vert"></i>
                        </a>
                    </div>
                </div>

                <div v-if="menuCmt  && comment.id == commentid"   class="menuPost box-shadow center absolute" :style="menuPostWay">
                  <a @click="editPost"  class="class">{{$t("postComments.edit")}}</a>
                  <hr>
                  <a  @click="showConfirm()" class="wrongValue  class">{{$t("postComments.delete")}}</a>
                  <hr>
                  <a class="class">{{$t("postComments.report")}}</a>
                </div>
              </div>

              <div class="answerPara">
                <p dir="auto" class="relative">{{comment.content}}</p>
              </div>
            </div> 
            <div class="communion">
              <a @click="likeComment(comment.id)"><span>{{comment.likes_count}}</span><i :class="{golden: comment.reaction == 'liked'}"  class="outline-thumb_up"></i></a>
              <a @click="dislikeComment(comment.id)"><span>{{comment.dislikes_count}}</span><i :class="{golden: comment.reaction == 'disliked'}" class="outline-thumb_down"></i></a>
              <a @click=" ; $router.push({path : 'replies' , query : {postid : id , commentid : comment.id}  })"><span>{{comment.replies_count}}</span><i class="question_answer"></i></a>
              <a href="#" class="headElements center CMTtime" :class="is_way_L">
                <span>{{comment.time_since}}</span>
              </a>
            </div>
          </div>

          <div class="bodyAnswer reply" v-if="comment.top_reply">
            <div class="answer">
              
              <div class="personPost" :class="dirRTL" :style="personAnswerWay">
                <router-link :to="`/profile?id=${comment.top_reply.author}`">
                  <img :src="comment.top_reply.author_avatar">
                </router-link>
                <router-link :to="`/profile?id=${comment.top_reply.author}`" class="personName">{{comment.top_reply.author}}</router-link>
              </div>
              
              <div class="answerPara">
                <p dir="auto">{{comment.top_reply.content}}</p>
              </div>
            </div> 
            <div class="communion">
              <a @click="likeReply(comment.id)"><span>{{comment.top_reply.likes_count}}</span><i :class="{golden: comment.top_reply.reaction == 'liked'}"  class="outline-thumb_up"></i></a>
              <a @click="dislikeReply(comment.id)"><span>{{comment.top_reply.dislikes_count}}</span><i :class="{golden: comment.top_reply.reaction == 'disliked'}" class="outline-thumb_down"></i></a>
              <a href="#" class="headElements center CMTtime" :class="is_way_L">
                <span>{{comment.top_reply.time_since}}</span>
              </a>
            </div>
            <div class="double-line center" @click="$router.push({path : 'replies' , query : {postid : id , commentid : comment.id}  })">إقرا المزيد</div>
          </div>
          
        </div>
      </vue-data-loading>

      <div class="chat" v-if="avatar">
        <div class="field">
          <div class="control" :class="[has_icons_R, has_icons_L]">
            <form action @submit="$event.preventDefault()">
              <textarea
                dir="auto"
                class="textarea"
                :class="textAlgin"
                :disabled="loading"
                type="text"
                v-model="commentTxt"
                rows="1"
                :placeholder="$t('postComments.writePost')"
              ></textarea>
              <div class="leftTextarea" :class="is_way_L">
                <a @click="addcomment" class="icon is-small">
                  <i class="keyboard_arrow_left fontSize20" :style="rotateSendIcon"></i>
                </a>
                <a v-if="false" class="icon is-small">
                  <i class="sentiment_satisfied fontSize20"></i>
                </a>
              </div>
              <div class="personChat" :class="is_way_R">
                <a class="icon is-small right">
                  <img :src="avatar">
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <app-footer chat="isChat" :isAvatar="this.avatar"></app-footer>
    </div>
  </div>
</template>

<script src = './script.js'></script>