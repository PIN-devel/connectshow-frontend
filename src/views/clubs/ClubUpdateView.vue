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
          <img v-if="!flag" class="profile" :src="show_image" alt="profile_image">
          <img v-if="flag" class="profile" :src="img_url" alt="profile_image">
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
      flag:false,
      img_url:null,
      show_image:null,
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
          this.user = reaponse.data.data.club_detail.master.username
          this.show_image = BACK_URL+reaponse.data.data.club_detail.club_image
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
          const formData = new FormData()
            formData.append('club_name',this.club_name)
            formData.append('description',this.description)
            if (this.$refs.file.files[0]!==undefined){
              formData.append('club_image',this.club_image)
            }
        axios.put(`${BACK_URL}/accounts/clubs/`+this.$route.params.ID+'/',formData,axiosConfig)
        .then((response)=>{
          this.$alert("수정완료:)")
          console.log(response)
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
      this.$router.push({name:'Home'})
    }, 
    clubimage(){
      this.club_image = this.$refs.file.files[0]
      this.img_url = URL.createObjectURL(this.club_image)
      this.flag = true
    },
  },
  created(){
    this.getclub()
  },
  watch:{
    show_image(){},
    img_url(){}
  }
}
</script>

<style>

</style>