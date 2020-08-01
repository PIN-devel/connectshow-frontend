<template>
      <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 card-deck">
          <div class="card border-0 m-3 text-center img-hover-zoom" style="width: 18rem;"
            data-toggle="modal" :data-target="'#performance-'+performance.id">
              <img :src="performanceImg" 
                  class="mw-100 poster-img" alt="Movie Poster">
              <div class="card-img-overlay">
                  <p class="text-white">{{ performanceTitle }}</p>
              </div>
          </div>
          <PerformanceDetail :performanceId="performance.id"/> 
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
.poster-img {
    object-fit: cover;
    height: 360px;
}

.img-hover-zoom {
    height: 300px;
    overflow: hidden;
    background-color:rgb(31, 31, 31) !important;
  }
  
.img-hover-zoom img {
    transition: transform .5s ease;
}

.img-hover-zoom:hover{
    cursor: pointer;
}
.img-hover-zoom:hover img {
    transform: scale(1.5);
    opacity: 0.4;   
}
.img-hover-zoom div {
    visibility: hidden;
}
.img-hover-zoom:hover div {
    visibility: visible;
    font-size: 30px;
}
</style>