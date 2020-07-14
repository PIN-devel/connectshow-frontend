<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="clubname">Club name</label>
        <input type="text" class="form-control" id="clubname" aria-describedby="clubnamehelper" v-model="clubdata.club_name">
        <small id="clubnamehelper" class="form-text text-muted">...</small>
      </div>
      <div class="form-group">
          <label for="exampleFormControlFile1">club_image</label>
          <input type="file" id="file" ref="file" v-on:change="clubimage()"/>
      </div>
      <div class="form-group">
        <label for="description">description</label>
        <input type="text" class="form-control" id="description" aria-describedby="descriptionhelper" v-model="clubdata.description">
        <small id="descriptionhelper" class="form-text text-muted">...</small>
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="createclub">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
const BACK_URL = 'http://127.0.0.1:8000'

export default {
    name:"ClubCreate",
    data(){
      return{
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
      .then(()=>{
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    clubimage(){
      this.clubdata.club_image = this.$refs.file.files[0]
    },
  }
}
</script>

<style>

</style>