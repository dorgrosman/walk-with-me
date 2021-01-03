<template>
  <section class="all-trips-list">
    <h1>All Trips</h1>
    <trip-filter @filterBy="updateFilter" :trips="tripsForDisplay" />
    <trip-list
      class="all-trips-list-container wrap"
      :trips="tripsForDisplay"
      @emitFav="toggleFav"
    />
  </section>
</template>

<script>
import { userService } from "../services/user-service.js";
import { bookingService } from "../services/booking-service.js";
import tripList from "../cmps/trip/trip-list.cmp.vue";
import tripFilter from "../cmps/trip/trip-filter.cmp.vue";

export default {
  name: "all-trips-list",
  data() {
    return {};
  },

  methods: {
    updateFilter(filterBy) {
       this.$store.commit({
      type: "setFilterBy",
        filterBy,
      });

      this.$store.dispatch({
        type: "loadTrips",
      });
    },
    toggleFav(trip) {
      this.$store.dispatch({
        type: "toggleFavs",
        trip,
      });
    },
  },
  computed: {
    tripsForDisplay() {
      const allTrips = this.$store.getters.tripsForDisplay;
      return allTrips
    },
  },
  created() {
    this.$store.dispatch({
      type: "loadTrips",
    });
  },
  components: {
    tripList,
    tripFilter,
  },
};
</script>