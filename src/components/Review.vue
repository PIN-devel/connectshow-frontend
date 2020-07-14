<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item">
        <SimpleProfile
          :profileName="review.user.username"
          :profileImage="review.user.profile_image"
        />

        <StarRating :read-only="true" :item-size="20" :rating="review.point" :show-rating="false" />
        <button @click="reviewUpdateToggle">수정</button>
        <button @click="reviewDelete">삭제</button>
      </li>
      <li class="list-group-item">
        <span v-if="!updateState">{{review.content}}</span>
        <div v-if="updateState">
          <ReviewInputForm
            state="update"
            :text="review.content"
            :point="review.point"
            @review-update="reviewUpdate"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { StarRating } from "vue-rate-it";

import SimpleProfile from "../components/SimpleProfile";
import ReviewInputForm from "../components/ReviewInputForm";

const SERVER_URL = "http://127.0.0.1:8000/";
const config = {
  headers: {
    Authorization: "Token 408305f8635afd8decafeca9d25ca13268324ca1"
  }
};

export default {
  name: "Review",
  props: {
    review: Object
  },
  components: {
    SimpleProfile,
    ReviewInputForm,
    StarRating
  },
  data() {
    return {
      updateState: false
    };
  },

  methods: {
    reviewDelete() {
      const reviewId = this.review.id;
      axios
        .delete(`${SERVER_URL}performances/reviews/${reviewId}/`, config)
        .then(res => console.log(res))
        .catch(err => console.log(err));
      this.$emit("review-delete", reviewId);
    },
    reviewUpdateToggle() {
      this.updateState = !this.updateState;
    },
    reviewUpdate(reviewData) {
      const reviewId = this.review.id;
      axios
        .put(
          `${SERVER_URL}performances/reviews/${reviewId}/`,
          reviewData,
          config
        )
        .then(res => console.log(res))
        .catch(err => console.log(err));
      this.updateState = false;
      this.review.content = reviewData.content;
      this.review.point = reviewData.point;
    }
  }
};
</script>

<style>
</style>