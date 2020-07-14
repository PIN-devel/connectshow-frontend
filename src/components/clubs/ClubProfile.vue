<template>
  <div class="row my-5">
    <div class="col-2 box">
      <img class="profile" src="https://i.imgur.com/At1IG6H.png" alt="profile_image">
    </div>
    <div class="col-10 text-left my-auto">
      <h3>{{ club.club_detail.club_name }}</h3>
      <button v-show="cFollow" @click="follow" class="btn btn-danger">팔로우</button>
      <button v-show="cNotFollow" @click="follow" class="btn btn-danger">팔로우 취소</button>
      <button v-if="cMaster" @click="updateClub" class="btn btn-danger">클럽 수정</button>
      <button v-if="cMaster" @click="deleteClub" class="btn btn-danger">클럽 삭제</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'ClubProfile',
  props: {
    club: Object,
    isMaster: Boolean,
  },
  data(){
    return {
      isFollow: null,
      followNum: null,
    }
  },
  computed: {
    // profileImage(){
    //   return this.club.club_detail.club_image
    // },
    // clubName(){
    //   return this.club.club_detail.club_name
    // },
    cFollow(){
      if (this.isMaster === false && this.isFollow === false){
        return true
      } else{
        return false
      }
    },
    cNotFollow(){
      if (this.isMaster === false && this.isFollow === true){
        return true
      } else{
        return false
      }
    },
    cMaster(){
      if (this.isMaster === true){
        return true
      } else{
        return false
      }
    },
  },
  methods: {
    followCheck(){
      const club_id = this.$route.params.clubId
      axios.post(BACK_URL + `/accounts/clubs/${club_id}/follow/check`,  null, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then((res) => {
          this.isFollow = res.data.data.follow
          this.followNum = res.data.data.count
        })
        .catch(err => console.log(err.response.data))
    },
    follow(){
      axios.post(BACK_URL + `/accounts/clubs/${this.club.id}/follow/`,  null, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then((res) => {
          console.log(res)
          this.isFollow = !this.isFollow
          this.followNum = res.data.data.count
        })
        .catch(err => console.log(err.response.data))
    },
    updateClub(){
      this.$router.push({ name: 'ArticleDetail', params:{'clubId':this.club.id} })
    },
    deleteClub(){
      axios.delete(BACK_URL + `/accounts/clubs/${this.club.id}/`, null, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
    },
  },
  created(){
    this.followCheck
  },
}
</script>

<style>
  .box {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .profile {
      width: 70%;
      height: 100%;
      border-radius: 50px;
      object-fit: cover;
  }
</style>