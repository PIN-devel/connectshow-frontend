<template>
  <div class=" text-left m-5 pb-5 row">
    <div class="col-md-6">
      <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="p-4 position-static text-left">
          <strong class="d-inline-block mb-3 text-success">My club</strong>
          <div class="d-flex flex-wrap">
            <div class="border-0 text-center px-2 mx-auto" v-for="club in user.clubs" :key="club.id">
            <div class="d-flex flex-column">
              <div class="m-auto" @click="moveToClubPage(club.id)">
                <ProfileImage :profileImage="club.club_image"/>
                <span>{{ club.club_name }}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>    
    </div>

    <div class="col-md-6">
      <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="p-4 position-static text-left">
          <strong class="d-inline-block mb-3 text-success">Follow club</strong>
          <div class="d-flex flex-wrap">
            <div class="border-0 text-center px-2 mx-auto" v-for="club in user.follow_clubs" :key="club.id">
            <div class="d-flex flex-column">
              <div class="m-auto" @click="moveToClubPage(club.id)">
                <ProfileImage :profileImage="club.club_image"/>
                <span>{{ club.club_name }}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>    
    </div>

    <div class="col-12">
      <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="p-4 position-static text-left">
          <strong class="d-inline-block mb-4 text-warning">My performance</strong>
          <div class="d-flex flex-wrap">
            <ClubPerformanceItem v-for="performance in user.performances" :key="`performance-${performance.id}`" :performance="performance"/>
          </div>
        </div>
      </div>
    </div>  

    <div class="col-12">
      <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="p-4 position-static text-left">
          <strong class="d-inline-block mb-4 text-warning">Like performance</strong>
          <div class="d-flex flex-wrap">
            <ClubPerformanceItem v-for="performance in user.like_performances" :key="`performance-${performance.id}`" :performance="performance"/>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import ProfileImage from '@/components/ProfileImage.vue'
import ClubPerformanceItem from '@/components/clubs/ClubPerformanceItem'

export default {
  name: 'UserActivity',
  components: {
    ProfileImage,
    ClubPerformanceItem,
  },
  props: {
    user: Object,
	},
	methods: {
		moveToClubPage(clubId){
			this.$router.push({ name: 'ClubDetailView', params: { 'clubId': clubId } })
		}
	}
}
</script>

<style>

</style>