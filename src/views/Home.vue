<template>
  <div>
    <RecommendList />
    <div class="container">
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
 