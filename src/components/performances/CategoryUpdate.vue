<template>
  <div>
        <b-form-group label="">
        <b-form-checkbox-group id="checkbox-group-2" v-model="updatecategories" name="flavour-2">
            <b-form-checkbox :value="1" @click="inputcategory">1</b-form-checkbox>
            <b-form-checkbox :value="2" @click="inputcategory">2</b-form-checkbox>
            <b-form-checkbox :value="3" @click="inputcategory">3</b-form-checkbox>
            <b-form-checkbox :value="4" @click="inputcategory">4</b-form-checkbox>
            <b-form-checkbox :value="5" @click="inputcategory">5</b-form-checkbox>
            <b-form-checkbox :value="6" @click="inputcategory">6</b-form-checkbox>
            <b-form-checkbox :value="7" @click="inputcategory">7</b-form-checkbox>
            <b-form-checkbox :value="8" @click="inputcategory">8</b-form-checkbox>
        </b-form-checkbox-group>
        </b-form-group>        
      <button @click="changecategory">관심 카테고리 정보 수정</button>
  </div>
</template>

<script>
import axios from 'axios'
const BACK_URL = 'http://127.0.0.1:8000'

export default {
    name:"CategoryUpdate",
    data(){
        return{
            // categories:['음악/콘서트','뮤지컬,오페라','연극','국악','무용/발레','아동/가족','전시','기타'],
            updatecategories:[],
        }
    },
    methods:{
        changecategory2(data){
            this.$emit("emitchangcategory",data),
            this.updatecategories=[]
        },
        inputcategory(event){
            this.updatecategories.push(event.target.value)
        },
        changecategory(){
            console.log(this.updatecategories)
            const axiosConfig = {
            headers:{
                Authorization: `Token ${this.$cookies.get('auth-token')}`,
            }
        }
        axios.put(`${BACK_URL}/performances/categoty/`,this.updatecategories,axiosConfig)
        .then((response)=>{
            this.changecategory2(response)
        })
        .catch((err)=>{
            console.log(err)
        })
        },
    }
}
</script>

<style>

</style>