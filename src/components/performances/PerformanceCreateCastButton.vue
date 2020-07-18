<template>
  <button @click.prevent="checked">{{user.id}}</button>
</template>

<script>
export default {
  name: "PerformanceCreateButton",
  props: {
    user: Object
  },
  data() {
    return {
      isChecked: false,
      userId: -1
    };
  },
  methods: {
    checked() {
      this.isChecked = !this.isChecked;
      this.isChecked ? this.addId() : this.deleteId();
    },
    addId() {
      console.log("add");
    },
    deleteId() {
      console.log("delete");
    }
  }
};
</script>

<style>
</style>