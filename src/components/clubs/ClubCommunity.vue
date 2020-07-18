<template>
  <div>
    <div class="text-right" v-if="isMaster">
      <!-- <button class="raise" @click="createArticle">Create</button> -->
      <!-- <button type="button" @click="createArticle" class="btn3d btn btn-default btn-lg"><span class="glyphicon glyphicon-download-alt"></span>+</button> -->
      <button class="btn btn-light" @click="createArticle"><i class="fas fa-edit"></i> Article create</button>
    </div>
    <ClubCommunityItem @article-delete="articleDelete" v-for="article in articles" :key="article.id" :article="article" :isMaster="isMaster"/>
    
    <infinite-loading @infinite="infiniteHandler" spinner="waveDots"></infinite-loading>
  </div>
</template>

<script>
import axios from 'axios'
import ClubCommunityItem from '@/components/clubs/ClubCommunityItem.vue'

import InfiniteLoading from 'vue-infinite-loading'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'ClubCommunity',
  components: {
    ClubCommunityItem,
    InfiniteLoading,
  },
  props: {
    isMaster: Boolean,
  },
  data(){
    return {
      articles: [],
      page: 1,
      articlesNum: null,
    }
  },
  methods: {
    getArticles(){
      const club_id = this.$route.params.clubId
      const options = {params: {_page: this.page++}}
      axios.get(BACK_URL + `/community/${club_id}/`, options)
        .then((res) => {
          this.articlesNum = res.data.articles_num
          setTimeout(() => {
            this.articles.push(...res.data.data)
          }, 1000);
        })
        .catch((err) => {console.log(err.response.data)})
    },
    createArticle(){
      // router push
    },
    infiniteHandler($state){
      if (parseInt(this.articlesNum / 5) >= this.page){
        const club_id = this.$route.params.clubId
        const options = {params: {_page: this.page++}}
        axios.get(BACK_URL + `/community/${club_id}/`, options)
          .then((res) => {
            setTimeout(() => {
              this.articles.push(...res.data.data)
              $state.loaded()
            }, 1000);
          })
          .catch((err) => {
            console.log(err.response.data)
          })
      } else{
        $state.complete()
      }
    },
    articleDelete(articleId){
      this.articles = this.articles.filter(function (article){
        return article.id !== articleId
      })
    }
  },
  created(){
    this.getArticles()
  },
}
</script>

<style>
.btn3d {
    transition:all .08s linear;
    position:relative;
    outline:medium none;
    -moz-outline-style:none;
    border:0px;
    margin-right:10px;
    margin-top:15px;
}
.btn3d:focus {
    outline:medium none;
    -moz-outline-style:none;
}
.btn3d:active {
    top:9px;
}
.btn-default {
    box-shadow:0 0 0 1px #ebebeb inset, 0 0 0 2px rgba(255,255,255,0.15) inset, 0 4px 0 0 #adadad, 0 4px 0 1px rgba(0,0,0,0.4), 0 8px 8px 1px rgba(0,0,0,0.5);
    background-color:#fff;
}
</style>