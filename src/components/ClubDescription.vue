<template>
  <div class="text-left m-5">
    <h3>Info</h3>
    <hr class="short-hr">
    <p>{{ club.club_detail.description }}</p>
    <h3>Members</h3>
    <hr class="short-hr">
    <div v-for="member in club.club_members" :key="member.id">
      <div class="box-member hovereffect">
        <div>
          <img class="profile" src="https://i.imgur.com/At1IG6H.png" alt="profile_image">
          <span class="username">username</span>
        </div>

        <div class="overlay">
          <a v-if="isMaster" class="info" @click="clubOut" href="#">추방</a>
          <a v-else class="info" href="#">프로필</a>
        </div>
      </div>
    </div>
    <div v-if="isMaster">
      <div v-for="member in club.club_waiting_members" :key="member.id">
        <div class="box-member hovereffect">
          <img class="profile" src="https://i.imgur.com/At1IG6H.png" alt="profile_image">
          <p>이름</p>
          <div class="overlay">
            <a v-if="isMaster" class="info" @click="clubIn" href="#">승인</a>
            <a v-if="isMaster" class="info" @click="clubOut" href="#">거절</a>
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
    clubIn(){
      const club_id = this.$route.params.clubId
      axios.post(BACK_URL + `/accounts/clubs/${club_id}/apply/`, null,  { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then((res) => {
          this.$emit('member-change')
          console.log(res.data.data)
        })
        .catch((err) => { console.log(err.response.data) })
    },
    clubOut(){
      const club_id = this.$route.params.clubId
      axios.delete(BACK_URL + `/accounts/clubs/${club_id}/apply/`, null,  { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
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
  .box-member {
    width: 160px;
    height: 110px;
  }
  .hovereffect {
    float: left;
    overflow: hidden;
    position: relative;
    /* text-align: center; */
    cursor: default;
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
    -webkit-transition: all 0.4s ease-in;
    transition: all 0.4s ease-in;
  }
  .hovereffect:hover img {
    filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0" /><feGaussianBlur stdDeviation="3" /></filter></svg>#filter');
    filter: grayscale(1) blur(1px);
    -webkit-filter: grayscale(1) blur(1px);
    /* -webkit-transform: scale(1.2); */
    /* -ms-transform: scale(1.2); */
    /* transform: scale(1.2); */
  }
  .hovereffect a.info {
    display: inline-block;
    text-decoration: none;
    padding: 7px 14px;
    border: 1px solid #fff;
    background-color: transparent;
  }
  .hovereffect a.info:hover {
    box-shadow: 0 0 5px #fff;
  }
  .hovereffect a.info, .hovereffect h2 {
    -webkit-transform: scale(0.7);
    -ms-transform: scale(0.7);
    transform: scale(0.7);
    -webkit-transition: all 0.4s ease-in;
    transition: all 0.4s ease-in;
    opacity: 0;
    filter: alpha(opacity=0);
    color: #fff;
    text-transform: uppercase;
  }
  .hovereffect:hover a.info, .hovereffect:hover h2 {
    opacity: 1;
    filter: alpha(opacity=100);
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
  .short-hr {
    display: block;
    margin: 20px 0px;
    width: 10%;
    /* border-bottom: 1px solid #bcbcbc; */
  }
  .username {
    z-index: -1;
  }
</style>