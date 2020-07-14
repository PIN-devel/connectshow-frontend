<template>
  <div>
    <div class="text-right" v-if="!isMaster">
      <!-- <button class="raise" @click="createArticle">Create</button> -->
      <button type="button" @click="createArticle" class="btn3d btn btn-default btn-lg"><span class="glyphicon glyphicon-download-alt"></span>+</button>
    </div>
    <ClubCommunityItem v-for="article in articles" :key="article.id" :article="article" :isMaster="isMaster"/>
    
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
    }
  },
  methods: {
    getArticles(){
      const club_id = this.$route.params.clubId
      const options = {params: {_page: this.page++}}
      axios.get(BACK_URL + `/community/${club_id}/`, options)
        .then((res) => {
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
      const club_id = this.$route.params.clubId
      const options = {params: {_page: this.page++}}
      axios.get(BACK_URL + `/community/${club_id}/`, options)
        .then((res) => {
          setTimeout(() => {
            this.articles.push(...res.data.data)
            $state.loaded()
          }, 1000);
        })
        .catch(() => {
          $state.complete()
        })
    },
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