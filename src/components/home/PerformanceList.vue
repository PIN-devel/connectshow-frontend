<template>

        <div class="container p-3 genre-div">
            <div class="row justify-content-center">
                <PerformanceListItem v-for="performance in performances" 
                :key="performance.id" :performance="performance"/>
            </div>
    </div>
      
    <!-- <div class="row">
          <PerformanceListItem v-for="performance in performances" 
            :key="performance.id" :performance="performance"/>
    </div> -->
</template>

<script>
import PerformanceListItem from '@/components/home/PerformanceListItem.vue'

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