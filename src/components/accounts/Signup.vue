<template>
  <div>
    <a class="nav-link" id="show-btn" @click="$bvModal.show('bv-modal-Signup')">Sign up</a>

    <b-modal id="bv-modal-Signup" class="w-50" hide-footer>
      <template v-slot:modal-title>
        <h1>Sign up</h1>
      </template>
        <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
      <div class="d-block text-center">
        <form class="center  m-0">
          <div class="input-group mt-4 mb-4">
              <div class="input-group-append">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
              </div>
              <input type="text" name="" class="form-control input_user" value="" placeholder="username" v-model="signupData.username">
          </div>
          <div class="input-group">
              <div class="input-group-append">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input type="password" name="" class="form-control input_pass" id="exampleInputPassword1" value="" placeholder="password" v-model="signupData.password1">
          </div>
          <small id="exampleInputPassword1" class="form-text text-muted mb-1">문자, 숫자, 기호를 모두 포함하여 8자 이상 입력해주세요.</small>
          <div class="input-group mb-4">
              <div class="input-group-append">
                  <span class="input-group-text"><i class="fas fa-check-square"></i></span>
              </div>
              <input type="password" name="" class="form-control input_pass" id="exampleInputPassword2" value="" placeholder="password confirm" v-model="signupData.password2">
          </div>
          <div class="input-group mb-4">
              <div class="input-group-append">
                  <span class="input-group-text"><i class="fas fa-check-square"></i></span>
              </div>
              <input  type="email" name="" class="form-control input_pass" d="email" value="" placeholder="email" v-model="signupData.email">
          </div>
          <div class="form-group">
            <b-form-group label="관심 장르 선택">
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="signupData.categoryData">
                <b-form-checkbox class="category-button" :value="1" @click="inputCategory">음악/콘서트</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="signupData.categoryData">
                <b-form-checkbox class="category-button" :value="2" @click="inputCategory">뮤지컬/오페라</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="signupData.categoryData">
                <b-form-checkbox class="category-button" :value="3" @click="inputCategory">연극</b-form-checkbox>
            </b-form-checkbox-group>
            </b-form-group>
            <b-form-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="signupData.categoryData">
                <b-form-checkbox class="category-button" :value="4" @click="inputCategory">국악</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="signupData.categoryData">
                <b-form-checkbox class="category-button" :value="5" @click="inputCategory">무용/발레</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="signupData.categoryData">
                <b-form-checkbox class="category-button" :value="6" @click="inputCategory">아동/가족</b-form-checkbox>
            </b-form-checkbox-group>
            </b-form-group>
            <b-form-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="signupData.categoryData">
                <b-form-checkbox class="category-button" :value="7" @click="inputCategory">전시</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="signupData.categoryData">
                <b-form-checkbox class="category-button" :value="8" @click="inputCategory">기타</b-form-checkbox>
            </b-form-checkbox-group>
            </b-form-group>
          </div>
          <hr>
          <button type="submit" block class="btn btn-lg btn-primary btn-block btn-signin" @click="signup">Sign up</button>
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
        // this.$router.push("/")
      },
      inputCategory(event){
        this.signupData.categoryData.push(event.target.value)
      },
    },
}
</script>

<style>
.category-button{
  margin-right: 10px;
  width: 110px;
}
</style>