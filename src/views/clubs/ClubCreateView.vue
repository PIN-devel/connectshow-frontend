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
                    <input type="text" class="form-control" id="club_name" v-model="clubdata.club_name">
                  </div>
                </div>
                <div class="form-group d-flex flex-row">
                  <label class="col-lg-3 control-label">description</label>
                  <div class="col-lg-8">
                    <input type="text" class="form-control" id="club_description" v-model="clubdata.description">
                  </div>
                </div>
            </div>
          </div>
      </div>
      <hr>
      <button type="submit" class="btn btn-primary d-flex flex-row ml-auto" @click.prevent="createclub">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
const BACK_URL = 'http://127.0.0.1:8000'

export default {
    name:"ClubCreateView",
    data(){
      return{
        flag:false,
        show_image:'',
        change_image:'',
      clubdata:{
        club_name:'',
        description:'',
        club_image:'',
      },
      }
    },
    methods:{
      createclub(event){
      event.preventDefault()
      const axiosConfig = {
        headers:{
          Authorization : `Token ${this.$cookies.get('auth-token')}`
        },
      }
      let clubdata = new FormData()
      clubdata.append('club_image',this.clubdata.club_image)
      clubdata.append('club_name',this.clubdata.club_name)
      clubdata.append('description',this.clubdata.description)
      axios.post(`${BACK_URL}/accounts/clubs/`,clubdata,axiosConfig)
      .then((response)=>{
        this.$alert("클럽생성 완료:)")
        this.$router.push({ name: 'ClubDetailView', params: { clubId: response.data.data.id }})
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    clubimage(){
      this.clubdata.club_image = this.$refs.file.files[0]
      this.change_image = URL.createObjectURL(this.clubdata.club_image)
      this.flag = true
    },
  }
}
</script>

<style>

</style>