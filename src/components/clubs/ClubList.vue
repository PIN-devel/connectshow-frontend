<template>
<div>
    <div v-for="club in Clubs" :key="club.name">
        <ClubsListitems :club="club"/>
    </div>
</div>
</template>

<script>
import axios from 'axios'
const BACK_URL = 'http://127.0.0.1:8000'

import ClubsListitems from '@/components/clubs/ClubsListitems.vue'
export default {
    name:'ClubList',
    components:{
        ClubsListitems,
    },
    data(){
        return{
            Clubs:[]
        }
    },
    methods:{
        getClubs(){
            const axiosConfig = {
                headers:{
                Authorization : `Token ${this.$cookies.get('auth-token')}`
                },
            }
            axios.get(`${BACK_URL}/accounts/clubs/`,axiosConfig)
            .then((response)=>{
                this.Clubs = response.data.data
            })
            .catch((err)=>{
                console.error(err)
            }) 
        }
    },
    created(){
        this.getClubs()
    }
}
</script>

<style>

</style>