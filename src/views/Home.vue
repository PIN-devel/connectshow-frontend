<template>
  <div class="container">
    <RecommendList />
    <PerformanceList />
  </div>
</template>

<script>
// @ is an alias to /src
import RecommendList from '@/components/RecommendList.vue'
import PerformanceList from '@/components/PerformanceList.vue'

export default {
  name: 'Home',
  data() {
    return {
      performances: [],
    }
  },
  components: {
    PerformanceList,
    RecommendList,
  },
}
</script>
 