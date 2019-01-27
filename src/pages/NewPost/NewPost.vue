<template>
  <div>
    <div class="withApp">
      <app-header
        a1="back"
        a3="image"
        a4="button"
        :newPostSend="this.postSend"
        :buttonOptions="this.disable"
      ></app-header>
      <div class="headContent">
        <div class="headContainer">
          <div class="personPost noMargin">
            <router-link to="/profile">
              <img :src="profile">
            </router-link>
            <router-link to="/profile" class="personName">{{username}}</router-link>
          </div>

          <div class="imagePost" v-if="!previweLink">
            <div class="myImage">
              <input
                type="file"
                id="file"
                ref="file"
                @change="submitFile($event)"
                accept="video/*, image/*"
              >
              <a href="#">
                <i class="insert_photo fontSize24"></i>
              </a>
              <p>{{$t("newPost.imgAndVedio")}}</p>
            </div>
            <div class="myImage" :class="dirRTL">
              <input type="file" @change="uploadFile($event)" accept="image/gif">
              <a href="#" style="padding: 0 2px;">
                <i class="gif" style="font-size: 36px;"></i>
              </a>
              <p>{{$t("newPost.gif")}}</p>
            </div>
            <div class="myImage">
              <input type="file" @change="uploadFile($event)" accept="image/*;capture=camera">
              <a href="#">
                <i class="camera_alt fontSize24"></i>
              </a>
              <p>{{$t("newPost.camera")}}</p>
            </div>
          </div>

          <div class="funPost relative">
            <div class="field">
              <div class="control has-icons-left">
                <div class="wrapper">
                  <textarea
                    :disabled="disable"
                    dir="auto"
                    v-model="postContent"
                    class="textarea is-large"
                    :class="textAlgin"
                    type="text"
                    :placeholder="$t('newPost.addFunPost')"
                  ></textarea>
                  <emoji-picker @emoji="insert" :search="search">
                    <div
                      class="emoji-invoker"
                      slot="emoji-invoker"
                      slot-scope="{ events }"
                      v-on="events"
                      :style="emoji_way"
                    >
                      <i class="sentiment_satisfied fontSize22"></i>
                    </div>
                    <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                      <div class="emoji-picker">
                        <div class="emoji-picker__search">
                          <input type="text" v-model="search" v-focus>
                        </div>
                        <div>
                          <div v-for="(emojiGroup, category) in emojis" :key="category">
                            <h5>{{ category }}</h5>
                            <div class="emojis">
                              <span
                                v-for="(emoji, emojiName) in emojiGroup"
                                :key="emojiName"
                                @click="insert(emoji)"
                                :title="emojiName"
                              >{{ emoji }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </emoji-picker>
                </div>
              </div>
            </div>
            <p class="wrongValue" v-if="enabled">لا يمكنك رفع اكثر من 5 ميجا بايت</p>
            <hr>
            <div v-if="previweLink" class="bgTextAndImageSend">
              <div class="bgImage fullWidth relative">
                <img :src="previweLink" class="borderMedia fullWidth" alt>
                <a @click="removePic" class="deleteImagePost absolute BGCW borderRadius50">
                  <i class="wrongValue fontSize24 icon-delete"></i>
                </a>
              </div>
            </div>
          </div>

          <div v-if="false" class="addWasm">
            <div class="field">
              <p class="control has-icons-right">
                <input class="input" type="text" placeholder="إضافة وسوم">
                <span class="icon is-small is-right">
                  <i class="label fontSize22"></i>
                </span>
              </p>
            </div>
          </div>

          <div v-if="false" class="addPerson">
            <a href="#">
              <img src="image/man.jpg" class="addPersonImage">
            </a>
            <a href="#">
              <img src="image/man2.jpg" class="addPersonImage">
            </a>
            <a href="#" class="addPersonPlus">
              <i class="add plusIcon fontSize30"></i>
            </a>
          </div>
        </div>
      </div>

      <app-footer newpost="isNewpost"></app-footer>
    </div>
  </div>
</template>

<script src='./script.js'></script>

<style scoped>
.wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  padding-top: 2rem;
}

.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 20rem;
  height: 12rem;
}

.emoji-invoker {
  position: absolute;
  top: 0;
  left: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  position: absolute;
  top: 40px;
  left: 7px;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>
