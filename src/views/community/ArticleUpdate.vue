<template>
    <div>
        <div class="form-group">
        <label for="title">title</label>
        <input class="form-control" type="text" placeholder="제목을 입력하세요" v-model="title">
        </div>
        <div class="form-group">
            <label for="exampleFormControlFile1">club_image</label>
            <input type="file" id="file" ref="file" v-on:change="articleImage()"/>
        </div>
        <div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Example textarea</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="내용을 입력해 주세요" rows="3" v-model="content"></textarea>
        </div>
        </div>
        <button type="submit" class="btn btn-primary" @click="updateArticle">수정</button>
        <button type="submit" class="btn btn-primary" @click="deleteArticle">삭제</button>
    </div>
</template>

<script>
import axios from 'axios'
const BACK_URL = 'http://127.0.0.1:8000'
export default {
    name:"ArticleUpdate",
    data(){
      return{
        title:"",
        image:"",
        content:"",
        currentuser:"",
        user:"",
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
                    // this.$router.push({name:'Home'})
                }  
                })
                .catch((err)=>{
                console.error(err)
                })
        },

        getArticle(){ 
            axios.get(`${BACK_URL}/community/articles/`+this.$route.params.articleID+'/')
            .then((reaponse)=>{
                this.title = reaponse.data.data.title
                this.image = reaponse.data.data.image
                this.content = reaponse.data.data.content
                this.user = reaponse.data.data.user.username
                this.getuser()
            })
            .catch((err)=>{
                console.error(err)
            })
        },

        updateArticle(event){
            event.preventDefault()
            const axiosConfig = {
            headers:{
                Authorization : `Token ${this.$cookies.get('auth-token')}`
            },
        }
            let data = new FormData()
            data.append('title',this.title)
            data.append('content',this.content)
            data.append('image',this.image)
            axios.put(`${BACK_URL}/community/articles/`+this.$route.params.articleID+'/',data,axiosConfig)
            .then((response)=>{
                console.log(response)
            // this.$router.push({name:'ClubDetail',params:this.$route.params.ID})
            })
            .catch((err)=>{
                console.log(err)
            })
        },

        deleteArticle(event){
            const axiosConfig = {
                headers:{
                Authorization : `Token ${this.$cookies.get('auth-token')}`
                },
            }
            event.preventDefault()
            axios.delete(`${BACK_URL}/community/articles/`+this.$route.params.articleID+'/',axiosConfig)
            .then((response)=>{
                console.log(response)
            // this.$router.push({name:'Home'})
            })
            .catch((err)=>{
                console.log(err)
            })
        },

        articleImage(){
            this.image = this.$refs.file.files[0]
        },
    },
    created(){
        this.getArticle()
    },
}
</script>

<style>

</style>