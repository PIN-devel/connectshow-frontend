<template>
  <div class="container">
    <ClubProfile class="container m-5" @member-change="memberChange" :userState="userState" :isFollow="isFollow" :followNum="followNum" :isMaster="isMaster" :club="club"/>
    <div>
      <ul class="nav nav-tabs nav-justified md-tabs indigo" id="myTabJust" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="des-tab-just" data-toggle="tab" href="#des-just" role="tab" aria-controls="des-just"
            aria-selected="true">INFO</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="perf-tab-just" data-toggle="tab" href="#perf-just" role="tab" aria-controls="perf-just"
            aria-selected="false">PERFORMANCE</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="community-tab-just" data-toggle="tab" href="#community-just" role="tab" aria-controls="community-just"
            aria-selected="false">COMMUNITY</a>
        </li>
      </ul>

      <div class="tab-content p-5" id="myTabContentJust">
        <ClubDescription @member-change="memberChange" :isMaster="isMaster" :club="club" class="tab-pane fade show active container" id="des-just" role="tabpanel" aria-labelledby="des-tab-just"/>
        <ClubPerformances :isMaster="isMaster" class="tab-pane fade container" id="perf-just" role="tabpanel" aria-labelledby="perf-tab-just"/>
        <ClubCommunity :isMaster="isMaster" class="tab-pane fade container" id="community-just" role="tabpanel" aria-labelledby="community-tab-just"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ClubProfile from '@/components/clubs/ClubProfile.vue'
import ClubDescription from '@/components/clubs/ClubDescription.vue'
import ClubPerformances from '@/components/clubs/ClubPerformances.vue'
import ClubCommunity from '@/components/clubs/ClubCommunity'

import axios from 'axios'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'ClubDetailView',
  components: {
    ClubProfile,
    ClubDescription,
    ClubPerformances,
    ClubCommunity,
  },
  data(){
    return {
      club: [],
      isMaster: false,
      // isChanged: false,
      isFollow: null,
      followNum: null,
      userState: null,
    }
  },
  methods: {
    getInfo(){
      const club_id = this.$route.params.clubId
      axios.get(BACK_URL + `/accounts/clubs/${club_id}/`)
        .then((res) => {
          this.club = res.data.data
          if (this.$cookies.get("auth-token")){
            axios.get(BACK_URL + '/accounts/', { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
              .then((res) => {
                const userId = res.data.data.id
                if (this.club.club_members.find(member => {
                  return member.id === userId
                })){
                  this.userState = 3
                } else{
                  if (this.club.club_waiting_members.find(member => {
                    return member.id === userId
                  })){
                    this.userState = 2
                  } else{
                    this.userState = 1
                  }
                }
              })
              .catch((err) => { console.log(err.response.data) })
            }
        })
        .catch(() => this.$router.push({ name: 'Home' }))
    },
    checkMaster(){
      const club_id = this.$route.params.clubId
      axios.post(BACK_URL + `/accounts/clubs/${club_id}/master/check/`, null, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then((res) => {
          this.isMaster = res.data.data.master
        })
        .catch(err => console.log(err.response.data))
    },
    memberChange(){
      this.getInfo()
    },
    // memberIn(member){
    //   console.log('승인', member)
    //   this.club.club_members.push(...member)
    //   console.log(this.club.club_members)
    // },
    // memberOut(memberId){
    //   console.log('거부', memberId)
    //   if (this.club.club_members.find(member => {
    //     return member.id === memberId
    //   })){
    //     for (var i=0; i<this.club.club_members; i++){
    //       if (this.club.club_members[i].id === memberId){
    //         delete this.club.club_members[i]
    //         console.log(this.club.club_members)
    //       }
    //     }
    //   } else{
    //     for (var j=0; j<this.club.club_members; j++){
    //       if (this.club.club_waiting_members[j].id === memberId){
    //         delete this.club.club_waiting_members[j]
    //         console.log(this.club.club_waiting_members)
    //       }
    //     }
    //   }
    // },
    followCheck(){
      const club_id = this.$route.params.clubId
      axios.post(BACK_URL + `/accounts/clubs/${club_id}/follow/check/`, null, { headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }})
        .then((res) => {
          this.isFollow = res.data.data.follow
          this.followNum = res.data.data.count
        })
        .catch(err => console.log(err.response.data))
    },
  },
  created(){
    this.getInfo()
    this.checkMaster()
    this.followCheck()
  },
}
</script>
