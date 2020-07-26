<template>
  <div class="container">
    <form>
        <h1 class="d-flex">Club create</h1>
        <hr>
        <div class="row">
            <!-- left column -->
            <div class="col-md-3">
              <div class="text-center">
                <div class="form-group">
                    <!-- <img v-if="!flag" class="profile" :src="show_image" alt="profile_image"> -->
                    <b-avatar v-if="!flag" :src="show_image" size="10rem"></b-avatar>
                    <!-- <img v-if="flag" class="profile" :src="change_image" alt="profile_image"> -->
                    <b-avatar  v-if="flag" :src="change_image" size="10rem"></b-avatar>
                    <br>
                    <hr>
                    <h6 class="d-flex">club image</h6>
                    <input type="file" id="file" ref="file" @change="clubimage()"/>
                </div>
              </div>
            </div>
            <!-- right column -->
            <div class="col-md-7">
              <h3 class="d-flex">Club info</h3>
              <hr>
              <br>
              <div role="form">
                <div class="form-group d-flex flex-row">
                  <label class="col-lg-3 control-label">club name</label>
                  <div class="col-lg-8">
                    <input type="text" class="form-control" id="club_name" v-model="club_name">
                  </div>
                </div>
                <div class="form-group d-flex flex-row">
                  <label class="col-lg-3 control-label">description</label>
                  <div class="col-lg-8">
                    <input type="text" class="form-control" id="club_description" v-model="description">
                  </div>
                </div>
            </div>
          </div>
      </div>
      <hr>
      <button type="submit" class="btn btn-primary d-flex flex-row ml-auto" @click="updateclub">Submit</button>
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
      change_image:null,
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
      this.change_image = URL.createObjectURL(this.club_image)
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