<template>

  <section v-if="!user.isGuide" class="user-details">
    <img
      class="guide-preview-img profile-img-l "
      :src="require('@/assets/img/users/' + user.profileImgUrl)"
    />
   
    <h2 user-titles>Hi {{ user.name }}, Welcome Back</h2>
    <br />
    <h3 class="user-titles">Favorite Trips</h3>
    <trip-list v-if="user" :trips="user.favoriteTrips" @emitFav="toggleFav" />
    <hr />
    <h3 class="user-titles">Your Bookings</h3>
    <div class="card-grid" v-if="bookingToShow">
      <div
        class="flex column"
        v-for="booking in bookingToShow"
        :key="booking._id"
      >
        <booking-list :booking="booking" :key="booking._id" />
      </div>
    </div>
    <hr />
  </section>
</template>

<script>
import { userService } from "../services/user-service.js";
import { bookingService } from "../services/booking-service.js";
import tripList from "../cmps/trip/trip-list.cmp.vue";
import bookingList from "../cmps/basic/booking-list.vue";

export default {
  name: "user-details",
  data() {
    return {
      user: null,
      filterdBookings: null,
    };
  },

  methods: {
    toggleFav(trip) {
      this.$store.dispatch({
        type: "toggleFavs",
        trip,
      });
    },
  },
  computed: {
    bookingToShow() {
      const bookings = this.$store.getters.bookings;
      return bookings.filter((booking) => booking.user._id === this.user._id);
    },
  },
  created() {
    this.user = this.$store.getters.loggedinUser;
    

    this.$store.dispatch({
      type: "loadBookings",
    });
  },
  components: {
    tripList,
    bookingList,
  },
};
</script>
