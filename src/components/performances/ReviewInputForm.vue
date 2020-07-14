<template>
  <div>
    <input type="text" v-model="reviewData.content" />
    <br />

    <StarRating :item-size="20" v-model="reviewData.point" :show-rating="false" />
    <button @click="reviewCU">작성</button>
  </div>
</template>

<script>
import { StarRating } from "vue-rate-it";

export default {
  name: "ReviewInputForm",
  props: {
    performanceId: Number,
    state: String,
    text: String,
    point: [Number, String]
  },
  components: {
    StarRating
  },
  data() {
    return {
      reviewData: {
        point: 0,
        content: ""
      }
    };
  },
  methods: {
    reviewCU() {
      this.state === "create"
        ? this.$emit("review-create", this.reviewData)
        : this.$emit("review-update", this.reviewData);
    },
    fetchForm() {
      this.reviewData.content = this.text;
      this.reviewData.point = this.point;
    }
  },
  created() {
    this.fetchForm();
  }
};
</script>

<style>
</style>