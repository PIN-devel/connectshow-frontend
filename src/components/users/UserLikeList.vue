<template>
  <div class="text-left my-5 px-5">
    <h3>Like performance</h3>
    <hr class="short-hr">
    <p class="text-center mt-2" v-if="!userLike.length">No results :(</p>
    <div class="container">
      <div class="my-5 row d-flex">
        <ClubPerformanceItem v-for="performance in userLike" :key="`performance-${performance.id}`" :performance="performance"/>
      </div>
    </div>

  </div>
</template>

<script>
import ClubPerformanceItem from '@/components/clubs/ClubPerformanceItem'

export default {
	name: 'UserLikeList',
	components: {
    ClubPerformanceItem
	},
  props: {
    userLike: Array,
  },
}
</script>

<style>

</style>