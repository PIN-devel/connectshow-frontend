<template>
  <div class="row my-5">
    <div class="col-lg-2 col-md-3 col-4 box">
      <ProfileImage :profileImage="club.club_detail.club_image"/>
      <!-- <img class="profile" :src="profileImage" alt="profile_image"> -->
    </div>
    <div class="col-10 text-left my-auto">
      <div class="ml-2">
        <h3>{{ clubName }}</h3>
        <p class="text-secondary m-1">생성일: {{ clubCreateDate }}</p>
      </div>
      <button v-show="cFollow" @click="follow" class="btn btn-primary m-2"><i class="fas fa-user-plus"></i> 팔로우</button>
      <button v-show="cNotFollow" @click="follow" class="btn btn-light m-2"><i class="fas fa-user-minus"></i> 팔로우 취소</button>
      <button v-show="!isMaster && userState === 1" @click="subscribeOrCancle" class="btn btn-success m-2"><i class="fas fa-users"></i> 가입 신청</button>
      <button v-show="userState === 2" @click="subscribeOrCancle" class="btn btn-light m-2"><i class="fas fa-users-slash"></i> 가입 신청 취소</button>
      <button v-show="!isMaster && userState === 3" @click="withdraw" class="btn btn-light m-2"><i class="fas fa-users-slash"></i> 클럽 탈퇴</button>
      <button v-if="cMaster" @click="updateClub" class="btn btn-light m-2"><i class="fas fa-edit"></i> 클럽 수정</button>
      <button v-if="cMaster" @click="deleteClub" class="btn btn-dark m-2"><i class="far fa-trash-alt"></i> 클럽 삭제</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import ProfileImage from '@/components/ProfileImage.vue'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'ClubProfile',
  components: {
    ProfileImage
  },
  props: {
    club: Object,
    isMaster: Boolean,
    isFollow: Boolean,
    followNum: Number,
    userState: Number,
  },
  computed: {
    clubName(){
      return this.club.club_detail.club_name
    },
    clubCreateDate(){
      return this.club.club_detail.created_at.slice(0,10)
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
      this.$confirm(
        {
          message: `삭제하시겠습니까?`,
          button: {
            yes: 'Yes',
            no: 'No',
          },
          callback: confirm => {
            if (confirm) {
              axios.delete(BACK_URL + `/accounts/clubs/${this.club.club_detail.id}/`, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
                .then(() => {
                  this.$router.push({ name: 'Home' })
                })
                .catch(err => console.log(err.response.data))
            }
          }
        }
      )
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
      this.$confirm(
        {
          message: `삭제하시겠습니까?`,
          button: {
            yes: 'Yes',
            no: 'No',
          },
          callback: confirm => {
            if (confirm) {
              axios.delete(BACK_URL + `/accounts/clubs/${this.club.club_detail.id}/apply/`, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
                .then(() => {
                  this.userState = 1
                  this.$emit('member-change')
                })
                .catch(err => console.log(err.response.data))
            }
          }
        }
      )
    }
  },
}
</script>

<style>
  .box {
    width: 150px;
    height: 150px;
    border-radius: 70%;
    overflow: hidden;
    /* overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center; */

  }
  .profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 70%;
  }
</style>