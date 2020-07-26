<template>
  <tr @click="goClubDetail" class="cursor_test">
    <th scope="row"><b-avatar :src="clubThumbnailImage" size="5rem"></b-avatar></th>
    <td class="align-middle"> {{club.club_name}}</td>
    <td class="align-middle">{{club.description}}</td>
    <td class="align-middle">{{club.master.username}}</td>
  </tr>
</template>

<script>
const BACK_URL = 'http://127.0.0.1:8000'

export default {
    name:'ClubsListitems',
    props:{
        club:Object
    },
    computed:{
        clubThumbnailImage(){
            return BACK_URL+this.club.club_image
        }
    },
    methods:{
      goClubDetail(){
        this.$router.push({ name: 'ClubDetailView', params: { clubId: this.club.id }})
      },
    }
}
</script>

<style>
.cursor_test {
  cursor: pointer;
  }
</style>