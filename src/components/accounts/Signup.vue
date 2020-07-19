<template>
  <div>
    <a class="nav-link" id="show-btn" @click="$bvModal.show('bv-modal-Signup')">회원가입</a>

    <b-modal id="bv-modal-Signup" class="w-50" hide-footer>
      <template v-slot:modal-title>
        <h1>Signup</h1>
      </template>
      <div class="d-block text-center">
        <form class="center  m-0">
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
            <label for="exampleInputPassword2">비밀번호 확인</label>
            <input type="password" class="form-control" id="exampleInputPassword2" v-model="signupData.password2">
          </div>
          <div class="form-group">
            <label for="email">email</label>
            <input type="email" class="form-control" id="email" v-model="signupData.email">
          </div>
          <div class="form-group">
            <b-form-group label="관심 장르 선택">
            <b-form-checkbox-group  id="checkbox-group-2" v-model="signupData.categoryData" name="flavour-2">
                <b-form-checkbox :value="1" @click="inputcategory">음악/콘서트</b-form-checkbox>
                <b-form-checkbox :value="2" @click="inputcategory">뮤지컬,오페라</b-form-checkbox>
                <b-form-checkbox :value="3" @click="inputcategory">연극</b-form-checkbox>
                <b-form-checkbox :value="4" @click="inputcategory">국악</b-form-checkbox>
                <b-form-checkbox :value="5" @click="inputcategory">무용/발레</b-form-checkbox>
                <b-form-checkbox :value="6" @click="inputcategory">아동/가족</b-form-checkbox>
                <b-form-checkbox :value="7" @click="inputcategory">전시</b-form-checkbox>
                <b-form-checkbox :value="8" @click="inputcategory">기타</b-form-checkbox>
            </b-form-checkbox-group>
            </b-form-group>  
          </div>
          <hr>
          <button type="submit" class="btn btn-primary" @click="signup">회원가입</button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
    name:'Signup',
    data:function(){
      return{
        signupData:{
          username:'',
          email:'',
          profile_image:'',
          password1:'',
          password2:'',
          categoryData:[]
        },
      }
    },
    methods:{
      signup(event){
        event.preventDefault()
        this.$emit('submit-signup-data',this.signupData)
        this.$router.push("/")
      },
      inputCategory(event){
        this.signupData.categoryData.push(event.target.value)
      },
    },
}
</script>

<style>

</style>