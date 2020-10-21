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
        <div class="modal-header">
          <div class="d-flex w-100 justify-content-between">
            <div>
              <h5
                class="modal-title"
                id="exampleModalLabel"
                style="display:inline"
              >{{performance.title}}</h5>
              <i class="fas fa-star ml-3" style="color:#FFD400"></i>
              {{performance.avg_rank}}
            </div>
            <div>
              <a :href="performance.url" class="btn btn-outline-danger btn-sm"><i class="far fa-play-circle"></i> 보러가기</a>
            </div>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-7  p-0">
                <div class="w-100" style="background-color: #f8f9fa;">

                <img :src="'http://127.0.0.1:8000'+performance.poster_image" style="height: 400px; width: auto;" />
                </div>
                <div class="modal-scroll1">

                  <div class="row w-100 px-3 py-1">
                    <div class="col-2 p-0">기간</div>
                    <div class="col-1 p-0">:</div>
                    <div
                      class="col-9 p-0 text-left"
                    >{{performance.start_date}} ~ {{performance.end_date}}</div>
                  </div>
                  <div class="row w-100 px-3 py-1">
                    <div class="col-2 p-0">공연 시간</div>
                    <div class="col-1 p-0">:</div>
                    <div class="col-9 p-0 text-left">{{performance.time}}</div>
                  </div>
                  <div class="row w-100 px-3 py-1">
                    <div class="col-2 p-0">관람 시간</div>
                    <div class="col-1 p-0">:</div>
                    <div class="col-9 p-0 text-left">{{performance.running_time}} 분</div>
                  </div>
                  <div class="row w-100 px-3 py-1">
                    <div class="col-2 p-0">클럽</div>
                    <div class="col-1 p-0">:</div>
                    <div class="col-9 p-0 text-left">
                      <div v-for="club in performance.clubs" :key="club.id">
                        <SimpleProfile :profileImage="club.club_image" :profileName="club.club_name" />
                      </div>
                    </div>
                  </div>
                  <div class="row w-100 px-3 py-1">
                    <div class="col-2 p-0">출연</div>
                    <div class="col-1 p-0">:</div>
                    <div class="col-9 p-0 text-left">
                      <a
                        href
                        v-for="user in performance.cast.user"
                        :key="user.user_id"
                      >{{user.username}},</a>
                      <span
                        v-for="non_user in performance.cast.non_user"
                        :key="non_user.username"
                      >{{non_user.username}},</span>
                    </div>
                  </div>
                  <div class="row w-100 px-3 py-1">
                    <div class="col-2 p-0">장르</div>
                    <div class="col-1 p-0">:</div>
                    <div class="col-9 p-0 text-left">
                      <span class="badge badge-primary">{{performance.category.name}}</span>
                    </div>
                  </div>
                  <div class="row w-100 px-3 py-1">
                    <div class="col-2 p-0">설명</div>
                    <div class="col-1 p-0">:</div>
                    <div class="col-9 p-0 text-left">
                      <div
                        class="description"
                        v-html="performance.description"
                        style="white-space:normal"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-5 p-0">
                <div class="modal-scroll2">
                  <Review
                    v-for="review in reviews"
                    :key="review.id"
                    :review="review"
                    @review-delete="reviewDelete"
                    @review-update="reviewUpdate"
                  />
                </div>
                <ReviewInputForm state="create" @review-create="reviewCreate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
.modal-scroll1 {
  overflow: auto;
  height: 200px;
}
.modal-scroll2 {
  overflow: auto;
  height: 500px;
}
.modal-scroll1::-webkit-scrollbar,
.modal-scroll2::-webkit-scrollbar {
  display:none;
}
</style>
