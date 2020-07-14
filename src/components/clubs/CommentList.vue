<template>
  <div>
    <CommentListItem class="mb-3" v-for="comment in comments" :key="comment.id" :comment="comment"/>
    <a href="#none" v-show="pageCount" @click="getComments">댓글 더보기</a>
    <div class="d-flex cursor">
      <input v-model="commentData.content" @keypress.enter="commentCreate" type="text" class="form-control m-3" placeholder="Write a comment"><i class="far fa-paper-plane fa-lg my-auto" :click="commentCreate"></i>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommentListItem from '@/components/clubs/CommentListItem'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'CommentList',
  components: {
    CommentListItem,
  },
  props: {
    comments: Array,
    commentsNum: Number,
    articleId: Number,
  },
  data(){
    return {
      commentData: {
        content: null,
      },
      page: 1,
    }
  },
  computed: {
    pageCount(){
      return this.commentsNum > this.page * 5 
    },
  },
  methods: {
    commentCreate(){
      if (!this.$cookies.isKey('auth-token')){
        alert('로그인이 필요합니다')
      } else{
        axios.post(BACK_URL + `/community/${this.articleId}/comments/`, this.commentData, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
          .then((res) => {
            this.commentData.content = null
            console.log(res.data)
          })
          .catch((err) => { console.log(err.response.data) })
      }
    },
    getComments(){
      const options = {params: {_page: ++this.page}}
      axios.get(BACK_URL + `/community/${this.articleId}/comments/`, options)
        .then((res) => {
          this.comments.push(...res.data.data)
        })
        .catch((err) => { console.log(err.response.data) })
    },
  },
}
</script>

<style>

</style>