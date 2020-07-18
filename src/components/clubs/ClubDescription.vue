<template>
  <div class="text-left m-5">
    <div>
      <h3>Info</h3>
      <hr class="short-hr">
      <p>{{ club.club_detail.description }}</p>
    </div>
    <div class="my-4">
      <h3>Members</h3>
      <hr class="short-hr">
      <div v-for="member in club.club_members" :key="member.id">
        <div class="card border-0 profile text-center hovereffect">
          <div>
            <img class="card-img" src="https://i.imgur.com/At1IG6H.png" alt="profile_image">
            <span>{{ member.username }}</span>
          </div>
          <div class="card-img-overlay d-flex justify-content-center align-items-center img-hover-zoom">
            <button v-if="isMaster" class="btn" @click="clubOut(member.id)">추방</button>
            <button v-else class="btn">프로필</button>
          </div>
        </div>
      </div>
      <div class="member-bottom"></div>
    </div>

    <div v-if="isMaster" class="my-4">
      <h3>Waiting list</h3>
      <hr class="short-hr">
      <div v-for="member in club.club_waiting_members" :key="member.id">
        <div class="card border-0 profile text-center hovereffect">
          <img class="card-img" src="https://i.imgur.com/At1IG6H.png" alt="profile_image">
          <span>{{ member.username }}</span>
          <div class="">
            <button v-if="isMaster" class="btn btn-light" @click="clubIn(member.id)">승인</button>
            <button v-if="isMaster" class="btn btn-light" @click="clubOut(member.id)">거절</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'ClubDescription',
  props: {
    club: Object,
    isMaster: Boolean,
    isChanged: Boolean,
  },
  methods: {
    clubIn(userId){
      const club_id = this.$route.params.clubId
      axios.post(BACK_URL + `/accounts/clubs/${club_id}/user/${userId}/`, null, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then((res) => {
          this.$emit('member-change')
          console.log(res.data.data)
        })
        .catch((err) => { console.log(err.response.data) })
    },
    clubOut(userId){
      const club_id = this.$route.params.clubId
      axios.delete(BACK_URL + `/accounts/clubs/${club_id}/user/${userId}/`, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then((res) => {
          this.$emit('member-change')
          console.log(res.data.data)
        })
        .catch((err) => { console.log(err.response.data) })
    },
  },
}
</script>

<style>
  .hovereffect {
    float: left;
    overflow: hidden;
    position: relative;
    text-align: center;
    cursor: pointer;
  }
  .hovereffect .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    top: 30%;    
    left: 10%;
  }
  .hovereffect img {
    display: block;
    position: relative;
  }
  .hovereffect:hover img {
    filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0" /><feGaussianBlur stdDeviation="3" /></filter></svg>#filter');
    filter: grayscale(1) blur(1px);
    -webkit-filter: grayscale(1) blur(1px);

  }
  .img-hover-zoom button {
    visibility: hidden;
  }
  .img-hover-zoom:hover{
    cursor: pointer;
  }
  .img-hover-zoom:hover button {
    visibility: visible;
    font-size: 30px;
  }
  .short-hr {
    width: 5vw;
    margin-left: 0;
  }
  .member-bottom {
    clear: both;
  }
</style>