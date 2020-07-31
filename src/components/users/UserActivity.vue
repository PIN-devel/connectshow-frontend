<template>
  <div class=" text-left m-5 pb-5 row">
    <div class="col-md-6">
      <div class="clubs row no-gutters border rounded overflow-auto flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="p-4 position-static text-left">
          <div class="d-flex justify-content-between">
            <strong class="d-inline-block mb-3 text-success">My club</strong>
            <i @click="moveToClubCreate" class="fas fa-plus" style="cursor:pointer; color:green;"></i>
          </div>
          <div class="d-flex flex-wrap row px-2">
            <div class="border-0 text-center py-2 col-lg-3 col-md-6 col-sm-4 col-6" v-for="club in user.clubs" :key="club.id">
            <div class="d-flex flex-column">
              <div class="m-auto" @click="moveToClubPage(club.id)">
                <ProfileImage :profileImage="club.club_image"/>
                <span v-if="club.club_name.length > 5">{{ club.club_name.substr(0,5) }}...</span>
                <span v-else>{{ club.club_name }}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>    
    </div>

    <div class="col-md-6">
      <div class="clubs row no-gutters border rounded overflow-auto flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="p-4 position-static text-left">
          <strong class="d-inline-block mb-3 text-success">Follow club</strong>
          <div class="d-flex flex-wrap row px-2">
            <div class="border-0 text-center py-2 col-lg-3 col-md-6 col-sm-4 col-6" v-for="club in user.follow_clubs" :key="club.id">
            <div class="d-flex flex-column">
              <div class="m-auto" @click="moveToClubPage(club.id)">
                <ProfileImage :profileImage="club.club_image"/>
                <span v-if="club.club_name.length > 5">{{ club.club_name.substr(0,5) }}...</span>
                <span v-else>{{ club.club_name }}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>    
    </div>

    <div class="col-12">
      <div class="perfs-max-h row no-gutters border rounded overflow-auto flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="p-4 position-static text-left">
          <strong class="d-inline-block mb-4 text-warning">My performance</strong>
          <div class="d-flex flex-wrap">
            <ClubPerformanceItem v-for="performance in user.performances" :key="`performance-${performance.id}`" :performance="performance"/>
          </div>
        </div>
      </div>
    </div>  

    <div class="col-12">
      <div class="perfs-max-h row no-gutters border rounded overflow-auto flex-md-row mb-4 shadow-sm h-md-250 position-relative">
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
    },
    moveToClubCreate(){
      this.$router.push({ name: 'ClubCreateView' })
    },
	}
}
</script>

<style>
.clubs {
  max-height: 230px;
}
.perfs-max-h {
  max-height: 365px;
}

</style>