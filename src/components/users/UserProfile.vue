<template>
  <div class="row my-5">
    <div class="col-lg-2 col-md-3 col-4">
      <b-avatar variant="secondary" :src="'http://127.0.0.1:8000'+user.profile_image" size="8rem"></b-avatar>
    </div>
    <div class="col-lg-10 col-md-9 col-8 text-left my-auto">
      <div class="d-flex">
        <h3>{{ user.username }}</h3>
        <i v-if="isAuth" @click="updateUser" class="fas fa-edit mx-2"></i>
        <!-- <i v-if="isAuth" @click="deleteUser" class="far fa-trash-alt"></i> -->
      </div>
      <h6>{{ user.email }}</h6>

      <b-badge variant="info" class="mr-2" v-for="category in user.like_categories" :key="category.id"># {{ category.name }}</b-badge>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'UserProfile',
  props: {
    user: Object,
    isAuth: Boolean,
  },
  methods: {
    updateUser(){
      this.$router.push({ name: 'UserProfileUpdateView', params:{'ID':this.user.id} })
    },
    deleteUser(){
      this.$confirm(
        {
          message: `삭제하시겠습니까?`,
          button: {
            yes: 'Yes',
            no: 'No',
          },
          callback: confirm => {
            if (confirm) {
              axios.delete(BACK_URL + `/accounts/${this.user.id}/`, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
                .then(() => {
                  this.$router.push({ name: 'Home' })
                })
                .catch(err => console.log(err.response.data))
            }
          }
        }
      )
    },
  },
}
</script>

<style>
.fa-edit {
  cursor: pointer;
}
</style>