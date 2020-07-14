<template>
  <div class="text-left">
    <div class="text-right" v-if="!isMaster">
      <!-- <button class="raise" @click="createPerformance">Create</button> -->
      <!-- <button class="btn btn-lg btn-info">+</button> -->
      <button type="button" @click="createPerformance" class="btn3d btn btn-default btn-lg"><span class="glyphicon glyphicon-download-alt"></span>+</button>
    </div>
    <ClubPerformanceItem v-for="performance in performances" :key="`performance-${performance.id}`" :performance="performance" :isMaster="isMaster"/>
  </div>
</template>

<script>
import axios from 'axios'
import ClubPerformanceItem from '@/components/ClubPerformanceItem'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'ClubPerformances',
  components: {
    ClubPerformanceItem
  },
  props: {
    isMaster: Boolean,
  },
  data(){
    return {
      performances: [],
    }
  },
  methods: {
    getPerformances(){
      const club_id = this.$route.params.clubId
      axios.get(BACK_URL + `/performances/club/${club_id}`)
        .then((res) => {
          this.performances = res.data.data
        })
        .catch((err) => {console.log(err.response.data)})
    },
    createPerformance(){
      // router push
    },
  },
  created(){
    this.getPerformances()
  }
}
</script>

<style scoped>
/* .raise {
  color: #19bc8b;
  background: none;
  border: 2px solid;
  font: inherit;
  line-height: 1;
  margin: 0.5em;
  padding: 1em 2em;
}
.raise:hover,
.raise:focus {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  transform: translateY(-0.25em);
  color: #107e5d;
}


button{
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
}

button:focus {
  outline: none !important;
}
.btn {
  border-radius: 2px;
  border: 0;
  transition: .2s ease-out;
  color: #fff;
  margin: 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.btn:hover {
  color: #fff;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
}

.btn:active, .btn:focus, .btn.active {
  outline: 0;
  color: #fff;
}
.btn-info {
  background: #33b5e5;
}
.btn-info:hover, .btn-info:focus {
  background-color: #4abde8 !important;
}
.btn-info.active {
  background-color: #14799e !important;
} */

</style>