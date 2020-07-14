<template>
<div>
    <h1 class="title">회원정보수정</h1>
    <hr>
  <span v-for="category in categories" :key="category">
      {{category}}
  </span>
  <CategoryUpdate @emitchangcategory="changcategory"/>
  <hr>
    <form class="center">
      <div>
        <h4>아이디 : {{username}}</h4>
      </div>
      <br>
      <hr>
      <div class="form-group">
          <label for="exampleFormControlFile1">프로필 이미지 수정</label>
          <input type="file" id="file" ref="file" @change="imgUpload()"/>
      </div>
      <div class="form-group">
        <label for="email">email 수정</label>
        <input type="email" class="form-control" id="email" v-model="email">
      </div>
      <button type="submit" class="btn btn-primary" @click="img_email_update">회원정보 수정</button>
    </form>
<PasswordUpdate/>
</div>
</template>

<script>
import CategoryUpdate from '@/components/performances/CategoryUpdate.vue'
import PasswordUpdate from '@/components/accounts/PasswordUpdate.vue'

import axios from 'axios'
const BACK_URL = 'http://127.0.0.1:8000'

export default {
  name:'UserProfileUpdate',
  components:{
    CategoryUpdate,
    PasswordUpdate,
  },
  data(){
    return {
        config:'',
        user_id:'',
        categories:'',
        email:'',
        username:'',
        profile_image:'',
      }
  },
  methods: {
    getconfig(){
        const axiosConfig = {
        headers:{
            Authorization: `Token ${this.$cookies.get('auth-token')}`,
        }
      }
      this.config = axiosConfig
    },
    checklogin(){
      if (!(this.$session.get('jwt'))){
        this.$alert(" 로그인을 해주세요")
      }
    },
    getuser(){
      axios.get(`${BACK_URL}/accounts/`+this.$route.params.ID+'/',this.config)
        .then((reaponse)=>{
          this.user_id = reaponse.data.data.id
          if (Number(this.user_id) !== Number(this.$route.params.ID)){
            this.$alert("잘못 된 접근입니다.")
          }
          this.getcategory()
          this.email = reaponse.data.data.email
          this.profile_image = reaponse.data.data.profile_image
          this.username = reaponse.data.data.username
        })
        .catch((err)=>{
          console.error(err)
        })
      },
    img_email_update(event) {
      event.preventDefault()
      let formData = new FormData();
      formData.append('profile_image', this.profile_image)
      formData.append('email', this.email)
      axios.put(`${BACK_URL}/accounts/`+ this.$route.params.ID +'/', formData, this.config)
          .then(() => {
            this.$alert("유저정보가 수정되었습니다.")
            // this.$router.push({name:'Home'})
          })
          .catch((error) => {
          console.log(error)
          this.$alert("수정 할 이미지가 없습니다.")
          })
    },
    imgUpload(){
    this.profile_image = this.$refs.file.files[0];
    },
    changcategory(data){
        this.categories=data.data.category
    },
    getcategory(){
      axios.get(`${BACK_URL}/performances/categoty/`,this.config)
      .then((response)=>{
        this.categories=response.data.category
      })
      .catch((err)=>{
          console.log(err)
      })
    }
  },
  created(){
    this.getconfig()
    this.checklogin()
    this.getuser()
  },
}
</script>

<style>

</style>