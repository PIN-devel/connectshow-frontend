<template>
    <div class="container">
      
      <div class="row">
          <PerformanceListItem v-for="performance in performances" :key="performance.id" :performance="performance"/>
        </div>
    </div>
</template>

<script>
import PerformanceListItem from '@/components/PerformanceListItem.vue'

export default {
    name: 'PerformanceList',
    components: {
        PerformanceListItem,
    },
    data() {
        return {
            }
    },
    props: {
        performances: Array,
    },
    methods: {
        
    },
}
</script>

<style>

</style>