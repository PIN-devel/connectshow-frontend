<template>
    <div class="border-bottom shadow-sm mb-3">
      <div class="row w-100">
        <div class="col-2 p-0 pl-3">
          <b-avatar variant="secondary" :src="profileImage" size="2.5rem" ></b-avatar>
        </div>

        <div class="col-2 p-0 m-0">
          <h6 class="font-weight-bold" style="line-height: 40px;">{{ review.user.username }}</h6>
        </div>

        <div class="col-7 p-0">
          <b-form-rating
            id="rating-inline"
            inline
            v-model="review.point"
            readonly
            variant="warning"
            class="p-0"
            no-border="true"
          ></b-form-rating>
        </div>
      </div>

      <div class="row w-100">
        <div class="col-1"></div>
        <div class="col-9 text-left p-0">
          <p style="word-break: break-all;">{{ review.content }}</p>
        </div>
        <div class="col-1 d-flex align-items-end p-0">
          <button class="btn text-muted" @click="reviewDelete"><i class="far fa-trash-alt"></i></button>
        </div>

      </div>
    </div>

</template>

<script>
import axios from "axios";

const SERVER_URL = "http://127.0.0.1:8000/";

export default {
  name: "Review",
  props: {
    review: Object,
  },
  data() {
    return {
      updateState: false,
    };
  },

  methods: {
    reviewDelete() {
      const config = {
        headers: {
          Authorization: `Token ${this.$cookies.get("auth-token")}`,
        },
      };
      const reviewId = this.review.id;
      axios
        .delete(`${SERVER_URL}performances/reviews/${reviewId}/`, config)
        .then((res) => {
          const avgRank = res.data.avg;
          this.$emit("review-delete", reviewId, avgRank);
        })
        .catch((err) => console.log(err));
    },
    reviewUpdateToggle() {
      this.updateState = !this.updateState;
    },
    reviewUpdate(reviewData) {
      const config = {
        headers: {
          Authorization: `Token ${this.$cookies.get("auth-token")}`,
        },
      };
      const reviewId = this.review.id;
      axios
        .put(
          `${SERVER_URL}performances/reviews/${reviewId}/`,
          reviewData,
          config
        )
        .then((res) => {
          const avgRank = res.data.avg;
          this.$emit("review-update", avgRank);
        })
        .catch((err) => console.log(err));
      this.updateState = false;
      this.review.content = reviewData.content;
      this.review.point = reviewData.point;
    },
  },
};
</script>

<style>
</style>