<template>
  <div class="row my-5">
    <div class="col-2 box">
      <img class="profile" src="https://i.imgur.com/At1IG6H.png" alt="profile_image">
    </div>
    <div class="col-10 text-left my-auto">
      <h3>{{ club.club_detail.club_name }}</h3>
      <button v-show="cFollow" @click="follow" class="btn btn-light m-2">팔로우</button>
      <button v-show="cNotFollow" @click="follow" class="btn btn-light m-2">팔로우 취소</button>
      <button v-show="!isMaster && userState === 1" @click="subscribeOrCancle" class="btn btn-light m-2">가입 신청</button>
      <button v-show="userState === 2" @click="subscribeOrCancle" class="btn btn-light m-2">가입 신청 취소</button>
      <button v-show="userState === 3" @click="withdraw" class="btn btn-light m-2">클럽 탈퇴</button>
      <button v-if="cMaster" @click="updateClub" class="btn btn-light m-2">클럽 수정</button>
      <button v-if="cMaster" @click="deleteClub" class="btn btn-light m-2">클럽 삭제</button>
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
    isFollow: Boolean,
    followNum: Number,
    userState: Number,
  },
  computed: {
    profileImage(){
      return this.club.club_detail.club_image
    },
    clubName(){
      return this.club.club_detail.club_name
    },
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
    follow(){
      axios.post(BACK_URL + `/accounts/clubs/${this.club.club_detail.id}/follow/`, null, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then((res) => {
          console.log(res)
          this.isFollow = !this.isFollow
          this.followNum = res.data.data.count
        })
        .catch(err => console.log(err.response.data))
    },
    updateClub(){
      this.$router.push({ name: 'ClubUpdateView', params:{'ID':this.club.club_detail.id} })
    },
    deleteClub(){
      axios.delete(BACK_URL + `/accounts/clubs/${this.club.club_detail.id}/`, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then(() => {
          console.log('클럽 삭제')
        })
        .catch(err => console.log(err.response.data))
    },
    subscribeOrCancle(){
      axios.post(BACK_URL + `/accounts/clubs/${this.club.club_detail.id}/apply/`, null, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then(() => {
          if (this.userState === 1){
            this.userState = 2
          } else{
            this.userState = 1
          }
        })
        .catch(err => console.log(err.response.data))
    },
    withdraw(){
      axios.delete(BACK_URL + `/accounts/clubs/${this.club.club_detail.id}/apply/`, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then(() => {
          this.userState = 1
        })
        .catch(err => console.log(err.response.data))
    }
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
  /* .profile {
      width: 70%;
      height: 100%;
      border-radius: 50px;
      object-fit: cover;
  } */
  .profile {
    width: 10vw;
    height: auto;
    border-radius: 50%;
  }
</style>