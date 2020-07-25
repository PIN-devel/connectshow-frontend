<template>
  <div class="d-flex justify-content-center my-5">
      <ul class="list-group list-group-horizontal-md">
        <li class="list-group-item category-btn" @click="sendCategory(1)">음악/콘서트</li>
        <li class="list-group-item category-btn" @click="sendCategory(2)">뮤지컬/오페라</li>
        <li class="list-group-item category-btn" @click="sendCategory(3)">연극</li>
        <li class="list-group-item category-btn" @click="sendCategory(4)">국악</li>
        <li class="list-group-item category-btn" @click="sendCategory(5)">무용/발레</li>
        <li class="list-group-item category-btn" @click="sendCategory(6)">아동/가족</li>
        <li class="list-group-item category-btn" @click="sendCategory(7)">전시</li>
        <li class="list-group-item category-btn" @click="sendCategory(8)">기타</li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'Categories',
    data() {
        return {
            categories: {
                concert: true,
                musical: true,
                play: true,
                koreaTraditional: true,
                dance: true,
                famaily: true,
                exhibition: true,
                etc: true
            }
        }
    },
    methods: {
        sendCategory(id) {
            this.$emit('select-category', id)
        }
    }
}
</script>

<style scoped>
    .category-btn:hover{
        background-color: rgb(235, 233, 233);
        cursor: pointer;
    }
</style>