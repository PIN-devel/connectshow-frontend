<template>
<div>
  <div id="app" class="m-0">
    <div id="nav" class="p-0 mb-5">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <router-link to="/" class="navbar-brand">Connect Show</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/clubindex" class="nav-link">Clubs</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/calendar" class="nav-link">Calendar</router-link>
              </li>
              <li class="nav-item">
                <Login @submit-login-data="login" v-if="!isLoggedIn"/>
              </li>
              <li class="nav-item">
                <Signup @submit-signup-data="signup" v-if="!isLoggedIn"/>
              </li>
              <li class="nav-item">
                <router-link v-if="isLoggedIn" :to="{name:'UserDetailView', params:{userId:`${currentuserID}`}}" class="nav-link">{{currentuser}}님</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  v-if="isLoggedIn"
                  to="/logout"
                  @click.native="logout"
                  class="nav-link"
                >Logout</router-link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <router-view @submit-login-data="login" @submit-signup-data="signup" :key="$route.fullPath"/>
    <vue-confirm-dialog class="dialog"></vue-confirm-dialog>
    <div id="place"></div>
  </div>
  <Footer />
</div>
  
</template>
<script>
import Login from "@/components/accounts/Login.vue"
import Signup from "@/components/accounts/Signup.vue"
import Footer from "@/components/home/Footer.vue"

import axios from "axios";
const BACK_URL = "http://127.0.0.1:8000";
export default {
  name: "app",
  components:{
    Login,
    Signup,
    Footer,
  },
  data: function() {
    return {
      isLoggedIn: false,
      currentuser: null,
      currentuserID: null,
    };
  },
  methods: {
    inputcategory(key, data) {
      const axiosConfig = {
        headers: {
          Authorization: `Token ${key}`
        }
      };
      axios
        .post(`${BACK_URL}/performances/category/`, data, axiosConfig)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },

    showuser() {
      const axiosConfig = {
        headers: {
          Authorization: `Token ${this.$cookies.get("auth-token")}`
        }
      };
      if (this.$session.get("jwt")) {
        axios
          .get(`${BACK_URL}/rest-auth/user/`, axiosConfig)
          .then(response => {
            this.currentuser = response.data.username
            this.currentuserID = response.data.pk
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    setCookiesAndLogin: function(key) {
      this.$cookies.set("auth-token", key);
    },
    signup: function(signupData) {
      const loginData = {
        username:signupData.username,
        password:signupData.password1
      }
      axios
        .post(`${BACK_URL}/rest-auth/signup/`, signupData)
        .then(response => {
          console.log(response);
          this.inputcategory(response.data.key, signupData.categoryData);
          this.$alert("회원가입 완료! 자동 로그인 됩니다.");
          this.login(loginData)
        })
        .catch(err => {
          console.log(err);
          this.$alert("다시 입력 해주세요.");
        });
    },
    login: function(loginData) {
      axios
        .post(`${BACK_URL}/rest-auth/login/`, loginData)
        .then(response => {
          this.setCookiesAndLogin(response.data.key);
          this.$session.start();
          this.$session.set("jwt", response.data.key);
          this.isLoggedIn = true;
          // this.$router.push("/");
          this.showuser();
        })
        .catch(err => {
          console.log(err);
          this.$alert("아이디 혹은 비밀번호를 잘 못 입력하였습니다.");
        });
    },
    logout: function() {
      const axiosConfig = {
        headers: {
          Authorization: `Token ${this.$cookies.get("auth-token")}`
        }
      };
      axios
        .post(`${BACK_URL}/rest-auth/logout/`, null, axiosConfig)
        .then(() => {
          this.$cookies.remove("auth-token");
          this.$session.destroy();
          this.isLoggedIn = false;
          this.$router.push("/");
          this.$alert("로그아웃 완료!");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: function() {
    if (this.$cookies.isKey("auth-token")) {
      this.isLoggedIn = true;
      this.showuser();
    } else {
      this.isLoggedIn = false;
    }
  }
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Jua', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  
}
html, body {
  height: 100vh;
}

#nav {
  padding: 30px;
  margin-bottom: 70px;

}

#nav a {
  /* font-weight: bold;
  color: #2c3e50; */
}

#nav a.router-link-exact-active {
  /* color: #42b983; */
}

.dialog .vc-btn {
  color: white;
  background-color: #42b983;
}

.dialog .left {
  color: #42b983;
  background-color: white;
}

#place {
  height: 72px;
}

.main-color-1 {

}

</style>