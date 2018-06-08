<template>
<div>
  <div v-for="profile in profile" :key="profile.id">
    first_name: {{profile.first_name}} <br/>
    last_name: {{profile.last_name}} <br/>
    email: {{profile.email}} <br/>
    age: {{profile.age}} <br/>
    sex: {{profile.sex}}<br/>

      </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      profile: [
        {id: 1, first_name: '.....', last_name: '*****', email: '...@.com', age: 20, sex: 'ff'}
      ]
    }
  }
}
</script>
