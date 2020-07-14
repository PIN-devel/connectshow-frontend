<template>
  <div>
      <div>
          {{ performanceTitle }}
      </div>
      <img :src="performanceImg" alt="poster">
  </div>
</template>

<script>

const SERVER_URL = 'http://localhost:8000'

export default {
    name: 'PerformanceListItem',
    props: {
        performance: Object,
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