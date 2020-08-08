<template>
  <div class="d-flex flex-row">
    <input class="form-control" v-model="keyword" @keypress.enter="searchClub" type="Search" placeholder="Search Club name" aria-label="Search">
    <button class="btn" style="background-color: #FF8A3E; color:white;" type="button" @click="searchClub"><i class="fas fa-search" ></i></button>
  </div>
</template>

<script>
export default {
    name:"ClubSearch",
    data: function () {
        return {
            keyword: '',
        }
    },
    methods: {
        searchClub: function () {
        if (!this.keyword.trim()){
            this.$alert('클럽 이름을 입력해주세요!')
        } else {
            this.$emit('search-clubs', this.keyword.trim())
            this.keyword=''
        }
        }
    },
}
</script>

<style>

</style>