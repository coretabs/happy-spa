<template>
  <div>
    <div class="overlay" v-show="display">
      <div class="spinner">
      </div> 
    </div>	

    <div class="grayContentPage spaceFooter" v-if="user">
    <header class="topHeader box-shadow">
        <a href="#" class="left">
            <i class="material-icons">more_vert</i>
        </a>
        <p>logo</p>
      </header> 
          
      <div class="backList box-shadow">
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
            <i class="material-icons fontSize15">place</i>
            <span>{{user.profile.location}}</span>
          </div>
          <div class="birth">
            <i class="material-icons fontSize15">date_range</i>
            <span>{{user.profile.birth_date}}</span>
          </div>
        </div>
        
        <hr>
        
        <div class="mySocial center" v-if="user.profile.link.length != 0">
          <a v-if='TW' :href="TW"><i class="fab fa-twitter"></i></a>
          <a v-if='FB' :href="FB"><i class="fab fa-facebook-f"></i></a>
          <a v-if='GB' :href="GB"><i class="fab fa-google-plus-g"></i></a>
          <a v-if='WS' :href="WS"><i class="fas fa-globe-americas"></i></a>
        </div>

      </div>

      <div class="backList box-shadow" v-for="post in user.posts" :key="post.id">
        <div class="backgroundSend">
          <div class="bgTextSend bgTextAndImageSend">
            <div class="textSend">
            <p v-if="post.content != ''"> {{ post.content }}</p>
            </div>
            <div class="bgImage" v-if="post.mediafile">
              <img :src="post.mediafile">
            </div>
            <div class="communion center fullWidth">
              <a href="#"><i class="material-icons">thumb_up</i><span>{{ post.likes_count  }}</span></a>
              <a href="#"><i class="material-icons">thumb_down</i><span>{{ post.dislikes_count }}</span></a>
              <a href="#"><i class="material-icons">forum</i><span>{{ post.comments_count }}</span></a>
            </div>
          </div>
            
          <div class="myMenu">
            <a href="#" class="left darkBlue">
              <span>{{post.time_since}}</span>
              <i class="material-icons">more_vert</i>
            </a>
          </div>
            
          <div class="personPost">
            <a :href="user.avatar_url">
              <img :src="user.avatar_url">
            </a>
            <a href='#h' class="personName">{{user.username}} </a>
              </div>
          
        </div>
        
        
        
        <div class="bodyWasm" v-if="post.tags">
          
          <div class="wasm">
            <a href="#"><i class="material-icons">
			label</i>meme</a>
            <span></span>
            <a href="#"><i class="material-icons">
			label</i>meme</a>
            <span></span>
            <a href="#"><i class="material-icons">
			label</i>meme</a>
            <span></span>
            <a href="#"><i class="material-icons">
			label</i>meme</a>
            <span></span>
            <a href="#"><i class="material-icons">
			label</i>meme</a>
          </div>
          <div class="showAll">
            <a href="#">عرض الكل</a>
          </div>
          
        </div>
        
        <div class="bodyAnswer" v-if="post.top_comment.content != ''">
          <div class="answer">
            <div class="personPost">
              <a href="#">
                <img src="image/cat.jpg">
              </a>
              <a href="#" class="personName">اسم المستخدم</a>
            </div>
            
            <div class="answerPara">
              <p>meow meow</p>
            </div>
            
          </div>
          
        </div>
        
      </div>

      <footer class="bottomFooter box-shadow">
			<ul>
				<li><a href="#"><i class="material-icons fontSize30">home</i></a></li>
				<li><a href="#"><i class="material-icons fontSize30">notifications</i></a></li>
				<li><a href="#"><i class="material-icons plusIcon fontSize30">add</i></a></li>
				<li><a href="#"><i class="material-icons fontSize28">explore</i></a></li>
				<li><a href="#" class="actieFooterLink"><i class="material-icons fontSize30">person</i></a></li>
			</ul>
		</footer>  
    </div> 
  </div>
</template>


<script src = './script.js'></script>
