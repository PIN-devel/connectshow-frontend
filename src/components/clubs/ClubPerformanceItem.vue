<template>
  <div class="col-lg-3 col-md-6 col-12 text-center">
    <div class="card mb-2 p-0 shadow-sm" data-toggle="modal" :data-target="'#performance-'+performance.id">
      <div class="perf-img">
        <img :class="{'over-date': overDate}" class="card-img-top w-100" :src="posterImg" alt="poster" width="100%" height="225">
        <div class="card-img-overlay d-flex justify-content-center align-items-center">
          <h5 class="card-title text-white" v-if="overDate" style="font-size:2rem">상영종료</h5>
        </div>
      </div>
    </div>
    <PerformanceDetail :performanceId="performance.id"/>
    <h5>{{ performance.title }}</h5>
  </div>
</template>

<script>
import PerformanceDetail from '@/components/performances/PerformanceDetail'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'ClubPerformanceItem',
  props: {
    performance: Object,
  },
  components:{
    PerformanceDetail
  },
  data(){
    return {
      overDate: null,
    }
  },
  computed: {
    posterImg(){
      return BACK_URL + this.performance.poster_image
    }
  },
  methods: {
    dateCheck(){
      let today = new Date();
      let end_date = new Date(this.performance.end_date)
      end_date.setHours(end_date.getHours() + 15)
      if (today > end_date){
        this.overDate = true
      } else{
        this.overDate = false
      }
    }
  },
  mounted(){
    this.dateCheck()
  },
}
</script>

<style>
  .perf-img {
    cursor: pointer;
  }
  .perf-img:hover {
    filter: brightness(90%)
  }
  .over-date {
    filter: brightness(30%)
  }
  .over-date:hover {
    filter: brightness(20%)
  }
</style>