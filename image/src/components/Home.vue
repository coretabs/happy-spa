<template>
  <div class="homePage">

    <div class="centralCircle">
      <div class="circle">
      </div>
      <h1>Coretabs Fun</h1>
      <figure class="applicationIdea">
          <div class="slider">
            <div class="slide">
              <div class="opinion">
                <p>تمتع بإجراء محادثات مع اصدقائك على الكمبيوتر والهاتف</p>
              </div>
            </div>
          </div>
          <div class="slider">
            <div class="slide">
              <div class="opinion">
                <p>متاح على العديد من الانظمة الاساسية</p>
              </div>
            </div>
          </div>
          <div class="slider">
            <div class="slide">
              <div class="opinion">
                <p>شارك اللحظات الجميلة</p>
              </div>
            </div>
          </div>
          <div class="slider">
            <div class="slide">
              <div class="opinion">
                <p>
                  اجعل عائلتك واصدقائك اقرب مع           
                  <br>
                  Coretabs Fun
                </p>
              </div>
            </div>
          </div>
          <div class="slider">
            <div class="slide">
              <div class="opinion">
                <p>شارك مشاعرك مع العديد من الملصقات الرائعة</p>
              </div>
            </div>
          </div>
      </figure>
    </div>

    <footer class="contentPageFooter orderFooterTop">
      <div class="buttonStarted">
        <router-link to="/signup"> 
          فلنبدأ
        </router-link>
      </div>
    
      <div class="paraFooter">
        <p>
          هل لديك حساب بالفعل؟
          <router-link to='/login'>
            <a>تسجيل الدخول</a>
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