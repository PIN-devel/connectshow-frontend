<template>
  <div>
    <h1 class="title">회원가입</h1>
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
      <div class="form-group">
        <label for="email">email</label>
        <input type="email" class="form-control" id="email" v-model="signupData.email">
      </div>
        <b-form-group label="">
        <b-form-checkbox-group id="checkbox-group-2" v-model="categoryData" name="flavour-2">
            <b-form-checkbox :value="1" @click="inputcategory">1</b-form-checkbox>
            <b-form-checkbox :value="2" @click="inputcategory">2</b-form-checkbox>
            <b-form-checkbox :value="3" @click="inputcategory">3</b-form-checkbox>
            <b-form-checkbox :value="4" @click="inputcategory">4</b-form-checkbox>
            <b-form-checkbox :value="5" @click="inputcategory">5</b-form-checkbox>
            <b-form-checkbox :value="6" @click="inputcategory">6</b-form-checkbox>
            <b-form-checkbox :value="7" @click="inputcategory">7</b-form-checkbox>
            <b-form-checkbox :value="8" @click="inputcategory">8</b-form-checkbox>
        </b-form-checkbox-group>
        </b-form-group>  
      <button type="submit" class="btn btn-primary" @click="signup">회원가입</button>
    </form>
  </div>
</template>

<script>
export default {
    name:'SignupView',
    data:function(){
      return{
        signupData:{
          signup:{
            username:'',
            email:'',
            profile_image:'',
            password1:'',
            password2:'',
          },
          categoryData:[]
        },
      }
    },
    methods:{
      signup(event){
        event.preventDefault()
        this.$emit('submit-signup-data',this.signupData)
      },
      inputCategory(event){
        this.signupData.categoryData.push(event.target.value)
      },
    },
}
</script>

<style>
.center{
  margin:0 38%;
}
</style>