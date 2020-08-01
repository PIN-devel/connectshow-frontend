<template>
  <div class="mx-5">
      <vueper-slides
        class="no-shadow"
        :visible-slides="3"
        :slide-ratio="1 / 4"
        :dragging-distance="70">
        <vueper-slide v-for="i in 9" :key="i" :title="i.toString()"/>
      </vueper-slides>

  </div>
</template>

<script>
import axios from 'axios'

import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

const SERVER_URL = 'http://localhost:8000'

export default {
    name: 'RecommendList',
    components: {
      VueperSlides, 
      VueperSlide
    },
    data() {
      return {
        slides: [],
        images: [],
        recommendations: [],
      }
    },
    methods: {
      fetchRecommendations() {
        const config = {
          headers: {
            'Authorization': `Token ${this.$cookies.get('auth-token')}`
          }
        }
        axios.get(SERVER_URL + '/performances/recommendations/', config)
            .then(res => {
            this.recommendations = res.data.data
            for (var i = 0; i < this.recommendations.length; i++) {
              this.images.push(this.recommendations[i])
              console
            }
            console.log(res.data.data)
            })
            .catch(err => console.log(err))
            },
    },
    created() {
      this.fetchRecommendations()
    }
}
</script>

<style>

</style>