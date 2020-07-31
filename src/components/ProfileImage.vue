<template>
    <div>
        <b-avatar class="hovereffect" variant="secondary" :src="'http://127.0.0.1:8000'+profileImage" size="6rem"></b-avatar>
    </div>
</template>

<script>
export default {
    name:'ProfileImage',
    props:{
        profileImage:String,
    }
}
</script>

<style>
.hovereffect {
    cursor: pointer;
}
</style>