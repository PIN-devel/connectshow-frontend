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
      isChecked: false
    };
  },
  methods: {
    checked() {
      this.isChecked = !this.isChecked;
      this.isChecked ? this.addMemberId() : this.deleteMemberId();
    },
    addMemberId() {
      this.$emit("add-member-id", this.user.id);
    },
    deleteMemberId() {
      this.$emit("delete-member-id", this.user.id);
    }
  }
};
</script>

<style>
</style>