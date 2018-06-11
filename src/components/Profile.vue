<template>
  <main>
    <div v-for="profile in profiles" :key="profile.id">
      <div v-for="(value, key) in profile">
        {{ key }}: {{ value }}
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      profiles: [
        {id: 1, first_name: '.....', last_name: '*****', email: '...@.com', age: 20, gender: 'ff'}
      ]
    }
  }
}
</script>
