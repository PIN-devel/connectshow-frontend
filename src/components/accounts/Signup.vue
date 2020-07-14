<template>
  <div>
    <a href="#" id="show-btn" @click="$bvModal.show('bv-modal-Signup')">회원가입</a>

    <b-modal id="bv-modal-Signup" class="w-50" hide-footer>
      <template v-slot:modal-title>
        <h1>Signup</h1>
      </template>
      <div class="d-block text-center">
        <form class="center">
          <div class="form-group">
            <label for="username">아이디</label>
            <input type="text" class="form-control" id="username" v-model="signupData.username">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">비밀번호</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="signupData.password1">
            <small id="emailHelp" class="form-text text-muted">문자, 숫자, 기호를 모두 포함하여 8자 이상 입력해주세요.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">비밀번호 확인</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="signupData.password2">
          </div>
          <button type="submit" class="btn btn-primary" @click="signup">회원가입</button>
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-Signup'), signup">회원가입</b-button>
        </form>
      </div>
      <hr>
      <!-- <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button> -->
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
const BACK_URL = 'http://127.0.0.1:8000'

export default {
    name:'Signup',
    data:function(){
      return{
        signupData:{
          username:'',
          password1:'',
          password2:'',
        }
      }
    },
    methods:{
      // signup:function(event){
      //   event.preventDefault()
      //   this.$emit('submit-signup-data',this.signupData)
      //   console.log(this.signupData)
      // },
      signup(signupData){
        console.log(signupData)
        axios.post(`${BACK_URL}/rest-auth/signup/`,signupData)
        .then((response)=>{
          console.log(response.data)          
        })
        .catch((err)=>{
          this.$alert("다시 입력 해주세요.");
          console.log(err)
        })
      },
    },
}
</script>

<style>

</style>