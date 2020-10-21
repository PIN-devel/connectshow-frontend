<template>
  <div class="row buttons d-flex justify-content-around">
      <button class="col-2 btn-hover color-2" @click="sendCategory(1)">음악/콘서트</button>
      <button class="col-2 btn-hover color-2" @click="sendCategory(2)">뮤지컬/오페라</button>
      <button class="col-2 btn-hover color-2" @click="sendCategory(3)">연극</button>
      <button class="col-2 btn-hover color-2" @click="sendCategory(4)">국악</button>    
      <button class="col-2 btn-hover color-2" @click="sendCategory(5)">무용/발레</button>
      <button class="col-2 btn-hover color-2" @click="sendCategory(6)">아동/가족</button>
      <button class="col-2 btn-hover color-2" @click="sendCategory(7)">전시</button>
      <button class="col-2 btn-hover color-2" @click="sendCategory(8)">기타</button>
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
* {
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
}

.buttons {
  /* margin: 10%; */
  /* margin-left: 50px;
  margin-right: 50px; */
  text-align: center;
}

.btn-hover {
  width: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 10px 20px;
  height: 40px;
  text-align:center;
  border: none;
  background-size: 300% 100%;
  border-radius: 20px;
  /* moz-transition: all .4s ease-in-out; */
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  /* moz-transition: all .4s ease-in-out; */
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}
.btn-hover.color-2 {
  background-image: linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19);
  box-shadow: 0 4px 15px 0 rgba(229, 66, 10, 0.75);
}

</style>