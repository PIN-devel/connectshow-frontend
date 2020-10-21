<template>
<div>
  <footer id="sticky-footer" class="bg-dark text-white-50 fixed-bottom">
    <div class="container text-center">
      <small>Copyright &copy; Connect Show</small>
    </div>
  </footer>
</div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
#sticky-footer {
  /* flex-shrink: none; */
  bottom: 0;
  opacity: 0.5;
}

</style>