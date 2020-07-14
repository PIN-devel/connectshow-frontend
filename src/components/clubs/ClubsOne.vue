<template>
  <div class="container">
    {{club.master.username}}
    {{club.club_name}}
		<img :src="clubThumbnailImage" alt="">
    {{club.created_at}}
  </div>
</template>

<script>
const BACK_URL = 'http://127.0.0.1:8000'

export default {
    name:'ClubsOne',
    props:{
        club:Object
    },
    computed:{
        clubThumbnailImage(){
            return BACK_URL+this.club.club_image
        }
    },
}
</script>

<style>

</style>