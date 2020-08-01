<template>
  <ul class="list-group p-3">
    <div class="list-group-item">
      <div class="row">
        <div class="col-4 d-flex">
          <b-avatar variant="secondary" :src="profileImage" size="2.5rem"></b-avatar>
          <h6 class="my-auto font-weight-bold mr-2">{{ review.user.username }}</h6>
        </div>
        <div class="col-8">
          <b-form-rating
            id="rating-inline"
            inline
            v-model="review.point"
            readonly
            variant="warning"
            class="w-75"
            no-border="true"
          ></b-form-rating>
        </div>
      </div>

      <div class="row w-100">
        <div class="col-7">
          <p>{{ review.content }}</p>
        </div>
        <div class="col-5">
          <button class="btn btn-link" @click="reviewDelete">삭제</button>
        </div>
        <!-- <div class="col-10 pl-2" style="word-break:break-all">
          <div class="d-flex flex-wrap justify-content-between">
            <div class="ml-auto">
              <button class="btn btn-link" @click="reviewDelete">삭제</button>
            </div>
          </div>
        <p>{{ review.content }}</p>-->
        <!-- <span class="text-secondary">{{ review.updated_at }}</span> -->
        <!-- <hr> -->
      </div>
    </div>
  </ul>
  <!-- </div>
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
  </div>-->
</template>

<script>
import axios from "axios";
// import { StarRating } from "vue-rate-it";

// import SimpleProfile from "../SimpleProfile";
// import ReviewInputForm from "./ReviewInputForm";

const SERVER_URL = "http://127.0.0.1:8000/";

export default {
  name: "Review",
  props: {
    review: Object,
  },
  components: {
    // SimpleProfile,
    // ReviewInputForm,
    // StarRating,
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