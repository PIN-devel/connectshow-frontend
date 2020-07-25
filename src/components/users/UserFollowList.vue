<template>
  <div class="text-left my-5 px-5">
    <div>
      <h3>Follow club</h3>
      <hr class="short-hr">
      <br>
      <p class="text-center mt-2" v-if="!userFollow.length">No results :(</p>
      <div class="d-flex">
        <div class="col-lg-2 col-md-3 col-4 border-0 m-2 text-center" v-for="club in userFollow" :key="club.id">
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
  </div>
</template>

<script>
import ProfileImage from '@/components/ProfileImage.vue'

export default {
  name: 'UserFollow',
  components: {
    ProfileImage,
  },
  props: {
    userFollow: Array,
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