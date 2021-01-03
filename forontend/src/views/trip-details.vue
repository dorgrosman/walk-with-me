<template>
  <section v-if="trip" class="trip-details">
    <div class="img-container">
      <img
        v-for="n in 4"
        :key="n"
        class="trip-img"
        :src="require('../assets/img/trips/' + trip.imgUrls[n - 1])"
      />
    </div>
    <h1>{{ trip.name }}</h1>

    <div class="main-grid">
      <div class="start">
        <div class="info-trip">
          <h3>
            <i class="fas fa-user-friends"></i> {{ trip.totalBooked }}/10 signed
          </h3>
          <h3>
            <i class="fas fa-dumbbell"></i> Difficulty: {{ trip.difficulty }}/5
          </h3>
          <h3><i class="fas fa-hourglass"></i> {{ trip.duration }}</h3>
          <h3><i class="fas fa-map-marked"></i> {{ trip.region }}</h3>
        </div>

        <div class="about-trip">
          <p v-for="(desc, idx) in this.trip.description" :key="idx">
            {{ desc }}
          </p>
        </div>
        <!-- <h2>Upcoming Trips</h2>
        <div class="upcoming-trips" v-for="n in 3" :key="n">
          <p @click="getTripDate(getDateString[n - 1])">{{ getDateString[n - 1] }}</p>
        </div> -->

        <div v-if="somebodyBooked" class="booked-by">
          <h3>Already Booked:</h3>
          <!-- need to add if -->
          <ul>
            <li
              v-for="booking in this.filterdBookings"
              :key="booking._id"
              class="user-booked flex"
            >
              <img
                class="trip-details-guide-img profile-img-s"
                :src="require('@/assets/img/users/' + booking.user.imgUrl)"
              />
              <p>
                <span class="bold">{{ booking.user.name }}</span> -
                {{ booking.peopleToSign }} Tickets Booked
              </p>
            </li>
          </ul>
        </div>

        <div class="map">
          <h3>Where To</h3>
          <GmapMap
            :center="mapPos"
            :zoom="12"
            map-type-id="terrain"
            style="
              width: 100%;
              height: 400px;
              border-radius: 10px;
              overflow: hidden;
            "
          >
            <GmapMarker
              :position="mapPos"
              :clickable="true"
              :draggable="true"
              @click="center = mapPos"
            />
          </GmapMap>
        </div>
      </div>

      <div class="end">
        <h2>{{ bookedMsg }}</h2>
        <trip-book :trip="trip" :user="loggedInUser" @bookTrip="bookTrip" />
        <div class="about-guide">
          <h2>Meet Your Guide</h2>
          <guide-preview :guide="this.guide" />
          <guide-review :guideId="trip.aboutGuide._id" :user="loggedInUser" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { tripService } from "../services/trip-service.js";
import { userService } from "../services/user-service.js";
import guideReview from "../cmps/review/guide-review.cmp.vue";
import guidePreview from "../cmps/guide/guide-preview.cmp.vue";
import tripBook from "../cmps/trip/trip-book.cmp.vue";

export default {
  name: "trip-details",
  data() {
    return {
      trip: null,
      mapPos: null,
      filterdBookings: null,
      isBooked: false,
      guide: null,
      user: null,
      dateTrip: null,
      somebodyBooked: true,
    };
  },

  methods: {
    bookTrip(booking) {
      // booking.datePicked = this.dateTrip
      this.$store.dispatch({ type: "addBooking", booking });
      let totalPplBooked = booking.trip.totalBooked;

      const peopleToSign = booking.peopleToSign;
      totalPplBooked += peopleToSign;
      this.trip.totalBooked = totalPplBooked;
      this.$store.dispatch({ type: "saveTrip", trip: this.trip });
    },
    getBookingByUser(user) {
      const bookings = this.$store.getters.bookings;
      const filteredBookingsByUser = bookings.filter(
        (booking) => booking.user._id === user._id
      );

      filteredBookingsByUser.some((booking) => {
        if (booking.trip.name === this.trip.name) {
          return (this.isBooked = true);
        }
      });
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    bookedMsg() {
      if (!this.isBooked && this.trip.totalBooked < 10) {
        return "Come & Join The Trip ";
      } else if (this.getBookingByUser === false) {
        return "Sorry, We're Fully Booked";
      } else return "You've Already Booked This Trip";
    },
  },
  async created() {
    const tripId = this.$route.params.id;
    const trip = await tripService.getTripById(tripId);
    this.trip = trip;
    this.mapPos = this.trip.latlang;
    this.guide = await userService.getUserById(this.trip.aboutGuide._id);

    this.$store.dispatch({
      type: "loadBookings",
    });

    const bookings = this.$store.getters.bookings;
    const filteredBookingsByTrip = bookings.filter(
      (booking) => booking.trip._id === tripId
    );
    this.filterdBookings = filteredBookingsByTrip;
    if (this.filterdBookings.length < 1) {
      return (this.somebodyBooked = false);
    }
    this.getBookingByUser(this.loggedInUser);
  },
  components: {
    guideReview,
    tripBook,
    guidePreview,
  },
};
</script>
