<template>
  <div class="grayContentPage spaceFooter">
  <!--  <header class="topHeader box-shadow">
      <a href="#" class="left">
          <i class="fas fa-ellipsis-v"></i>
      </a>
      <p>logo</p>
    </header> 
        
    <div class="backList">
      <div class="aboutMe center">
        <a href="#"><img :src="user.avatar_url"></a>
        <a href="#"><h1>{{user.name}}</h1></a>
        <a href="#"><p class="reverse">{{user.username}}</p></a>
      </div>
      
      <div class="description">
        <h2 class="center">{{user.profile.bio}}</h2>
      </div>
      
      <div class="aboutMyInfo center">
        <div class="place">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{user.profile.location}}/span>
        </div>
        <div class="birth">
          <i class="far fa-calendar"></i>
          <span>{{user.profile.birth_date}}</span>
        </div>
      </div>
      
      <hr>
      
      <div class="mySocial center" v-if="user.link.length >= 1">
        <a><i class="fab fa-twitter"></i></a>
        <a><i class="fab fa-facebook-f"></i></a>
        <a><i class="fab fa-google-plus-g"></i></a>
        <a><i class="fas fa-globe-americas"></i></a>
      </div>
      
    </div>

    <div class="backList" v-for="post in user.posts">
      <div class="backgroundSend">
        <img src="image/lake.jpg" class="bgImageSend">
        
        <div class="myMenu">
          <a href="#" class="left">
            <span>الوقت</span>
            <i class="fas fa-ellipsis-v"></i>
          </a>
        </div>
          
        <div class="personPost">
          <a href="#">
            <img src="image/cat.jpg">
          </a>
          <a href="#" class="personName">اسم المستخدم</a>
            </div>
        
        <div class="communion center">
        <a href="#"><i class="fas fa-thumbs-up"></i><span>120</span></a>
        <a href="#"><i class="fas fa-thumbs-down"></i><span>120</span></a>
        <a href="#"><i class="fas fa-comments"></i><span>120</span></a>
        <a href="#"><i class="fas fa-share"></i><span>620</span></a>
        </div>
        
        <div class="share4All left">
          <a href="#"><i class="fas fa-share-alt"></i></a>
        </div>
        
      </div>

      <div class="bodyWasm">
        
        <div class="wasm">
          <a href="#"><i class="fas fa-tag"></i>meme</a>
          <span></span>
          <a href="#"><i class="fas fa-tag"></i>meme</a>
          <span></span>
          <a href="#"><i class="fas fa-tag"></i>meme</a>
          <span></span>
          <a href="#"><i class="fas fa-tag"></i>meme</a>
          <span></span>
          <a href="#"><i class="fas fa-tag"></i>meme</a>
        </div>
        <div class="showAll">
          <a href="#">عرض الكل</a>
        </div>
        
      </div>

      <div class="bodyAnswer">
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
        
        <div class="listComments">
          <div class="opinionComments">
            <a href="#"><i class="fas fa-thumbs-up"></i><span>120</span></a>
            <a href="#"><i class="fas fa-thumbs-down"></i><span>120</span></a>
            <a href="#"><i class="fas fa-comments"></i><span>120</span></a>
          </div>

          <div class="timeComments">
            <p>الوقت</p>
          </div>
        </div>
        
      </div>

      </div>


    <footer class="bottomFooter box-shadow">
      <ul>
        <li><a href="#"><i class="fas fa-home"></i></a></li>
        <li><a href="#"><i class="fas fa-bell"></i></a></li>
        <li><a href="#" class="plusIcon actieFooterLink"><i class="fas fa-plus"></i></a></li>
        <li><a href="#"><i class="fas fa-compass"></i></a></li>
        <li><a href="#"><i class="fas fa-user"></i></a></li>
      </ul>
    </footer> -->    
  </div> 
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  data () {
    return {
      user : '',
      routeParam : this.$route.params.id
    }
  },
  created () {
    axios.get(`https://corefun-api.herokuapp.com/api/v1/auth/user/${this.$route.params.id}/`)
    .then( re => console.log(re))
  }
}
</script>
