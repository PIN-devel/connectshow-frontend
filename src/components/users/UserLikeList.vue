<template>
  <div class="text-left m-5">
    <div class="my-4">
      <h3>Like performance</h3>
      <hr class="short-hr">
      <div v-for="performance in userLike" :key="performance.id">
        <div class="hovereffect m-2" data-toggle="modal" :data-target="'#performance-'+performance.id" width="170px" >
          <img class="perf-img" src="https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/183/533/81183533_1554803873172_1_600x600.JPG" alt="poster_image">
          <span>{{ performance.title }}</span>
					<PerformanceDetail :performanceId="performance.id"/> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PerformanceDetail from '@/components/performances/PerformanceDetail'

export default {
	name: 'UserLikeList',
	components: {
		PerformanceDetail
	},
  props: {
    userLike: Object,
	},
}
</script>

<style>

</style>