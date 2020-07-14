<template>
  <div>
    <a href="#" id="show-btn" @click="$bvModal.show('bv-modal-Login')">로그인</a>
    
    <b-modal id="bv-modal-Login" class="w-50" hide-footer>
      <template v-slot:modal-title>
        <h1>Login</h1>
      </template>
      <div class="d-block text-center">
        <form class="center">
          <div class="form-group">
            <label for="username">username</label>
            <input type="text" class="form-control" id="username" v-model="username">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" @keypress.enter="login">
          </div>
          <button type="submit" class="btn btn-primary" @click="login">login</button>
          <hr>
          <div class="bg-light rounded-lg">
              <p class="m-0 p-3 font-weight-bold">Don't have an account?
              <br>
              <a href="" class="font-weight-bold">Sign Up</a>
              </p>
          </div>
        </form>
      </div>
      <hr>
      <!-- <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button> -->
    </b-modal>
  </div>
</template>

<script>
export default {
    name:'Login',
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