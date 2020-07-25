<template>
      <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" :src="performanceImg" alt="poster" width="100%" height="225">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button class="btn btn-primary" data-toggle="modal" :data-target="'#performance-'+performance.id">modal</button>
                  </div>
                </div>
              </div>
              <PerformanceDetail :performanceId="performance.id"/> 
            </div>
        </div>
</template>

<script>
import PerformanceDetail from '../performances/PerformanceDetail.vue'
const SERVER_URL = 'http://localhost:8000'

export default {
    name: 'PerformanceListItem',
    props: {
        performance: Object,
    },
    components:{
      PerformanceDetail,
    },
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