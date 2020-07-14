<template>
  <div>
    <div class="list text-left">
      <div class="items p-2 bg-white px-3 border mt-2">
        <div class="d-flex justify-content-between align-items-center user-info">
          <div class="d-flex flex-row align-items-center"><img src="https://i.imgur.com/SzqskfC.png" width="60">
            <div class="d-flex flex-column user-name-followers ml-3"><span class="font-weight-bold">{{ username }}</span><span>{{ createTime }}  <i class="fas fa-globe-americas"></i></span></div>
          </div>
          <div><i class="fa fa-bookmark-o fa-2x text-info"></i></div>
          <div class="text-right" v-if="isMaster">
            <a href="#none" @click="updateArticle">수정</a>
            <a href="#none" @click="deleteArticle">삭제</a>
          </div>
        </div>
        <div>
          <h4 class="text-primary">"{{ article.title }}"</h4>
          <p class="about">{{ article.content }}</p>
          <img width="100%" src="https://article.images.consumerreports.org/f_auto/prod/content/dam/CRO-Images-2020/Magazine/05May/CR-Health-Inlinehero-HealthyFastFood-3-20-v2" alt="article_img">
          <!-- <div class="d-flex flex-row mb-3"><span class="px-2 bg-primary text-white mr-1 rounded tags">Football</span><span class="px-2 bg-primary text-white mr-1 rounded tags">Players</span><span class="px-2 bg-primary text-white mr-1 rounded tags">Fans</span></div> -->
          <hr>
          <div class="d-flex justify-content-around cursor">
            <div @click="showCommentsChange"><i class="far fa-comment-alt"> Comment</i></div>
            <div><i class="fas fa-share"> Share</i></div>
          </div>
          <hr>
        </div>
        <CommentList class="mr-3" v-show="showComments" :comments="comments" :commentsNum="commentsNum" :articleId="article.id"/>
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
      // router push
    },
    deleteArticle(){
      axios.delete(BACK_URL + `/community/articles/${this.article.id}/`, null, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => { console.log(err.response.data) })
    },
  },
  mounted(){
    this.getComments()
  },
}
</script>

<style>
  .list {
    width: 50%;
    margin: 0 auto;
  }
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
</style>