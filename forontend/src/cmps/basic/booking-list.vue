<template>
  <section class="booking-list">
    <div class="flex column">
      <trip-preview
        v-for="trip in tripsToShow"
        :key="trip._id"
        :tripId="trip._id"
        @emitFav="emitFav"
        @click="goToDetails(trip._id)"
      >
      </trip-preview>
      <button @click.stop="removeBooking(booking)">Cancel</button>
    </div>
  </section>
</template>

<script>
import tripPreview from "../trip/trip-preview.cmp.vue";
export default {
  name: "booking-list",
  props: {
    booking: {
      type: Object,
    },
  },
  data() {
    return {
      isApproved: false,
    };
  },
  components: {
    // tripList,
    tripPreview,
  },

  computed: {
    tripsToShow() {
      const trips = this.$store.getters.tripsForDisplay;

      const filteredTrips = trips.filter((trip) => trip._id === this.booking.trip._id);
      return filteredTrips
    },
  },

  methods: {
    removeBooking(booking) {
      this.$store.dispatch({
        type: "removeBooking",
        booking: this.booking
      })
    },
    
    toggleFav(trip) {
      this.$store.dispatch({
        type: "toggleFavs",
        trip,
      });
    },
    emitFav(trip) {
      this.$emit("emitFav", trip);
    },
  },
  created(){
  }
};
</script>

<style></style>
