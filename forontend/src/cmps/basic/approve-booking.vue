<template>
<tr>
          <td scope="row">{{ booking.trip.name }}</td>
          <td>{{ booking.user.name }}</td>
          <td>{{ booking.peopleToSign }}</td>
          <td>{{ booking.specialReq }}</td>
          <td>{{ booking.status }}</td>
          <td> {{ getDateString }} </td>
          <td>
            <button class="action" :class="{active: isApproved}" @click="approveBooking(booking)">
              Accept
            </button>
            <button class="approve-btn" @click.stop="removeBooking(booking)">
              Decline
            </button>
          </td>
        </tr>
</template>

<script>


export default {
    name: "approve-booking",
    props: {
        booking: {
            type: Object
        }
    },
    data() {
        return {
            isApproved: false
        }
    },
 
  computed: {
   getDateString(trip) {
      var date = new Date(this.booking.trip.date);
      return date.toLocaleDateString("en-GB");
    },
  },

  methods: {
    approveBooking(booking) {
      if (booking.status === "pending") {
        booking.status = "approved";
        this.isApproved = true
      } else {
        booking.status = "pending";
        this.isApproved = false
      }
      this.$store.dispatch({
        type: "updateBooking",
        booking,
      });
    },
    removeBooking(booking) {
      this.$store.dispatch({
        type: "removeBooking",
        booking,
      }),
        this.$store.dispatch({
          type: "loadBookings",
        });
    },
    approveBtn() {
      this.isApproved = !this.isApproved
    }
  }
};
</script>

<style></style>
