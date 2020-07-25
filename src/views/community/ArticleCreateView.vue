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
        <button type="submit" class="btn btn-primary" @click="createArticle">Submit</button>
    </div>
</template>

<script>
import axios from 'axios'

const BACK_URL = 'http://127.0.0.1:8000'

export default {
    name:"ArticleCreateView",
    data(){
        return{
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
        this.checklogin
    }
}
</script>

<style>

</style>