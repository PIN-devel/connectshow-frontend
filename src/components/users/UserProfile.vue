<template>
  <div class="row my-5">
    <div class="col-lg-2 col-md-3 col-4 box">
      <ProfileImage :profileImage="user.profile_image"/>
    </div>
    <div class="col-10 text-left my-auto">
      <h3>{{ user.username }}</h3>
      <h6>{{ user.email }}</h6>
      <button v-if="isAuth" @click="updateUser" class="btn btn-light"><i class="fas fa-edit"></i> 회원정보 수정</button>
      <button v-if="isAuth" @click="deleteUser" class="btn btn-dark m-2"><i class="far fa-trash-alt"></i> 회원 탈퇴</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import ProfileImage from '@/components/ProfileImage.vue'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'UserProfile',
  components: {
    ProfileImage
  },
  props: {
    user: Object,
  },
  data(){
    return {
      isAuth: null,
    }
  },
  methods: {
    checkAuth(){
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
    },
    updateUser(){
      this.$router.push({ name: 'UserProfileUpdateView', params:{'ID':this.user.id} })
    },
    deleteUser(){
      this.$confirm(
        {
          message: `삭제하시겠습니까?`,
          button: {
            yes: 'Yes',
            no: 'No',
          },
          callback: confirm => {
            if (confirm) {
              axios.delete(BACK_URL + `/accounts/${this.user.id}/`, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
                .then(() => {
                  this.$router.push({ name: 'Home' })
                })
                .catch(err => console.log(err.response.data))
            }
          }
        }
      )
    },
  },
  mounted(){
    this.checkAuth()
  },
}
</script>

<style>
</style>