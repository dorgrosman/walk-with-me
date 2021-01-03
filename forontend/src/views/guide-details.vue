<template>
  <section class="guide-info" v-if="guide">
    <h1>{{ guide.name }}</h1>
    <img
      class="guide-preview-img profile-img-l"
      :src="require('@/assets/img/users/' + guide.profileImgUrl)"
    />
    <h3>Rating: {{ guide.guideInfo.rate }}</h3>
    <p>{{ rateGuide }} ({{ rateAmount }})</p>
    <p>{{ guide.guideInfo.description }}</p>
    <button class="back-btn"><router-link to="/">Back</router-link></button>
    <h3>All Trips:</h3>

    <trip-list v-if="guide" :trips="getTripsByGuide" @emitFav="toggleFav" />

    <h3>All Reviews:</h3>
    <guide-review :guideId="guide._id" :user="user" />
    <!-- <guide-review :guide="guide" /> -->
  </section>
</template>

<script>
import { userService } from "../services/user-service.js";
import tripList from "../cmps/trip/trip-list.cmp.vue";
import guideReview from "../cmps/review/guide-review.cmp.vue";

export default {
  name: "guide-details",

  data() {
    return {
      guide: null,
    };
  },

  computed: {
    getTripsByGuide() {
      return this.$store.getters.getTripsByGuide;
    },
    rateGuide() {
      const sum = this.guide.guideInfo.reviews.reduce(
        (acc, item) => acc + item.rate,
        0
      );
      const avg = sum / this.guide.guideInfo.reviews.length;
      return avg.toFixed(1);
    },
    rateAmount() {
      return this.guide.guideInfo.reviews.length;
    },
    user() {
      return this.$store.getters.loggedinUser;
    },
  },

  methods: {
    setGuideId() {
      this.$store.commit({
        type: "setGuideId",
        guideId: this.guide._id,
      });
    },

    toggleFav(trip) {
      this.$store.dispatch({
        type: "toggleFavs",
        trip,
      });
    },
    updateUserRate(avg) {
      this.$store.dispatch({
        type: "updateUserRate",
        avg,
      });
    },
  },

  async created() {
    const guideId = this.$route.params.id;
    const guide = await userService.getUserById(guideId);
    this.guide = guide;
    this.setGuideId();
    this.$store.dispatch({
      type: "loadTrips",
    });
  },

  components: {
    tripList,
    guideReview,
  },
};
</script>

<style>
</style>