<template>
  <div>
    <div class="text-right" v-if="isMaster">
      <button class="btn btn-light" @click="createArticle"><i class="fas fa-edit"></i> Article create</button>
    </div>
    <ClubCommunityItem @article-delete="articleDelete" v-for="article in articles" :key="article.id" :article="article" :isMaster="isMaster"/>
    <p class="mt-2" v-if="!articles.length">No results :(</p>
    <infinite-loading v-if="articles.length" @infinite="infiniteHandler" spinner="waveDots"></infinite-loading>
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
      this.$router.push({ name: 'ArticleCreateView' })
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

</style>