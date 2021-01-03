

<script>
import { Doughnut } from 'vue-chartjs'
 
export default {
  props:{
    bookings: Array
  },
  extends: Doughnut,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['name', 'Funny', 'Educational'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#cc65fe'
        ],
          data: [this.booking.trip.name, this.booking.user.name, this.booking.status,]
        }
      ]
    })
  }
}


</script>

