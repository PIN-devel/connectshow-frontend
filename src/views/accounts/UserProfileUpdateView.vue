<template>
<div>
  <div class="container" style="height: 20rem;">
    <form>
        <h1 class="d-flex">Edit Profile</h1>
        <hr>
        <div class="row">
            <!-- left column -->
            <div class="col-md-3">
              <div class="text-center">
                <div class="form-group">
                    <!-- <img v-if="!flag" class="profile" :src="show_image" alt="profile_image"> -->
                    <b-avatar v-if="!flag" :src="show_image" size="10rem"></b-avatar>
                    <!-- <img v-if="flag" class="profile" :src="change_image" alt="profile_image"> -->
                    <b-avatar  v-if="flag" :src="change_image" size="10rem"></b-avatar>
                    <br>
                    <hr>
                    <h6 class="d-flex">프로필 수정</h6>
                    <input type="file" id="file" ref="file" @change="imgUpload()"/>
                </div>
              </div>
            </div>

                <!-- edit form column -->
            <div class="col-md-7">
              <h3 class="d-flex">Personal info</h3>
              <hr>
              <br>
              <!-- Change this to a <form> to reproduce your original issue -->
              <div role="form">
                <div class="form-group d-flex flex-row">
                  <label class="col-lg-3 control-label">아이디</label>
                  <div class="col-lg-8 d-flex flex-row">
                    <h5>{{username}}</h5>
                    <PasswordUpdate class="ml-auto"/>
                  </div>
                </div>
                <div class="form-group d-flex flex-row">
                  <label class="col-lg-3 control-label">email</label>
                  <div class="col-lg-8">
                    <input type="email" class="form-control" id="email" v-model="email">
                  </div>
                </div>
                
                <div class="form-group d-flex flex-row m-0 p-0">
                  <label class="col-lg-3 control-label">관심장르</label>
                    <div class="col-lg-8 container">
                    </div>
                </div>

                <div class="form-group d-flex flex-row m-0 p-0">
                  <label class="col-lg-3 control-label"></label>
                    <div class="col-lg-8 container m-0 p-0">
                        <div class="d-flex justify-content-start">
                          <div v-for="category in categories" :key="category" class="m-2">
                              <h4><span class="badge badge-secondary">{{category}}</span></h4>
                          </div>
                        </div>
                          <div class="collapse" id="collapseExample">
                            <div class="card card-body">
                              <CategoryUpdate @emitchangcategory="changcategory"/>   
                            </div>
                          </div>
                    </div>
                </div>
                <div class="form-group d-flex flex-row">
                  <label class="col-lg-3 control-label"></label>
                  <div class="col-lg-8 d-flex flex-row">
                  <button class="btn btn-outline-primary ml-auto" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    관심장르변경
                  </button>                  
                  </div>
                </div>
            </div>
          </div>
      </div>
      <hr>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary mr-2" @click="img_email_update">회원정보 수정</button>
        <button type="button" class="btn btn-danger" @click="deleteUser">회원탈퇴</button>
      </div>
    </form>
  </div>
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
        flag:false,
        show_image:'',
        change_image:'',
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
    getcurrentuser(){
      axios.get(`${BACK_URL}/rest-auth/user/`,this.config)
        .then((reaponse)=>{
          console.log(reaponse)
        if (Number(reaponse.data.pk) !== Number(this.$route.params.ID)){
            this.$alert("잘 못 된 접근입니다.");
            this.$router.push({name:'Home'})
        }  
        })
        .catch((err)=>{
          console.error(err)
        })
    },
    getuser(){
      axios.get(`${BACK_URL}/accounts/`+this.$route.params.ID+'/',this.config)
        .then((reaponse)=>{
          this.getcategory()
          this.email = reaponse.data.data.email
          this.show_image = BACK_URL+reaponse.data.data.profile_image
          console.log(this.show_image)
          this.username = reaponse.data.data.username
        })
        .catch((err)=>{
          console.error(err)
        })
      },
    img_email_update(event) {
      event.preventDefault()
      let formData = new FormData();
      if (this.$refs.file.files[0]!==undefined){
        formData.append('profile_image', this.profile_image)
      }
      formData.append('email', this.email)
      axios.put(`${BACK_URL}/accounts/`+ this.$route.params.ID +'/', formData, this.config)
          .then(() => {
            this.$alert("유저정보가 수정되었습니다.")
            this.$router.push({ name: 'UserDetailView', params: { userId: this.$route.params.ID }})
          })
          .catch((error) => {
          console.log(error)
          this.$alert("다시 입력 해 주세요.")
          })
    },
    imgUpload(){
      this.profile_image = this.$refs.file.files[0];
      this.change_image = URL.createObjectURL(this.profile_image)
      this.flag = true
    },
    changcategory(data){
        this.categories=data.data.category
    },
    getcategory(){
      axios.get(`${BACK_URL}/performances/category/`,this.config)
      .then((response)=>{
        this.categories=response.data.category
      })
      .catch((err)=>{
          console.log(err)
      })
    },
    deleteUser(){
      this.$confirm(
        {
          message: `탈퇴하시겠습니까?`,
          button: {
            yes: 'Yes',
            no: 'No',
          },
          callback: confirm => {
            if (confirm) {
              axios.delete(BACK_URL + `/accounts/${this.user_id}/`, this.config)
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
  created(){
    this.getconfig()
    this.getcurrentuser()
    this.checklogin()
    this.getuser()
  },
}
</script>

<style>

</style>