<template>
  <div id="app" class="m-0">
    <div id="nav" class="m-0 p-0 mb-5">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" class="navbar-brand">
          <img src="@/assets/logo.png" alt style="height: 90px" />
        </router-link>
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
            <li class="nav-item active">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="!isLoggedIn" to="/signup" class="nav-link">Signup</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="flag" to="/accountsdetail" class="nav-link">{{currentuser}}님</router-link>
            </li>
            <li class="nav-item">
              <router-link
                v-if="isLoggedIn"
                to="/logout"
                @click.native="logout"
                class="nav-link"
              >Logout</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/clubcreate" class="nav-link">clubcreate</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/calender" class="nav-link">Calender</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view @submit-login-data="login" @submit-signup-data="signup" :key="$route.fullPath" />
  </div>
</template>
<script>
import axios from "axios";
const BACK_URL = "http://127.0.0.1:8000";
export default {
  name: "app",
  data: function() {
    return {
      isLoggedIn: false,
      currentuser: null,
      flag: null
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
            this.currentuser = response.data.username;
            this.flag = true;
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
      axios
        .post(`${BACK_URL}/rest-auth/signup/`, signupData)
        .then(response => {
          console.log(response);
          this.inputcategory(response.data.key, signupData.categoryData);
          this.$router.push("/login");
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
          this.flag = true;
          this.$router.push("/");
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
          this.flag = false;
          this.$router.push("/");
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
      this.flag = false;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>