<template>
  <div>
    <RecommendList />
    <div class="container">
      <h3 class="text-center my-4">Performances</h3>
      <div class="title-line-divider"></div>
      <Categories @select-category="selectCategory"/>
      <PerformanceList :performances="performances"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import RecommendList from '@/components/home/RecommendList.vue'
import Categories from '@/components/home/Categories.vue'
import PerformanceList from '@/components/home/PerformanceList.vue'

const SERVER_URL = 'http://localhost:8000'

export default {
  name: 'Home',
  data() {
    return {
      performances: [],
      category: '',
    }
  }, 
  components: {
    PerformanceList,
    Categories,
    RecommendList,
  }, 
  methods: {
    fetchPerformances() {
        axios.get(SERVER_URL + '/performances/')
            .then(res => {
            this.performances = res.data.data
            })
            .catch(err => console.log(err))
            },
    selectCategory(id){
        axios.get(SERVER_URL + '/performances/', {params:{
          category_id:id,
        }})
        .then(res => {
          this.performances = res.data.data
            })
        .catch(err => console.log(err))
        this.category = id
      },
  },
  created() {
        this.fetchPerformances()
    },
}
</script>

<style scoped>
.title-line-divider {
  width: 80px;
  border-top: 4px solid #FF8A3D;
  margin: 0 auto;
  margin-bottom: 50px;
}
</style>