<template>
    <div class="container">
        <vue-calendar
            :show-limit="3"
            @show-all="showAll"
            @event-clicked="eventClicked"
            @month-changed="monthChanged"
        ></vue-calendar>
    </div>
</template>

<script>
export default {
    name: "CalenderView",
  data() {
    return {
      data: []
    };
  },
  methods: {
    showAll(events) {
        console.log(events)
    },
    dayClicked(day) {
      console.log(day);

    },
    eventClicked(event) {
        console.log(event)
    },
    monthChanged(start, end) {
        console.log(start, end)
    }
  },
  created() {
    this.$calendar.eventBus.$on("show-all", events => this.showAll(events));
    this.$calendar.eventBus.$on("day-clicked", day => this.dayClicked(day));
  }

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
</style>