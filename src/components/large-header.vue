<template>
    <v-toolbar
        class="mianHeader"
    >

    <template v-slot:extension class="fullWidth absolute">
      <v-toolbar-title class="fullWidth"><slot></slot></v-toolbar-title>
    </template>

    <v-spacer></v-spacer>

    <v-btn icon class="btn-icon" @click="$router.go(-1)">
        <i class="arrow_forward text-bold fontSize30"></i>
    </v-btn>

    <img src="@/../image/mainWhite.png">
  </v-toolbar>
</template>

<style lang="scss">
    @import '../assets/style/vars';
    .mianHeader {
        background: none;
        box-shadow: none;
        margin-bottom: 50px;
        .v-toolbar__content {
            padding: 0;
            button {
                color: $dark-blue-color;
                position: absolute;
                top: 0;
                margin: 10px;
            }
            img {
                width: 100%;
                height: 180px;
                display: block;
                margin-top: 120px;
            }
        }
        .v-toolbar__extension {
            padding: 0 0 10px;
            .v-toolbar__title {
                margin: 0;
                text-align: center;
                color: $dark-blue-color;
            }
        }
    }
</style>
