<template>
  <div class="withAppW spaceHeader spaceFooterB">
    <div class="overlay" v-if="loading">
      <div class="spinner"></div>
    </div>

    <app-header a1="back" a3="image"></app-header>
    <vue-data-loading
      :completed="!pagination.next"
      :loading="pagination.loading"
      :listens="['pull-down', 'infinite-scroll']"
      @infinite-scroll="update"
      @pull-down="update(true , false)"
    >
    <div slot="completed" v-if="replies.length > 0">{{$t("replies.first_respond")}}</div>
      <div id="bodyComments" v-if="comment">
        <div class="bodyAnswer">
          <div class="answer">
            <div class="postPM" :class="dirRTL">
              <div class="personPost" :style="personWay">
                <router-link :to="`/profile?id=${comment.author}`">
                  <img :src="comment.author_avatar">
                </router-link>
                <router-link
                  :to="`/profile?id=${comment.author}`"
                  class="personName"
                >{{ comment.author }}</router-link>
              </div>
              <div class="personMenu" v-if="false"  :style="menuWay">
                <div v-if="comment.author == username" class="myMenu">
                  <a @click="commentMenu(comment.id)" class="left whiteGray">
                    <i class="more_vert"></i>
                  </a>
                </div>
              </div>
              <div
                v-if="menuCmt  && comment.id == commentid"
                class="menuPost box-shadow center absolute" :style="menuPostWay"
              >
                <a @click="editPost" class="class">{{$t("replies.edit")}}</a>
                <hr>
                <a @click="showConfirm()" class="wrongValue class">{{$t("replies.delete")}}</a>
                <hr>
                <a class="class">{{$t("replies.report")}}</a>
              </div>
            </div>
            <div class="answerPara">
              <p dir="auto">{{ comment.content }}</p>
            </div>
          </div>
          <div class="communion" :class="dirRTL">
            <a @click="likeComment()">
              <span>{{ comment.likes_count }}</span>
              <i :class="{golden: comment.reaction == 'liked'}" class="thumb_up"></i>
            </a>
            <a @click="dislikeComment()">
              <span>{{ comment.dislikes_count }}</span>
              <i :class="{golden: comment.reaction == 'disliked'}" class="thumb_down"></i>
            </a>
            <a>
              <span>{{ comment.replies_count }}</span>
              <i class="question_answer"></i>
            </a>
            <a href="#" class="headElements center CMTtime" :class="is_way_L">
              <span>{{ comment.time_since }}</span>
            </a>
          </div>
        </div>
        <div
          class="bodyAnswer reply"
          v-if="replies.length > 0"
          v-for="reply in replies"
          :key="reply.id"
        >
          <div class="answer">
            <div class="personPost" :class="dirRTL" :style="personAnswerWay">
              <router-link :to="`/profile?id=${reply.author}`">
                <img :src="reply.author_avatar">
              </router-link>
              <router-link :to="`/profile?id=${reply.author}`" class="personName">{{ reply.author }}</router-link>
            </div>
            <div class="personMenu" v-if="false"  :style="menuWay">
              <div v-if="reply.author == username" class="myMenu">
                <a @click="commentReplyMenu(reply.id)" class="left whiteGray">
                  <i class="more_vert"></i>
                </a>
              </div>
            </div>
            <div
              v-if="menuCmtRpl  && reply.id == commentreplyid"
              class="menuPost box-shadow center absolute" :style="menuPostWay"
            >
              <a @click="editPost" class="class">{{$t("replies.edit")}}</a>
              <hr>
              <a @click="showConfirm()" class="wrongValue class">{{$t("replies.delete")}}</a>
              <hr>
              <a class="class">{{$t("replies.report")}}</a>
            </div>
            <div class="answerPara">
              <p dir="auto">{{ reply.content }}</p>
            </div>
          </div>
          <div class="communion" :class="dirRTL">
            <a @click="likeReply(reply.id)">
              <span>{{ reply.likes_count }}</span>
              <i :class="{golden: reply.reaction == 'liked'}" class="thumb_up"></i>
            </a>
            <a @click="dislikeReply(reply.id)">
              <span>{{ reply.dislikes_count }}</span>
              <i :class="{golden: reply.reaction == 'disliked'}" class="thumb_down"></i>
            </a>
            <a href="#" class="headElements center CMTtime" :class="is_way_L">
              <span>{{ reply.time_since }}</span>
            </a>
          </div>
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
              :class="dirRTL"
              :disabled="loading"
              type="text"
              v-model="replyTxt"
              rows="1"
              :placeholder="$t('replies.writePost')"
            ></textarea>
            <div class="leftTextarea" :class="is_way_L">
              <a @click="addReply" class="icon is-small">
                <i class="keyboard_arrow_left fontSize20" :style="rotateSendIcon"></i>
              </a>
              <a v-if="false" class="icon is-small">
                <i class="sentiment_satisfied fontSize20"></i>
              </a>
            </div>
            <div class="personChat">
              <a class="icon is-small" :class="is_way_R">
                <img :src="avatar">
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>

    <app-footer chat="isChat" :isAvatar="this.avatar"></app-footer>
  </div>
</template>
<script src="./script.js"></script>
