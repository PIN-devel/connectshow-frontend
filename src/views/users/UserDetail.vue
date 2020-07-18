<template>
  <div>
    <UserProfile :user="user" class="container m-5"/>
    <div>
      <ul class="nav nav-tabs nav-justified md-tabs indigo" id="myTabJust" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="des-tab-just" data-toggle="tab" href="#des-just" role="tab" aria-controls="des-just"
            aria-selected="true">내 활동</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="perf-tab-just" data-toggle="tab" href="#perf-just" role="tab" aria-controls="perf-just"
            aria-selected="false">좋아요한 작품</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="community-tab-just" data-toggle="tab" href="#community-just" role="tab" aria-controls="community-just"
            aria-selected="false">팔로우한 클럽</a>
        </li>
      </ul>

      <div class="tab-content pt-5" id="myTabContentJust">
        <UserActivity :user="user" class="tab-pane fade show active container" id="des-just" role="tabpanel" aria-labelledby="des-tab-just"/>
        <UserLikeList :userLike="user.like_performances" class="tab-pane fade container" id="perf-just" role="tabpanel" aria-labelledby="perf-tab-just"/>
        <UserFollowList :userFollow="user.follow_clubs" class="tab-pane fade container" id="community-just" role="tabpanel" aria-labelledby="community-tab-just"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserProfile from '@/components/users/UserProfile.vue'
import UserActivity from '@/components/users/UserActivity.vue'
import UserLikeList from '@/components/users/UserLikeList.vue'
import UserFollowList from '@/components/users/UserFollowList'

import axios from 'axios'

const BACK_URL = 'http://localhost:8000'

export default {
  name: 'UserDetail',
  components: {
		UserProfile,
		UserActivity,
		UserLikeList,
    UserFollowList,
  },
  data(){
    return {
      user: null,
    }
  },
  methods: {
    getInfo(){
      const user_id = this.$route.params.userId
      axios.get(BACK_URL + `/accounts/${user_id}/`)
        .then((res) => {
					this.user = res.data.data
					})
				.catch((err) => { console.log(err.response.data) })
    },
  },
  created(){
    this.getInfo()
  },
}
</script>
