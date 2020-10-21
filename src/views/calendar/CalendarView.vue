<template>
    <div class="container">
      <!-- Category 선택 -->
      <h2 class="my-4">Calendar</h2>
      <div class="title-line-divider"></div>
      <div class="select-box">
        <vue-single-select
          placeholder="카테고리 선택"
          you-want-to-select-a-post="ok"
          v-model="category"
          out-of-all-these-posts="makes sense"
          :options="categories"
          the-post-has-a-title="make sure to show these"
          option-label="title"
          >
        </vue-single-select>
      </div>
      <!-- Calendar -->
      <vue-calendar
          :show-limit="3"
          :events="events"

          @show-all="showAll"
          @event-clicked="eventClicked"
          @month-changed="monthChanged">
      </vue-calendar>
      <h3 class="mt-4">{{ year }}년 {{ month }}월 <span v-if="date">{{ date }}일</span></h3>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-outline-dark mr-3"
          @click="fetchMonthData">
          <i class="far fa-calendar-alt"></i> 전체보기
        </button>
      </div>
      <!-- Table 나열 -->
      <div v-if="performances" class="mt-3">
        <CalendarTable v-for="category in categories" 
          :key="category.id" :category="category" 
          :performances="performances"/>
      </div>
      <div v-if="performances.length == 0" class="mt-3">
        <h3><i class="fas fa-exclamation-circle"></i> 해당 날짜에 공연이 없습니다.</h3>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import CalendarTable from '@/components/calendar/CalendarTable.vue'
import VueSingleSelect from "vue-single-select"

const SERVER_URL = 'http://localhost:8000'

export default {
  name: "CalenderView",
  data() {
    return {
      data: [],
      events: [],
      categories: [
        {title: "음악/콘서트", id: 1, bool: true}, 
        {title: "뮤지컬/오페라", id: 2, bool: true},
        {title: "연극", id: 3, bool: true},
        {title: "국악", id: 4, bool: true},
        {title: "무용/발레", id: 5, bool: true},
        {title: "아동/가족", id: 6, bool: true},
        {title: "전시", id: 7, bool: true},
        {title: "기타", id: 8, bool: true},
      ],
      category: '',
      year: '',
      month: '',
      date: '',
      performances: [],
    }
  },
  components: {
    VueSingleSelect,
    CalendarTable,
  },
  methods: {
    showAll(events) {
      console.log(events)
    },
    dayClicked(day) {
      this.year = day.date.getFullYear()
      this.month = day.date.getMonth() + 1
      this.date = day.date.getDate()

      var month = this.changeToString(this.month)
      var date = this.changeToString(this.date)

      this.fetchDateData(month, date)
    },
    eventClicked(event) {
      var month = event.start.slice(5, 7)
      var date = event.start.slice(8, 10)
      console.log(month, date)
      this.fetchDateData(month, date)
    },
    monthChanged(start, end) {
      this.year = start.getFullYear()
      this.month = end.getMonth() + 1
      this.fetchMonthData()
    },
    selectCategory() {
      if (this.category) {
        this.setFalseCategories()
        this.category.bool = true
      } else {
        this.setTrueCategories()
      }
      this.fetchMonthData()
    },
    setFalseCategories(){
      this.categories.forEach(category => category.bool=false)
    },
    setTrueCategories(){
      this.categories.forEach(category => category.bool=true)
    },
    changeToString(number){
      var str = ''
      if (number < 10) {
        str = '0' + number.toString()
      } else {
        str = number.toString()
      }
      return str
    },
    fetchMonthData(){
      var month = this.changeToString(this.month)
      var category_id = ''
      this.date = ''
      if (this.category) {
        category_id = this.category.id
      } else {
        category_id = ''
      }

      axios.get(SERVER_URL + '/performances/calendar/', {params:{
          category_id: category_id,
          year: this.year,
          month: month,
        }})
        .then(res => {
          this.performances = res.data.data.performances
          this.countPerformances(res.data.data.month_count)
          })
        .catch(err => console.log(err))

    },
    fetchDateData(month, date) {
      var category_id = ''

      if (this.category) {
        category_id = this.category.id
      } else {
        category_id = ''
      }

      axios.get(SERVER_URL + '/performances/calendar/', {params:{
          category_id: category_id,
          year: this.year,
          month: month,
          date: date,
        }})
        .then(res => {
          this.performances = res.data.data.performances
          })
        .catch(err => console.log(err))
    },
    countPerformances(month_count) {
      var month = this.changeToString(this.month)
      this.events = []
      for (const [key, value] of Object.entries(month_count)) {
        if (key.slice(5, 7) === month){
          var context = {
            start : key,
            title :  value+'건',
          }
          this.events.push(context)
        }
      }
    }
  },
  created() {
    this.$calendar.eventBus.$on("show-all", events => this.showAll(events));
    this.$calendar.eventBus.$on("day-clicked", day => this.dayClicked(day));
    this.$calendar.eventBus.$on('event-clicked', event => this.eventClicked(event));
    // this.$calendar.eventBus.$on('month-changed', (start, end) => this.monthChanged(start, end));
  },
  watch: {
    category() {
      this.selectCategory()
    }
  },
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.select-box {
  width: 200px;
}
.title-line-divider {
  width: 80px;
  border-top: 4px solid #FF8A3D;
  margin: 0 auto;
  margin-bottom: 50px;
}
</style>