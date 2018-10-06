<template>
  <div>
    <div id="box" class="error" >
      <span class="iconAlert">
        <i class="material-icons">report</i>
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
          <i class="material-icons">arrow_forward</i>
        </a>
        <p>logo</p>
      </header>
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
              <p>{{comment.content}}</p>
            </div>
          </div> 
          <div class="communion">
            <a href="#"><i class="material-icons fontSize   12">thumb_up</i><span>{{comment.likes_count}}</span></a>
            <a href="#"><i class="material-icons fontSize12">thumb_down</i><span>{{comment.dislikes_count}}</span></a>
            <a @click="$router.push({path : '/comment' , query : {postid : id , commentid : comment.id}  })"><i class="material-icons fontSize12">forum</i><span>{{comment.replies_count}}</span></a>
            <a href="#" class="left headElements center CMTtime">
              <span>{{comment.time_since}}</span>
            </a>
          </div>
        </div>

        <div class="bodyAnswer reply" v-if="comment.replies_count != 0"  v-for="reply in comment.replies" :key="reply.id">
          <div class="answer">
            <div class="personPost">
              <router-link :to="`/profile?id=${reply.author}`">
                <img :src="reply.author_avatar">
              </router-link>
              <router-link :to="`/profile?id=${reply.author}`" class="personName">{{reply.author}}</router-link>
            </div>
            <div class="answerPara">
              <p>{{reply.content}}</p>
            </div>
          </div> 
          <div class="communion">
            <a href="#"><i class="material-icons fontSize   12">thumb_up</i><span>{{reply.likes_count}}</span></a>
            <a href="#"><i class="material-icons fontSize12">thumb_down</i><span>{{reply.dislikes_count}}</span></a>
            <a href="#" class="left headElements center CMTtime">
              <span>{{reply.time_since}}</span>
            </a>
          </div>
        </div>
      </div>

      <footer class="bottomFooter box-shadow footerAndChat">
        <div class="chat" v-if="avatar">
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <form action="" @submit="$event.preventDefault()"  method="POST">
                <textarea class="textarea" type="text" v-model="commentTxt"  rows="1" placeholder="اكتب تعليق..."></textarea>
                <div class="left leftTextarea">
                  <a class="icon is-small">
                    <i @click="addcomment"  class="material-icons fontSize20">chevron_right</i>
                  </a>
                  <a v-if="false" class="icon is-small">
                    <i  class="material-icons fontSize20">insert_emoticon</i>
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
          <li><router-link to='/home'><i class="material-icons fontSize30">home</i></router-link></li>
          <li><router-link to="#"><i class="material-icons fontSize30">notifications</i></router-link></li>
          <li><router-link to="/newpost"><i class="material-icons plusIcon fontSize30">add</i></router-link></li>
          <li><router-link to="#"><i class="material-icons fontSize28">explore</i></router-link></li>
          <li><router-link to"/pofile" ><i class="material-icons fontSize30">person</i></router-link></li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script src = './script.js'></script>
