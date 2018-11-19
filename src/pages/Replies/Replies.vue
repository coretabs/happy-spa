<template>
  <div class="withAppW spaceHeader spaceFooterB">
    <div class="overlay" v-if="loading">
      <div class="spinner"></div>
    </div>
    <header class="topHeader box-shadow">
      <a @click="$router.go(-1)">
        <i class="arrow_forward"></i>
      </a>
      <img src="@/../image/grinn.svg">
    </header>
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
                <a @click="confirm = true ; showConfirm()" class="wrongValue class">حذف</a>
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
              <a @click="confirm = true ; showConfirm()" class="wrongValue class">حذف</a>
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
    <footer class="bottomFooter box-shadow footerAndChat">
      <div class="chat" v-if="avatar">
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <form action="" @submit="$event.preventDefault()" method="POST">
              <textarea
                dir="auto" 
                class="textarea"
                :disabled="loading"
                type="text"
                v-model="replyTxt"
                rows="1"
                placeholder="اكتب تعليق..."
              ></textarea>
              <div class="left leftTextarea">
                <a class="icon is-small">
                  <i @click="addReply" class="keyboard_arrow_left fontSize20"></i>
                </a>
                <a v-if="false" class="icon is-small">
                  <i class="sentiment_satisfied fontSize20"></i>
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
        <li><router-link to"/pofile">
          <i class="person fontSize30"></i>
        </li>
      </ul>
    </footer>
  </div>
</template>
<script src="./script.js"></script>
