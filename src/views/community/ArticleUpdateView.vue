<template>
    <div class="container">
        <form>
            <h1 class="d-flex">Article edit</h1>
            <hr>
            <div class="row">
                <!-- right column -->
                <div class="col-md-7">
                <h3 class="d-flex">article info</h3>
                <hr>
                <br>
                <div role="form">
                    <div class="form-group d-flex flex-row">
                    <label class="col-lg-3 control-label">title</label>
                    <div class="col-lg-8">
                        <input type="text" class="form-control" id="article_title" v-model="title">
                    </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                    <label class="col-lg-3 control-label">description</label>
                    <div class="col-lg-8">
                         <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="내용을 입력해 주세요" rows="3" v-model="content"></textarea>
                    </div>
                    </div>
                </div>
            </div>
               <!-- left column -->
                <div class="col-md-3">
                <div class="text-center">
                    <div class="form-group">
                        <!-- <img v-if="!flag" class="profile" :src="show_image" alt="profile_image"> -->
                        <img v-if="!flag" :src="show_image" class="img-fluid" alt="Responsive image">
                        <!-- <img v-if="flag" class="profile" :src="change_image" alt="profile_image"> -->
                        <img v-if="flag" :src="change_image" class="img-fluid" alt="Responsive image">
                        <br>
                        <hr>
                        <h6 class="d-flex">article image</h6>
                        <input type="file" id="file" ref="file" @change="articleImage()"/>
                    </div>
                </div>
                </div>
        </div>
        <hr>
        <button type="submit" class="btn btn-primary mr-3" @click="updateArticle">수정</button>
        <button type="submit" class="btn btn-danger" @click="deleteArticle">삭제</button>        
        </form>
    </div>
</template>

<script>
import axios from 'axios'
const BACK_URL = 'http://127.0.0.1:8000'
export default {
    name:"ArticleUpdateView",
    data(){
      return{
        flag:false,
        show_image:'',
        change_image:'',
        title:"",
        image:"",
        content:"",
        currentuser:"",
        user:"",
        clubid:"",
        }
    },
    methods:{
        checklogin(){
            if (!(this.$session.get('jwt'))){
                this.$alert(" 로그인을 해주세요")
                this.$router.push({name:'Home'})                
            }
        },
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

        getArticle(){ 
            axios.get(`${BACK_URL}/community/articles/`+this.$route.params.articleId+'/')
            .then((reaponse)=>{
                this.title = reaponse.data.data.title
                this.show_image = BACK_URL+reaponse.data.data.image
                this.content = reaponse.data.data.content
                this.user = reaponse.data.data.user.username
                this.clubid = reaponse.data.data.club
                console.log(this.clubid)
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
          const formData = new FormData()
            formData.append('title',this.title)
            formData.append('content',this.content)
            if (this.$refs.file.files[0]!==undefined){
              formData.append('image',this.image)
            }
            axios.put(`${BACK_URL}/community/articles/`+this.$route.params.articleId+'/',formData,axiosConfig)
            .then(()=>{
                console.log()
                this.$router.push({ name: 'ClubDetailView', params: { clubId: this.clubid }})
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
            axios.delete(`${BACK_URL}/community/articles/`+this.$route.params.articleId+'/',axiosConfig)
            .then((response)=>{
                console.log(response)
                this.$router.push({ name: 'ClubDetailView', params: { clubId: this.clubid }})
                this.$alert('삭제 완료')
            })
            .catch((err)=>{
                console.log(err)
            })
        },

        articleImage(){
            this.image = this.$refs.file.files[0]
            this.change_image = URL.createObjectURL(this.image)
            this.flag = true
        },
    },
    created(){
        this.getArticle()
        this.checklogin()
    },
}
</script>

<style>

</style>