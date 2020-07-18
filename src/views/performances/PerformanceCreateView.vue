<template>
  <div class="container">
    <form>
      <!-- title -->
      <div class="form-group">
        <label for="title">제목</label>
        <b-form-input :id="`type-${'title'}`" :type="'title'" v-model="performance.title"></b-form-input>
      </div>
      <!-- start_date -->
      <div class="form-group">
        <label for="example-datepicker">상영 시작 날짜</label>
        <b-form-datepicker id="example-datepicker" v-model="performance.start_date" class="mb-2"></b-form-datepicker>
      </div>
      <!-- end_date -->
      <div class="form-group">
        <label for="example-datepicker">종영날짜</label>
        <b-form-datepicker id="example-datepicker" v-model="performance.end_date" class="mb-2"></b-form-datepicker>
      </div>
      <!-- running_time -->
      <div class="form-group">
        <label for="running_time">공연시간(분)</label>
        <b-form-input :id="`type-${'number'}`" :type="'number'" v-model="performance.running_time"></b-form-input>
      </div>
      <!-- time -->
      <div class="form-group">
        <label for="time">상영시간</label>
        <b-form-input :id="`type-${'title'}`" :type="'title'" v-model="performance.time"></b-form-input>
        <small id="titlehelper" class="form-text text-muted">ex)매주 수요일 19:00</small>
      </div>
      <div class="form-group">
        <label for="non_user_name">출연자</label>
        <div>{{clubMembers}}</div>
        <div>non user cast: {{performance.non_user_names}}</div>
        <div>user cast: {{performance.user_ids}}</div>
        <PerformanceCreateButton
          v-for="member in clubMembers"
          :key="member.id"
          :user="member"
          @add-member-id="addMemberId"
          @delete-member-id="deleteMemberId"
        />
        <b-form-input :id="`type-${'title'}`" :type="'title'" v-model="non_user_name"></b-form-input>
        <button @click.prevent="addNonUserName">+</button>
        <small id="titlehelper" class="form-text text-muted"></small>
      </div>
      <!-- poster_image -->
      <div class="form-group">
        <label for="exampleFormControlFile1">포스터</label>
        <b-form-file type="file" id="file" ref="file" v-on:change="performanceimage()"></b-form-file>
      </div>
      <!-- description -->
      <div class="form-group">
        <label for="description">상세정보</label>
        <wysiwyg v-model="performance.description" />
      </div>
      <!-- url -->
      <div class="form-group">
        <label for="url">URL</label>
        <b-form-input :id="`type-${'url'}`" :type="'url'" v-model="performance.url"></b-form-input>
      </div>
    </form>
    <button type="submit" class="btn btn-primary" @click="createperformance">Submit</button>
  </div>
</template>

<script>
import axios from "axios";
import PerformanceCreateButton from "../../components/performances/PerformanceCreateCastButton";
const BACK_URL = "http://127.0.0.1:8000";

export default {
  name: "PerformanceCreate",
  components: {
    PerformanceCreateButton
  },
  data() {
    return {
      performance: {
        title: "",
        start_date: "",
        end_date: "",
        running_time: "",
        time: "",
        poster_image: "",
        description: "",
        url: "",
        category_id: 1,
        club_id: 2,
        non_user_names: [],
        user_ids: []
      },
      non_user_name: "",
      clubMembers: []
    };
  },
  methods: {
    fetchClubMember() {
      const config = {
        headers: {
          Authorization: `Token ${this.$cookies.get("auth-token")}`
        }
      };
      axios
        .get(`${BACK_URL}/accounts/clubs/${this.$route.params.clubId}/`, config)
        .then(res => (this.clubMembers = res.data.data.club_members))
        .catch(err => console.log(err));
    },
    addMemberId(Id) {
      this.performance.user_ids.push(Id);
    },
    deleteMemberId(Id) {
      const idx = this.performance.user_ids.indexOf(Id);
      this.performance.user_ids.splice(idx, 1);
    },
    createperformance() {
      const axiosConfig = {
        headers: {
          Authorization: `Token ${this.$cookies.get("auth-token")}`
        }
      };
      let performancedata = new FormData();
      performancedata.append("title", this.performance.title);
      performancedata.append("start_date", this.performance.start_date);
      performancedata.append("end_date", this.performance.end_date);
      performancedata.append("running_time", this.performance.running_time);
      performancedata.append("time", this.performance.time);
      //performancedata.append('poster_image',this.performance.poster_image)
      // performancedata.append('description',this.performance.description)
      performancedata.append("url", this.performance.url);
      performancedata.append("category_id", this.performance.category_id);
      performancedata.append("club_id", this.performance.club_id);
      axios
        .post(`${BACK_URL}/performances/`, performancedata, axiosConfig)
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    },
    performanceimage() {
      this.performance.poster_image = this.$refs.file.files[0];
    },
    addNonUserName() {
      if (this.non_user_name !== "") {
        this.performance.non_user_names.push(this.non_user_name);
        this.non_user_name = "";
      }
    }
  },
  created() {
    this.fetchClubMember();
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>