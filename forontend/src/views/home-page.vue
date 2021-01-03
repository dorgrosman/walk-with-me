<template>
  <section class="home-page">
    <div class="trips-by flex space-between">
      <h3>Trips Across Europe</h3>
      <button
        class="go-to-all-btn action"
        @click="updateFilterPage('region', 'Europe')"
      >
        See All
      </button>
    </div>
    <trip-list :trips="europeTripsForDisplay" @emitFav="toggleFav" />

    <div class="trips-by flex space-between">
      <h3>Trips Across America</h3>
      <button
        class="go-to-all-btn action"
        @click="updateFilterPage('region', 'USA')"
      >
        See All
      </button>
    </div>
    <trip-list :trips="usaTripsForDisplay" @emitFav="toggleFav" />

    <div class="trips-by flex space-between">
      <h3>Top City Trips</h3>
      <button
        class="see-all-mountain-btn action"
        @click="updateFilterPage('type', 'city')"
      >
        See All
      </button>
    </div>
    <trip-list :trips="cityTripsForDisplay" @emitFav="toggleFav" />

    <div class="trips-by flex space-between">
      <h3>Top Mountain Trips</h3>
      <button
        class="go-to-all-btn action"
        @click="updateFilterPage('type', 'mountain')"
      >
        See All
      </button>
    </div>
    <trip-list :trips="mountainTripsForDisplay" @emitFav="toggleFav" />
    <div class="trips-by flex space-between">
      <h3>Top Forest Trips</h3>
      <button
        class="go-to-all-btn action"
        @click="updateFilterPage('type', 'forest')"
      >
        See All
      </button>
    </div>
    <trip-list :trips="forestTripsForDisplay" @emitFav="toggleFav" />

    <div class="flex justify-center align-center">
      <button class="see-all-btn action" @click="goToAllTrips()">
        See All Trips
      </button>
    </div>

    <h3>Our Most Active Guides</h3>
    <guide-list :guides="guidesForDisplay" />
  </section>
</template>

<script>
import tripFilter from "../cmps/trip/trip-filter.cmp.vue";
import tripList from "../cmps/trip/trip-list.cmp.vue";
import guideList from "../cmps/guide/guide-list.cmp.vue";
// import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "home-page",
  data() {
    return {
      // isLoading: false,
      fullPage: true,
      user: null,
      filterBy: {
        name: "",
        type: "",
        location: "",
        region: "",
      },
    };
  },
  methods: {
    updateFilterPage(prop, term) {
      this.filterBy[prop] = term;
      this.$store.commit({ type: "setFilterBy", filterBy: this.filterBy });
      this.$router.push("/trip");
    },
    updateFilter(filterBy) {
      this.$store.commit({ type: "setFilterBy", filterBy });
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
    goToAllTrips() {
      // this.isLoading = true;

      // setTimeout(() => {
      // this.isLoading = false;
      // }, 2000);
      this.$router.push("/trip");
    },
    // onCancel() {
    // console.log("User cancelled the loader.");
    // },
  },
  computed: {
    mountainTripsForDisplay() {
      return this.$store.getters.mountainTripsForDisplay;
    },
    forestTripsForDisplay() {
      return this.$store.getters.forestTripsForDisplay;
    },
    seaTripsForDisplay() {
      return this.$store.getters.seaTripsForDisplay;
    },
    cityTripsForDisplay() {
      return this.$store.getters.cityTripsForDisplay;
    },
    difficultTripsForDisplay() {
      return this.$store.getters.difficultTripsForDisplay;
    },
    europeTripsForDisplay() {
      return this.$store.getters.europeTripsForDisplay;
    },
    usaTripsForDisplay() {
      return this.$store.getters.usaTripsForDisplay;
    },
    guidesForDisplay() {
      return this.$store.getters.guidesForDisplay;
    },
  },
  components: {
    tripList,
    guideList,
    // Loading,
  },
  created() {
    this.$store.commit({
      type: "setFilterBy",
      filterBy: { name: "", type: "", location: "", region: "" },
    });
    // this.isLoading = true;
    // this.$router.push("/trip");

    this.$store.dispatch({
      type: "loadTrips",
    });
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 2000);
    this.$store.dispatch({
      type: "loadUsers",
    });
    this.user = this.$store.getters.loggedinUser;
  },
  mounted() {
    this.user = this.$store.getters.loggedinUser;
  },
};
</script>
