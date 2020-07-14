<template>
  <div>
      <PerformanceListItem v-for="performance in performances" :key="performance.id" :performance="performance"/>

  </div>
</template>

<script>
import axios from 'axios'
import PerformanceListItem from '@/components/PerformanceListItem.vue'

const SERVER_URL = 'http://localhost:8000'

export default {
    name: 'PerformanceList',
    components: {
        PerformanceListItem,
    },
    data() {
        return {
        performances: {},
            }
    },
    methods: {
        fetchPerformances() {
        axios.get(SERVER_URL + '/performances/')
            .then(res => {
            this.performances = res.data.data
            console.log(res.data.data)
            })
            .catch(err => console.log(err))
            },
        fetchRecommendations() {

        },
    },
    created() {
        this.fetchPerformances()
    },
}
</script>

<style>

</style>