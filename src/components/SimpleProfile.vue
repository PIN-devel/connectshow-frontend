<template>
    <div>
        <img :src="'http://127.0.0.1:8000'+profileImage" alt="" class="profile-image rounded-circle">
        {{profileName}}
    </div>
</template>

<script>
export default {
    name:'SimpleProfile',
    props:{
        profileImage:String,
        profileName:String,
    }
}
</script>

<style>
.profile-image{
  width: 30px;
}
</style>