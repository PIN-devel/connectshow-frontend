<template>
  <div class="row d-flex justify-content-center my-5">
    <div class="col-lg-6 col-md-9 col-11 text-left">
      <div class="items p-2 bg-white px-3 border mt-2">
        <div class="m-2 d-flex justify-content-between align-items-center user-info">
          <div class="d-flex flex-row align-items-center">
            <i class="fab fa-instagram fa-3x"></i>
            <!-- <img src="https://i.imgur.com/SzqskfC.png" width="60"> -->
            <div class="d-flex flex-column user-name-followers ml-3"><span class="font-weight-bold">{{ username }}</span><span>{{ createTime }}  <i class="fas fa-globe-americas"></i></span></div>
          </div>
          <!-- <div><i class="fa fa-bookmark-o fa-2x text-info"></i></div> -->
          <div class="text-right" v-if="isMaster">
            <button class="btn btn-link pr-0" @click="updateArticle">수정</button>
            <button class="btn btn-link" @click="deleteArticle">삭제</button>
          </div>
        </div>
        <div>
          <img width="100%" v-if="article.image" :src="ArticleImg" class="p-3" alt="article_img">
          <div class="mx-3">
            <h5 class="font-weight-bold">{{ article.title }}</h5>
            <p class="about">{{ article.content }}</p>
          </div>
          <hr>
          <div class="ml-3 mb-3 cursor">
            <div @click="showCommentsChange"><i class="far fa-comment-alt"> Comment</i></div>
          </div>
          <!-- <hr> -->
        </div>
        <CommentList class="mx-3" v-show="showComments" :comments="comments" :commentsNum="commentsNum" :articleId="article.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommentList from '@/components/clubs/CommentList.vue'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'ClubCommunityItem',
  components: {
    CommentList,
  },
  props: {
    article: Object,
    isMaster: Boolean,
  },
  data(){
    return {
      comments: [],
      commentsNum: null,
      showComments: false,
    }
  },
  computed: {
    username(){
      return this.article.user.username
    },
    createTime(){
      return this.article.created_at.slice(0,10)
    },
    ArticleImg(){
      return BACK_URL + this.article.image
    }
  },
  methods: {
    getComments(){
      axios.get(BACK_URL + `/community/${this.article.id}/comments/`)
        .then((res) => {
          this.comments = res.data.data
          this.commentsNum = res.data.comments_num
        })
        .catch((err) => { console.log(err.response.data) })
    },
    showCommentsChange(){
      this.showComments = !this.showComments
    },
    updateArticle(){
      this.$router.push({ name: 'ArticleUpdateView', params: { 'articleId': this.article.id } })
    },
    deleteArticle(){
      this.$confirm(
        {
          message: `삭제하시겠습니까?`,
          button: {
            yes: 'Yes',
            no: 'No',
          },
          callback: confirm => {
            if (confirm) {
              axios.delete(BACK_URL + `/community/articles/${this.article.id}/`, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
                .then((res) => {
                  console.log(res.data)
                  this.$emit('article-delete', this.article.id)
                })
                .catch((err) => { console.log(err.response.data) })
            }
          }
        }
      )    
    },
  },
  mounted(){
    this.getComments()
  },
}
</script>

<style>
  .items {
      border-radius: 18px
  }
  .tags {
      font-size: 13px;
      line-height: 20px;
      cursor: pointer
  }
  .about {
      font-size: 14px
  }
  .profile-comment {
    width: 100%;
    height: 100%;
  }
  .comment {
    background: #F4F4F4;
    border: none;
    border-radius: 10px;
  }
  .cursor {
    cursor: pointer;
  }
  .fa-instagram {
    color: rgb(142, 155, 233);
  }
</style>