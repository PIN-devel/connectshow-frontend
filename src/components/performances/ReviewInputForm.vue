<template>
  <div>
    <b-form-rating
      id="rating-inline"
      inline
      v-model="reviewData.point"
      variant="warning"
      class="w-75"
      no-border="true"
    ></b-form-rating>
    <div class="d-flex">
      <input
        v-model="reviewData.content"
        @keypress.enter="reviewCU"
        type="text"
        class="form-control m-3"
        placeholder="Write a review"
      />
      <i class="far fa-paper-plane fa-lg my-auto cursor px-2" @click="reviewCU"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewInputForm",
  props: {
    performanceId: Number,
    state: String,
    text: String,
    point: [Number, String],
  },
  components: {},
  data() {
    return {
      reviewData: {
        point: 0,
        content: "",
      },
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
    },
  },
  created() {
    this.fetchForm();
  },
};
</script>

<style>
</style>