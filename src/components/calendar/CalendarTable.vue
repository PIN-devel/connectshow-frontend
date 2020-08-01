<template>
    <div class="container mt-2">
        <div v-if="category.bool">
            <div v-if="selectedPerformances.length" class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title text-left">{{ category.title }}</h5>
                    <table class="table">
                        <colgroup>
                            <col span="1" style="width: 35%;">
                            <col span="1" style="width: 50%;">
                            <col span="1" style="width: 15%;">
                        </colgroup>
                        <tbody>
                            <tr v-for="selectedPerformance in selectedPerformances" 
                                :key="selectedPerformance.id">
                                <td class="text-left performance-title"
                                    data-toggle="modal" :data-target="'#performance-'+selectedPerformance.id">
                                    {{ selectedPerformance.title }}</td>
                                <td>{{ selectedPerformance.start_date }} ~ {{ selectedPerformance.end_date }}</td>
                                <td @click="moveToClubPage(selectedPerformance.clubs[0].id)" class="performance-title">
                                    {{ selectedPerformance.clubs[0].club_name }}
                                <!-- <SimpleProfile :profileImage="selectedPerformance.clubs[0].club_image" 
                                    :profileName="selectedPerformance.clubs[0].club_name" />  -->
                                </td>                            
                                <PerformanceDetail :performanceId="selectedPerformance.id"/>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button v-if="result.length > 5" class="btn" @click="changeMoreButton">
                            <i v-if="moreBtn" class="fas fa-angle-down fa-2x text-muted"></i>
                            <i v-if="!moreBtn" class="fas fa-angle-up fa-2x text-muted"></i>
                        </button>
                    </div>
                </div> 
            </div>
        </div> 
    </div>
</template>

<script>
// import SimpleProfile from '@/components/SimpleProfile'
import PerformanceDetail from '../performances/PerformanceDetail'

export default {
    name: 'CalendarTable',
    components: {
        PerformanceDetail,
        // SimpleProfile,
    },
    data() {
        return {
            result: [],
            moreBtn: true,
        }
    },
    props: {
        category : Object,
        performances: Array,
    },
    methods: {
        getPerformances() {
            this.result = []
            this.performances.forEach(performance => {
                if (performance.category.id === this.category.id) {
                    this.result.push(performance)
                }
            })
        },
        changeMoreButton() {
            if (this.moreBtn) {
                this.moreBtn = false
            } else {
                this.moreBtn = true
            }
        },
        moveToClubPage(clubId){
			this.$router.push({ name: 'ClubDetailView', params: { 'clubId': clubId } })
		},
    },
    computed: {
        selectedPerformances() {
            this.getPerformances()
            var performanceList = []
            if (this.moreBtn) {
                performanceList = this.result.slice(0, 5)
            } else {
                performanceList = this.result
            }
            return performanceList
        }
    },
}
</script>

<style scoped>
.performance-title:hover {
    cursor: pointer;
}
</style>