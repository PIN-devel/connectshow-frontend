<template>
  <div class="text-left m-5">
    <div class="my-4">
      <h3>Follow club</h3>
      <hr class="short-hr">
      <div v-for="club in userFollow" :key="club.id">
				<div class="card border-0 profile text-center hovereffect">
          <div @click="moveToClubPage(club.id)">
            <img class="card-img" src="https://i.imgur.com/At1IG6H.png" alt="profile_image">
            <span>{{ club.club_name }}</span>
          </div>
        </div>
      </div>
      <div class="member-bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFollow',
  props: {
    userFollow: Object,
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