<template>
<div class="container">
    <h1>Club List</h1>
    <div class="d-flex flex-row-reverse">
    <button class="btn btn-info mb-5" @click="clubCreate">club create</button>
    </div>
    <ClubSearch @search-clubs="searchClubs"/>
    <div class="d-flex flex-row-reverse" v-if="searchFlag">
        <button class="btn btn-info my-3" @click="getClubs">클럽전체보기</button>
    </div>
    <table class="table table-hover mt-3">
        <thead>
            <tr>
            <th scope="col">club image</th>
            <th scope="col">club name</th>
            <th scope="col">club description</th>
            <th scope="col">club master</th>
            </tr>
        </thead>
        <tbody v-for="club in Clubs" :key="club.name">
            <ClubsListitems :club="club"/>
        </tbody>
    </table>
        <scroll-top
        :locationX="locationX"
        :locationY="locationY"
        :dataX="dataX"
        :dataY="dataY"
        :text="text"
        @click="goscroll" 
        />
        <div class="my-5">
            <div v-if="searchFlag">
                <p class="my-5">No results :)</p>
            </div>
            <div v-if="!searchFlag">
                <infinite-loading  class="my-5" v-if="Clubs.length" @infinite="infiniteHandler"></infinite-loading>
            </div>
        </div>
</div>
</template>

<script>
import axios from 'axios'
const BACK_URL = 'http://127.0.0.1:8000'

import ClubSearch from '@/components/clubs/ClubSearch.vue'
import ClubsListitems from '@/components/clubs/ClubsListitems.vue'
import InfiniteLoading from 'vue-infinite-loading'
import ScrollTop from 'vue-slim-scrolltop';



export default {
    name:'ClubIndexView',
    components:{
        ClubsListitems,
        ClubSearch,
        InfiniteLoading,
        ScrollTop,
    },
    data(){
        return{
            Clubs:[],
            page: 1,
            searchFlag:false,
            locationX: 'left',
            locationY: 'bottom',
            dataX: '',
            dataY: '',
            text: 'Scroll to Top (Custom Text)',
        }
    },
    methods:{
        goscroll(){
            console.log(456789123)
            setTimeout(() => {
                this.dataX = '',
                this.dataY = ''
            }, 1000);
            console.log(this.dataX)
        },
        getClubs(){
            this.searchFlag = false
            const options = {params: {_page: this.page}}
            axios.get(`${BACK_URL}/accounts/clubs/`,options)
                .then((response)=>{
                    this.Clubs = response.data.data
                })
                .catch((err)=>{
                    console.error(err)
                }) 
        },

        searchClubs(keyword) {
            const axiosConfig = {
                headers:{
                Authorization : `Token ${this.$cookies.get('auth-token')}`
                },
            }
            axios.get(`${BACK_URL}/accounts/clubs/search/`,axiosConfig)
                .then(response => {
                    console.log('검색결과',response)
                    this.searchFlag = true
                    const resultclubs = response.data.data.filter(data => data.club_name.includes(keyword))
                    this.Clubs = resultclubs
                })
                .catch((err)=>{
                    console.error(err)
                })             
        },

        infiniteHandler($state) {
            if (!this.searchFlag){
                const options = {params: {_page: this.page+1}}
                axios.get(`${BACK_URL}/accounts/clubs/`,options)
                    .then(( response ) => {
                        if (response.data.data.length) {
                            setTimeout(()=>{
                                this.page += 1;
                                this.Clubs.push(...response.data.data);
                                $state.loaded();
                            }, 1000);
                        } else {
                        $state.complete();
                        }
                    })
                    .catch((err) => {
                        console.log(err.response.data)
                        $state.complete();
                    })
            }
        },
        clubCreate(){
            this.$router.push({ name: 'ClubCreateView'})
        },
    },
    created(){
        this.getClubs()
    }
}
</script>

<style>

</style>