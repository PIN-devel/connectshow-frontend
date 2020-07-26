<template>
<div class="container">
    <h1>Club List</h1>
    <div class="d-flex flex-row-reverse">
    <button class="btn btn-info mb-5" @click="clubCreate">club create</button>
    </div>
    <ClubSearch @search-clubs="searchClubs"/>
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
</div>
</template>

<script>
import axios from 'axios'
const BACK_URL = 'http://127.0.0.1:8000'

import ClubSearch from '@/components/clubs/ClubSearch.vue'
import ClubsListitems from '@/components/clubs/ClubsListitems.vue'

export default {
    name:'ClubIndexView',
    components:{
        ClubsListitems,
        ClubSearch
    },
    data(){
        return{
            Clubs:[],
        }
    },
    methods:{
        getClubs(){
            axios.get(`${BACK_URL}/accounts/clubs/`)
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
        axios.get(`${BACK_URL}/accounts/clubs/`,axiosConfig)
            .then(response => {
                console.log(response)
            const resultclubs = response.data.data.filter(data => data.club_name.includes(keyword))
            this.Clubs = resultclubs
            })
        .catch((err)=>{
            console.error(err)
        })             
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