<template>
  <section
    v-if="this.trip"
    class="trip-preview preview-card"
    @click="goToDetails(tripId)"
  >
    <img
      class="trip-preview-img ratio-card"
      :src="require('../../assets/img/trips/' + this.trip.imgUrls[0])"
    />
    <div :class="{ hide: !isFav }">
      <p class="toggle-fav" @click.stop="emitFav(trip)"><i :class="fav"></i></p>
    </div>
    <div class="details">
      <h2 class="trip-preview-title">{{ this.trip.name }}</h2>
      <div class="trip-preview-trip-details">
        <div class="flex">
          <p class="date">{{ getDateString }}</p>
          <span class="seperator">∙</span>
          <p class="duration">{{ this.trip.duration }}</p>
        </div>
        <div class="booking-info flex">
          <p>
            <span class="price bold">${{ this.trip.price }}</span> / person
          </p>
          <span class="seperator">∙</span>

          <div v-if="fullyBooked">
            <p class="fully-booked">Fully Booked</p>
          </div>

          <div v-else>
            <p>
              <span class="bold">{{ this.trip.totalBooked }}</span
              >/10 joined
            </p>
          </div>
        </div>
        <hr />
        <div class="guide-info flex space-between">
          <div class="guide-profile flex">
            <img
              class="guide-img profile-img-s"
              :src="
                require('@/assets/img/users/' + this.trip.aboutGuide.imgUrl)
              "
            />
            <p>{{ this.trip.aboutGuide.name }}</p>
          </div>
          <p>
            <i class="fas fa-star trip-star-rate"></i> {{ rateGuide }} ({{
              rateTotal
            }})
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { tripService } from "@/services/trip-service.js";
import { userService } from "../../services/user-service";

export default {
  props: {
    tripId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFav: false,
      trip: null,
      rateGuide: null,
      guide: null,
      rateTotal: null,
      fullyBooked: false
    };
  },
  name: "trip-preview",
  methods: {
    emitFav(trip) {
      this.isFav = !this.isFav;
      this.$emit("emitFav", trip);
    },

    goToDetails(id) {
      this.$router.push(`/trip/${id}`);
    },

    checkIsFav() {
      const user = this.getCurrUser;
      const userFavs = user.favoriteTrips;
      let isInFav = userFavs.some((userFav) =>
        userFav._id.includes(this.trip._id)
      );
      this.isFav = isInFav;
    },

    async getGuideRate(trip) {
      const tripGuideId = trip.aboutGuide._id;
      const rate = await this.$store.dispatch({
        type: "getGuideRate",
        tripGuideId,
      });

      this.rateGuide = rate;
    },

    async getRateTotal(trip) {
      const tripGuideId = trip.aboutGuide._id;
      const total = await this.$store.dispatch({
        type: "getRateTotal",
        tripGuideId,
      });
      this.rateTotal = total;
    },
     checkIfFullyBooked(trip) {
      if (trip.totalBooked === 10) {
        this.fullyBooked = true      
      }
    }
  },

  computed: {
    starsAmount() {
      let rate = this.trip.guide.rate;
      let starsAmount = [];
      for (let i = 0; i < rate; i++) {
        starsAmount.push(i);
      }
      return starsAmount;
    },
    fav() {
      if (this.isFav) return "fas fa-heart";
      else return "far fa-heart";
    },
    getCurrUser() {
      return this.$store.getters.loggedinUser;
    },
    getDateString(trip) {
      var date = new Date(this.trip.date);
      return date.toLocaleDateString("en-GB");
    },
   
  },

  async created() {
    // console.log('this.trip:', this.isFav)
    this.trip = await tripService.getTripById(this.tripId);
    this.checkIsFav();
    this.getGuideRate(this.trip);

    this.guide = await userService.getUserById(this.trip.aboutGuide._id);
    this.getRateTotal(this.trip);

    this.checkIfFullyBooked(this.trip)
  },
};
</script>

<style></style>
