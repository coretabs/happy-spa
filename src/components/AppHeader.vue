<template>
  <nav>
    <router-link to="/" exact>Home</router-link>|
    <router-link to="/posts" exact>Posts</router-link>
    <router-link to="/profile" exact>Profile</router-link>
    <router-link to="/listposts" exact>ListPosts</router-link>
    <router-link to="/login" exact>Login</router-link>
    <hr>
  </nav>
</template>
<script>

export default {
  name: 'AppHeader'
}
</script>
