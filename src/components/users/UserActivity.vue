<template>
  <div class="text-left my-5 px-5">
    <div>
      <h3>My club</h3>
      <hr class="short-hr">
      <br>
      <div class="d-flex">
        <div class="col-lg-2 col-md-3 col-4 border-0 m-2 text-center" v-for="club in user.clubs" :key="club.id">
          <div class="d-flex flex-column">
            <div class="m-auto" @click="moveToClubPage(club.id)">
              <ProfileImage :profileImage="club.club_image"/>
              <span>{{ club.club_name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="member-bottom"></div>
    </div>

    <div class="my-5">
      <h3>My performance</h3>
      <hr class="short-hr">
      <br>
      <div class="container">
        <div class="row d-flex">
          <ClubPerformanceItem v-for="performance in user.performances" :key="`performance-${performance.id}`" :performance="performance"/>
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