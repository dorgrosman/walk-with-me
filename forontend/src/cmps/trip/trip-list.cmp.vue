<template>
  <section class="trip-list card-grid">
    <trip-preview
      v-for="trip in sortedTrips"
      :key="trip._id"
      :tripId="trip._id"
      @emitFav="emitFav"
      @click="goToDetails(trip._id)"
    >
    </trip-preview>
  </section>
</template>

<script>
import tripPreview from "./trip-preview.cmp.vue";

export default {
  props: {
    trips: {
      type: Array,
      required: true,
    },
  },

  name: "trip-list",

  components: {
    tripPreview,
  },
  computed: {
      sortedTrips() {
      return _.orderBy(this.trips, 'date', 'asc' )
    }
  },
  methods: {
    emitFav(trip) {
      this.$emit("emitFav", trip);
    },

    goToDetails(id) {
      router.push({ name: "trip", params: { id } });
    },
  },
};
</script>

<style>
</style>