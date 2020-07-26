<template>
    <div class="container">
        <form>
            <h1 class="d-flex">Article create</h1>
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
                        <img v-if="!flag" src="'http://127.0.0.1:8000media/images/article_default_image.png'" class="img-fluid" alt="Responsive image">
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
        <button type="submit" class="btn btn-primary d-flex flex-row ml-auto" @click="createArticle">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

const BACK_URL = 'http://127.0.0.1:8000'

export default {
    name:"ArticleCreateView",
    data(){
        return{
            flag:false,
            show_image:'',
            change_image:'',
            title:"",
            image:"",
            content:"",
        }
    },
    methods:{
        checklogin(){
            if (!(this.$session.get('jwt'))){
                this.$alert(" 로그인을 해주세요")
                this.$router.push('/login')

            }
        },

        createArticle(event){
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
            axios.post(`${BACK_URL}/community/${this.$route.params.clubId}/`,data,axiosConfig)
            .then(()=>{
                // history.back()
                this.$router.push({ name: 'ClubDetailView', params: { clubId: `${this.$route.params.clubId}` }})
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
        this.checklogin
    }
}
</script>

<style>

</style>