<template>
  <div>
    <h1 class="title">로그인</h1>
    <form class="center">
      <div class="form-group">
        <label for="username">아이디</label>
        <input type="text" class="form-control" id="username" v-model="username">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">비밀번호</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" @keypress.enter="login">
      </div>
      <button type="submit" class="btn btn-primary ml-2 mr-2 mb-2" @click="gosignup">회원가입</button>
      <button type="submit" class="btn btn-primary ml-2 mr-2 mb-2" @click="login">로그인</button>
    </form>
  </div>
</template>

<script>
export default {
    name:'LoginView',
    data:function(){
      return {
        username: '',
        password: '',
      }
    },
    methods:{
      login:function(){
        event.preventDefault()
        const loginData = {
          username:this.username,
          password:this.password,
        }
        this.$emit('submit-login-data',loginData)
      },
      gosignup(){
          this.$router.push('/signup')
      },
    },
}
</script>
<style>
.title{
  margin-bottom: 50px;
}
</style>