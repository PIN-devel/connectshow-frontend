<template>
  <div class="mx-5">
      <vueper-slides 
        autoplay
        fade
        class="no-shadow"
        :visible-slides="3"
        slide-multiple
        :slide-ratio="1 / 4"
        :dragging-distance="70"
        :gap="3">
        <vueper-slide 
          v-for="(slide, i) in slides"
          :key="i"
          :image="slide.image"/>
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
        images: [],
        recommendations: [],
        slides: [
          {
            image: require('@/assets/images/poster14.jpg')
          },
          {
            image: require('@/assets/images/poster11.jpg')
          },
          {
            image: require('@/assets/images/poster12.jpg')
          },
          {
            image: require('@/assets/images/poster16.jpg')
          },
          {
            image: require('@/assets/images/poster17.jpg')
          },
          {
            image: require('@/assets/images/poster22.jpg')
          },
          {
            image: require('@/assets/images/poster23.jpg')
          },
          {
            image: require('@/assets/images/poster10.jpg')
          },
          {
            image: require('@/assets/images/poster24.jpg')
          },
        ]
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