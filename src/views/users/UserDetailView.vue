<template>
  <div>
    <UserProfile :user="user" :isAuth="isAuth" class="container m-5"/>
    <div class="mx-5">
      <hr>
      <UserActivity :user="user"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserProfile from '@/components/users/UserProfile.vue'
import UserActivity from '@/components/users/UserActivity.vue'

import axios from 'axios'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'UserDetailView',
  components: {
		UserProfile,
		UserActivity,
  },
  data(){
    return {
      user: null,
      isAuth: null,
    }
  },
  methods: {
    getInfo(){
      const user_id = this.$route.params.userId
      axios.get(BACK_URL + `/accounts/${user_id}/`)
        .then((res) => {
          this.user = res.data.data
          if (this.$cookies.get("auth-token")){
            axios.get(BACK_URL + '/accounts/', { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
              .then((res) => {
                if (res.data.data.id === this.user.id){
                  this.isAuth = true
                } else{
                  this.isAuth = false
                }
              })
              .catch((err) => { console.log(err.response.data) })
              }
					})
				.catch((err) => { console.log(err.response.data) })
    },
  },
  created(){
    this.getInfo()
  },
}
</script>
<style>
</style>