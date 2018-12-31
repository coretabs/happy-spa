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
    <div slot="completed" v-if="!replies.length > 0">كن أول من يرد  </div>
      <div id="bodyComments" v-if="comment">
        <div class="bodyAnswer">
          <div class="answer">
            <div class="postPM">
              <div class="personPost">
                <router-link :to="`/profile?id=${comment.author}`">
                  <img :src="comment.author_avatar">
                </router-link>
                <router-link
                  :to="`/profile?id=${comment.author}`"
                  class="personName"
                >{{ comment.author }}</router-link>
              </div>
              <div class="personMenu">
                <div v-if="comment.author == username" class="myMenu">
                  <a @click="commentMenu(comment.id)" class="left whiteGray">
                    <i class="more_vert"></i>
                  </a>
                </div>
              </div>
              <div
                v-if="menuCmt  && comment.id == commentid"
                class="menuPost box-shadow center absolute"
              >
                <a @click="editPost" class="class">تعديل</a>
                <hr>
                <a @click="showConfirm()" class="wrongValue class">حذف</a>
                <hr>
                <a class="class">تبليغ</a>
              </div>
            </div>
            <div class="answerPara">
              <p dir="auto">{{ comment.content }}</p>
            </div>
          </div>
          <div class="communion">
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
            <a href="#" class="left headElements center CMTtime">
              <span>{{ comment.time_since }}</span>
            </a>
          </div>
        </div>
        <div
          class="bodyAnswer reply"
          v-if="comment.replies_count != 0"
          v-for="reply in replies"
          :key="reply.id"
        >
          <div class="answer">
            <div class="personPost">
              <router-link :to="`/profile?id=${reply.author}`">
                <img :src="reply.author_avatar">
              </router-link>
              <router-link :to="`/profile?id=${reply.author}`" class="personName">{{ reply.author }}</router-link>
            </div>
            <div class="personMenu">
              <div v-if="reply.author == username" class="myMenu">
                <a @click="commentReplyMenu(reply.id)" class="left whiteGray">
                  <i class="more_vert"></i>
                </a>
              </div>
            </div>
            <div
              v-if="menuCmtRpl  && reply.id == commentreplyid"
              class="menuPost box-shadow center absolute"
            >
              <a @click="editPost" class="class">تعديل</a>
              <hr>
              <a @click="showConfirm()" class="wrongValue class">حذف</a>
              <hr>
              <a class="class">تبليغ</a>
            </div>
            <div class="answerPara">
              <p dir="auto">{{ reply.content }}</p>
            </div>
          </div>
          <div class="communion">
            <a @click="likeReply(reply.id)">
              <span>{{ reply.likes_count }}</span>
              <i :class="{golden: reply.reaction == 'liked'}" class="thumb_up"></i>
            </a>
            <a @click="dislikeReply(reply.id)">
              <span>{{ reply.dislikes_count }}</span>
              <i :class="{golden: reply.reaction == 'disliked'}" class="thumb_down"></i>
            </a>
            <a href="#" class="left headElements center CMTtime">
              <span>{{ reply.time_since }}</span>
            </a>
          </div>
        </div>
      </div>
    </vue-data-loading>
    
    <div class="chat" v-if="avatar">
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <form action @submit="$event.preventDefault()">
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

    <app-footer chat="isChat" :isAvatar="this.avatar"></app-footer>
  </div>
</template>
<script src="./script.js"></script>
