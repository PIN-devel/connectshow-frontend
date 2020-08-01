<template>
  <div
    class="modal fade"
    :id="'performance-'+performanceId"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header w-100 d-flex justify-content-between">
          <h5 class="modal-title" id="exampleModalLabel">{{performance.title}}</h5>
          <span class="badge badge-secondary">{{performance.category.name}}</span>
          <div v-for="club in performance.clubs" :key="club.id">
            <SimpleProfile :profileImage="club.club_image" :profileName="club.club_name" />
          </div>
          <a :href="performance.url" class="btn btn-outline-secondary btn-sm">보러가기</a>
          <StarRating
            :item-size="20"
            :read-only="true"
            :rating="performance.avg_rank"
            :show-rating="false"
          />
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-6 modal-scroll">
              <img :src="'http://127.0.0.1:8000'+performance.poster_image" alt class="w-100" />
              <p>{{performance.start_date}}~{{performance.end_date}} {{performance.time}}</p>
              <p>상영시간 : {{performance.running_time}}분</p>
              <p>
                출연자 :
                <a
                  href
                  v-for="user in performance.cast.user"
                  :key="user.user_id"
                >{{user.username}},</a>
                <span
                  v-for="non_user in performance.cast.non_user"
                  :key="non_user.username"
                >{{non_user.username}},</span>
              </p>
              <div class="description" v-html="performance.description" style="white-space:normal"></div>
            </div>

            <div class="col-6 modal-scroll">
              <ReviewInputForm state="create" @review-create="reviewCreate" />
              <Review
                v-for="review in reviews"
                :key="review.id"
                :review="review"
                @review-delete="reviewDelete"
                @review-update="reviewUpdate"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { StarRating } from "vue-rate-it";

import Review from "./Review";
import ReviewInputForm from "./ReviewInputForm";
import SimpleProfile from "../SimpleProfile";

const SERVER_URL = "http://127.0.0.1:8000/";

export default {
  name: "PerformanceDetail",
  props: {
    performanceId: Number,
  },
  components: {
    Review,
    ReviewInputForm,
    SimpleProfile,
    StarRating,
  },
  data() {
    return {
      performance: {},
      reviews: [],
    };
  },
  methods: {
    fetchPerformance() {
      axios
        .get(`${SERVER_URL}performances/${this.performanceId}/`)
        .then((res) => {
          this.performance = res.data.data;
        })
        .catch((err) => console.log(err));
    },
    fetchReviews() {
      axios
        .get(`${SERVER_URL}performances/${this.performanceId}/reviews/`)
        .then((res) => {
          this.reviews = res.data.data;
        })
        .catch((err) => console.log(err));
    },
    reviewCreate(reviewData) {
      console.log(reviewData);
      const config = {
        headers: {
          Authorization: `Token ${this.$cookies.get("auth-token")}`,
        },
      };
      axios
        .post(
          `${SERVER_URL}performances/${this.performanceId}/reviews/`,
          reviewData,
          config
        )
        .then((res) => {
          this.reviews.push(res.data.data);
          reviewData.content = "";
          reviewData.point = 0;
          this.performance.avg_rank = res.data.avg;
        })
        .catch((err) => console.log(err));
    },
    reviewDelete(reviewId, avgRank) {
      const tmpForIdx = this.reviews.find(function (item) {
        return item.id == reviewId;
      });
      const idx = this.reviews.indexOf(tmpForIdx);
      this.reviews.splice(idx, 1);
      this.performance.avg_rank = avgRank;
    },
    reviewUpdate(avgRank) {
      this.performance.avg_rank = avgRank;
    },
  },
  created() {
    this.fetchPerformance();
    this.fetchReviews();
  },
};
</script>
<style scoped>
.description {
  word-break: break-all;
}
.modal-scroll {
  overflow: auto;
  height: 600px;
}
</style>
