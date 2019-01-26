<template>
  <div class="homePage relative height-0">

    <div class="centralCircle absolute">
      <div class="circle">
        <img src="@/../image/grinn.svg" alt="grinn">
      </div>
      <figure class="applicationIdea">
          <div class="slider">
            <div class="slide">
              <div class="opinion">
                <p>{{$t("home.applicationIdea_1")}}</p>
              </div>
            </div>
          </div>
          <div class="slider">
            <div class="slide">
              <div class="opinion">
                <p>{{$t("home.applicationIdea_2")}}</p>
              </div>
            </div>
          </div>
          <div class="slider">
            <div class="slide">
              <div class="opinion">
                <p>{{$t("home.applicationIdea_3")}}</p>
              </div>
            </div>
          </div>
          <div class="slider">
            <div class="slide">
              <div class="opinion">
                <p>
                  {{$t("home.applicationIdea_4")}}           
                  <br>
                  grinn
                </p>
              </div>
            </div>
          </div>
          <div class="slider">
            <div class="slide">
              <div class="opinion">
                <p>{{$t("home.applicationIdea_5")}}</p>
              </div>
            </div>
          </div>
      </figure>
    </div>

    <footer class="contentPageFooter orderFooterTop absolute">
      <div class="buttonStarted">
        <router-link to="/signup"> 
          {{$t("home.begin")}}
        </router-link>
      </div>
    
      <div class="paraFooter">
        <p>
          {{$t("home.logIn_para")}}
          <router-link to='/login'>
            <a>{{$t("home.logIn_link")}}</a>
          </router-link>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>