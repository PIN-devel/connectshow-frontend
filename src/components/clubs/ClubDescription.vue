<template>
  <div class="text-left my-5 px-5">
    <div>
      <h3>Info</h3>
      <hr class="short-hr">
      <br>
      <p>{{ club.club_detail.description }}</p>
    </div>

    <div class="my-5">
      <h3>Members</h3>
      <hr class="short-hr">
      <br>
      <div class="d-flex">
        <div class="col-lg-2 col-md-3 col-4 border-0 m-2 text-center" v-for="member in club.club_members" :key="member.id">
          <div class="d-flex flex-column">
            <div class="m-auto" @click="moveToDetail(member.id)">
              <ProfileImage :profileImage="member.profile_image"/>
            </div>
            <div class="my-1">
              <b-badge pill variant="danger" v-if="member.id === club.club_detail.master.id">M</b-badge> <span>{{ member.username }}</span>
            </div>
              <b-button v-if="isMaster && member.id !== club.club_detail.master.id" variant="outline-danger" @click="clubOut(member.id)">추방</b-button>
          </div>
        </div>
      </div>
      <div class="member-bottom"></div>
    </div>

    <div v-if="isMaster" class="my-5">
      <h3>Waiting list</h3>
      <hr class="short-hr">
      <br>
      <div class="d-flex">
        <div class="col-lg-2 col-md-3 col-4 border-0 m-2 text-center" v-for="member in club.club_waiting_members" :key="member.id">
          <div class="d-flex flex-column">
            <div class="m-auto" @click="moveToDetail(member.id)">
              <ProfileImage :profileImage="member.profile_image"/>
            </div>
            <div class="my-1">
              <span>{{ member.username }}</span>
            </div>
            <b-button-group>
              <b-button v-if="isMaster" @click="clubIn(member.id)" variant="outline-secondary">승인</b-button>
              <b-button v-if="isMaster" @click="clubOut(member.id)" variant="outline-danger">거부</b-button>
              <!-- <button v-if="isMaster" class="btn btn-light" @click="clubIn(member.id)">승인</button> -->
              <!-- <button v-if="isMaster" class="btn btn-light" @click="clubOut(member.id)">거부</button> -->
            </b-button-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import ProfileImage from '@/components/ProfileImage.vue'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'ClubDescription',
  components: {
    ProfileImage
  },
  props: {
    club: Object,
    isMaster: Boolean,
    // isChanged: Boolean,
  },
  methods: {
    clubIn(userId){
      const club_id = this.$route.params.clubId
      axios.post(BACK_URL + `/accounts/clubs/${club_id}/user/${userId}/`, null, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then(() => {
          this.$emit('member-change')
        })
        .catch((err) => { console.log(err.response.data) })
    },
    clubOut(userId){
      this.$confirm(
        {
          message: `삭제하시겠습니까?`,
          button: {
            yes: 'Yes',
            no: 'No',
          },
          callback: confirm => {
            if (confirm) {
              const club_id = this.$route.params.clubId
              axios.delete(BACK_URL + `/accounts/clubs/${club_id}/user/${userId}/`, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
                .then(() => {
                  this.$emit('member-change')
                })
                .catch((err) => { console.log(err.response.data) })
            }
          }
        }
      )
    },
    moveToDetail(memberId){
      console.log(memberId)
      this.$router.push({ name: 'UserDetailView', params: { 'userId': memberId } })
    }
  },
}
</script>

<style>
  .short-hr {
    width: 5vw;
    margin-left: 0;
  }
  .member-bottom {
    clear: both;
  }
</style>