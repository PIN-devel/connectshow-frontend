<template>
  <div>
      <div>
          {{ performanceTitle }}
      </div>
      <img :src="performanceImg" alt="poster">
      <button class="btn btn-primary" data-toggle="modal" :data-target="'#performance-'+performance.id">modal</button>
      <PerformanceDetail :performanceId="performance.id"/> 
  </div>
</template>

<script>
import PerformanceDetail from './performances/PerformanceDetail'
const SERVER_URL = 'http://localhost:8000'

export default {
    name: 'PerformanceListItem',
    props: {
        performance: Object,
    },
    components:{PerformanceDetail},
    computed: {
        performanceTitle () {
            return this.performance.title
        },
        performanceImg () {
            return SERVER_URL + this.performance.poster_image
        },
    },
}
</script>

<style>

</style>