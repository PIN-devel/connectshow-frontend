<template>
  <div>
    <a class="nav-link" id="show-btn" @click="$bvModal.show('bv-modal-Login')">로그인</a>
    
    <b-modal id="bv-modal-Login" class="w-50" hide-footer>
      <template v-slot:modal-title>
        <h1>Login</h1>
      </template>
      <div class="d-block text-center">
        <form class="center m-0">
          <div class="form-group">
            <label for="username">username</label>
            <input type="text" class="form-control" id="username" v-model="username">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1" class="mr-0">password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" @keypress.enter="login">
          </div>
          <b-button type="submit" block class="btn btn-primary" @click="login">login</b-button>
          <hr>
          <div class="bg-light rounded-lg">
              <p class="mt-3 font-weight-bold">Don't have an account?</p>
              <span class="font-weight-bold" @click="$bvModal.hide('bv-modal-Login')">
                <Signup/>
              </span>
          </div>
        </form>
      </div>
      <hr>
    </b-modal>
  </div>
</template>

<script>
import Signup from "@/components/accounts/Signup.vue"

export default {
    name:'Login',
    components:{
      Signup,
    },
    data:function(){
      return {
        username: '',
        password: '',
      }
    },
    methods:{
      login:function(event){
        event.preventDefault()
        const loginData = {
          username:this.username,
          password:this.password,
        }
        this.$emit('submit-login-data',loginData)
      },
    },
}
</script>

<style>

</style>