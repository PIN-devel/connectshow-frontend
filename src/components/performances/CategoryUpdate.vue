<template>
  <div>
        <!-- <b-form-group label="">
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
        </b-form-group>         -->
      <!-- <button @click="changecategory">관심 카테고리 정보 수정</button> -->
          <div class="form-group">
            <b-form-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="updatecategories">
                <b-form-checkbox class="category-button m-2" :value="1" @click="inputcategory">음악/콘서트</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="updatecategories">
                <b-form-checkbox class="category-button  m-2" :value="2" @click="inputcategory">뮤지컬/오페라</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="updatecategories">
                <b-form-checkbox class="category-button  m-2" :value="3" @click="inputcategory">연극</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="updatecategories">
                <b-form-checkbox class="category-button m-2" :value="4" @click="inputcategory">국악</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="updatecategories">
                <b-form-checkbox class="category-button m-2" :value="5" @click="inputcategory">무용/발레</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="updatecategories">
                <b-form-checkbox class="category-button m-2" :value="6" @click="inputcategory">아동/가족</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="updatecategories">
                <b-form-checkbox class="category-button m-2" :value="7" @click="inputcategory">전시</b-form-checkbox>
            </b-form-checkbox-group>
            <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="updatecategories">
                <b-form-checkbox class="category-button m-2" :value="8" @click="inputcategory">기타</b-form-checkbox>
            </b-form-checkbox-group>
            </b-form-group>
          </div>
      <button class="btn btn-outline-primary" @click="changecategory">관심 장르 수정</button>

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
        axios.put(`${BACK_URL}/performances/category/`,this.updatecategories,axiosConfig)
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