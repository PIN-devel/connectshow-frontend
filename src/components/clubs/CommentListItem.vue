<template>
  <div class="row">
    <img class="profile-comment col-2 img-fluid" src="https://i.imgur.com/At1IG6H.png" alt="">
    <div class="comment col-10">
      <div class="d-flex flex-row justify-content-between">
        <h5>{{ comment.user.username }}</h5>
        <div v-if="isAuthor">
          <a href="#none" @click="deleteComment">삭제</a>
        </div>
      </div>
      <p class="">{{ comment.content }}</p>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'CommentListItem',
  props: {
    comment: Object,
  },
  data(){
    return {
      isAuthor: null,
    }
  },
  methods: {
    deleteComment(){
      axios.delete(BACK_URL + `/community/comments/${this.comment.id}/`, null, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => { console.log(err.response.data) })
    },
    checkAuth(){
      axios.get(BACK_URL + '/accounts/', null, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then((res) => {
          console.log(res.data.data, "하하하")
          if (res.data.data.user.id === this.comment.user.id){
            this.isAuthor = true
          } else{
            this.isAuthor = false
          }
        })
        .catch((err) => { console.log(err.response.data) })
    },
  },
  mounted(){
    this.checkAuth()
  },
}
</script>

<style>

</style>