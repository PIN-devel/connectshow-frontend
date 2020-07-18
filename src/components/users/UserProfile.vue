<template>
  <div class="row my-5">
    <div class="col-2 box">
      <img class="profile" src="https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png" alt="profile_image">
    </div>
    <div class="col-10 text-left my-auto">
      <h3>{{ user.username }}</h3>
      <h6>{{ user.email }}</h6>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserProfile',
  props: {
    user: Object,
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style>
</style>