<template>
  <div class="text-left">
    <div class="text-right" v-if="isMaster">
      <button class="btn btn-light" @click="createPerformance"><i class="fas fa-edit"></i> Performance create</button>
    </div>
    <p class="text-center mt-2" v-if="!performances.length">No results :(</p>
    <div class="container">
      <div class="my-5 row d-flex justify-content-center">
        <ClubPerformanceItem v-for="performance in performances" :key="`performance-${performance.id}`" :performance="performance"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ClubPerformanceItem from '@/components/clubs/ClubPerformanceItem'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'ClubPerformances',
  components: {
    ClubPerformanceItem
  },
  props: {
    isMaster: Boolean,
  },
  data(){
    return {
      performances: [],
    }
  },
  methods: {
    getPerformances(){
      const club_id = this.$route.params.clubId
      axios.get(BACK_URL + `/performances/club/${club_id}`)
        .then((res) => {
          this.performances = res.data.data
        })
        .catch((err) => {console.log(err.response.data)})
    },
    createPerformance(){
      this.$router.push({ name: 'PerformanceCreateView' })
    },
  },
  created(){
    this.getPerformances()
  }
}
</script>

<style>

</style>