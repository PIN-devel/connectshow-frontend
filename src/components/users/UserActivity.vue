<template>
  <div class="text-left m-5">
    <div class="my-4">
      <h3>My club</h3>
      <hr class="short-hr">
      <div v-for="club in user.clubs" :key="club.id">
        <div class="card border-0 profile text-center hovereffect">
          <div @click="moveToClubPage(club.id)">
            <img class="card-img" src="https://i.imgur.com/At1IG6H.png" alt="profile_image">
            <span>{{ club.club_name }}</span>
          </div>
        </div>
      </div>
      <div class="member-bottom"></div>
    </div>

    <div class="my-4">
      <h3>My performance</h3>
      <hr class="short-hr">
      <div v-for="performance in user.performances" :key="performance.id">
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
  name: 'UserActivity',
  components: {
    PerformanceDetail
  },
  props: {
    user: Object,
	},
	methods: {
		moveToClubPage(clubId){
			this.$router.push({ name: 'ClubDetail', params: { 'clubId': clubId } })
		}
	}
}
</script>

<style>

</style>