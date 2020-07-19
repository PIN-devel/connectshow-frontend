<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="clubname">Club name</label>
        <input type="text" class="form-control" id="clubname" aria-describedby="clubnamehelper" v-model="club_name">
        <small id="clubnamehelper" class="form-text text-muted">...</small>
      </div>
      <div class="form-group">
          <label for="exampleFormControlFile1">club_image</label>
          <input type="file" id="file" ref="file" @change="clubimage()"/>
      </div>
      <div class="form-group">
        <label for="description">description</label>
        <input type="text" class="form-control" id="description" aria-describedby="descriptionhelper" v-model="description">
        <small id="descriptionhelper" class="form-text text-muted">...</small>
      </div>
      <button type="submit" class="btn btn-info mr-1" @click="updateclub">수정</button>
      <!-- <button type="submit" class="btn btn-danger" @click="deleteclub">삭제</button> -->
    </form>
  </div>
</template>

<script>
import axios from 'axios'
const BACK_URL = 'http://127.0.0.1:8000'

export default {
    name:"ClubUpdateView",
    data(){
      return{
      club_name:null,
      description:null,
      club_image:null,
      user:null,
      currentuser:null,
    }
  },
    methods:{
      getuser(){
        const axiosConfig = {
          headers:{
            Authorization : `Token ${this.$cookies.get('auth-token')}`
          },
        }
        axios.get(`${BACK_URL}/rest-auth/user/`,axiosConfig)
          .then((reaponse)=>{
            this.currentuser = reaponse.data.username
          if (this.user !== this.currentuser){
              this.$alert("잘 못 된 접근입니다.");
              this.$router.push({name:'Home'})
          }  
          })
          .catch((err)=>{
            console.error(err)
          })
      },

      getclub(){ 
        axios.get(`${BACK_URL}/accounts/clubs/`+this.$route.params.ID+'/')
        .then((reaponse)=>{
          this.club_name = reaponse.data.data.club_detail.club_name
          this.description = reaponse.data.data.club_detail.description
          this.club_image = reaponse.data.data.club_detail.club_image
          this.user = reaponse.data.data.club_detail.master.username
          console.log(this.club_name)
          console.log(this.description)
          console.log(this.club_image)
          console.log(this.user)
          this.getuser()
        })
        .catch((err)=>{
          console.error(err)
        })
      },
      updateclub(event){
        event.preventDefault()
        const axiosConfig = {
          headers:{
            Authorization : `Token ${this.$cookies.get('auth-token')}`
          },
        }
        let clubdata = new FormData()
        clubdata.append('club_image',this.club_image)
        clubdata.append('club_name',this.club_name)
        clubdata.append('description',this.description)
        console.log(clubdata)
        axios.put(`${BACK_URL}/accounts/clubs/`+this.$route.params.ID+'/',clubdata,axiosConfig)
        .then((response)=>{
          this.$alert("수정완료:)")
          this.$router.push({ name: 'ClubDetailView', params: { clubId: response.data.data.id }})
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    deleteclub(event){
      const axiosConfig = {
        headers:{
          Authorization : `Token ${this.$cookies.get('auth-token')}`
        },
      }
      event.preventDefault()
      axios.delete(`${BACK_URL}/accounts/clubs/`+this.$route.params.ID+'/',axiosConfig)
      // this.$router.push({name:'Home'})
    }, 
    clubimage(){
      this.club_image = this.$refs.file.files[0]
    },
  },
  created(){
    this.getclub()
  },
}
</script>

<style>

</style>