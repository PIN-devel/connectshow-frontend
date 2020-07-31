<template>
  <div>
    <a class="nav-link cursor_test" id="show-btn" @click="$bvModal.show('bv-modal-Login')">Sign in</a>
    
    <b-modal id="bv-modal-Login" class="" hide-footer>
      <template v-slot:modal-title>
        <h1 class="account-modal">Sign in</h1>
      </template>
        <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
      <div class="d-block text-center account-modal">
        <form class="center m-0">
        <div class="input-group mt-5 mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input type="text" name="" class="form-control input_user" value="" placeholder="username" v-model="username">
        </div>
        <div class="input-group mb-5">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input type="password" name="" class="form-control input_pass" value="" placeholder="password" v-model="password" @keypress.enter="login">
        </div>
            <hr>
          <b-button type="submit" block class="btn btn-lg btn-primary btn-block btn-signin" @click="login">login</b-button>
          <div class="bg-light rounded-lg">
              <span class="forgot-password font-weight-bold" @click="$bvModal.hide('bv-modal-Login')">
                <Signup/>
              </span>
          </div>
        </form>
      </div>
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
.account-modal{
  font-family: 'Jua', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}

.form-signin .form-control:focus {
    border-color: rgb(104, 145, 162);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
}

.btn.btn-signin {
    /*background-color: #4d90fe; */
    background-color: rgb(104, 145, 162);
    /* background-color: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));*/
    padding: 0px;
    font-weight: 700;
    font-size: 14px;
    height: 36px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    border: none;
    -o-transition: all 0.218s;
    -moz-transition: all 0.218s;
    -webkit-transition: all 0.218s;
    transition: all 0.218s;
}

.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
    background-color:cornflowerblue
}

.forgot-password {
    color: rgb(104, 145, 162);
}

.forgot-password:hover,
.forgot-password:active,
.forgot-password:focus{
    color: cornflowerblue
}

</style>