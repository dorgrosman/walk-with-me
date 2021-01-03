<template>
  <section v-if="trip" class="trip-book flex column">
    <h3>{{ booking.trip.date }}</h3>
    <h3>Price: ${{ trip.price }}</h3>
    <form @submit.prevent="emitBook" class="flex column" v-if="!isBooked">
      <label for="specialReq">Any special requests?</label>
      <textarea
        class="specialReq"
        rows="2"
        v-model="booking.specialReq"
        id="specialReq"
        name="specialReq"
        placeholder="e.g.: I want a vegan option for lunch"
      />
      <label for="peopleToSign">How Many Travellers?</label>
      <el-input-number
        class="trip-book-peopleToSign"
        v-model.number="booking.peopleToSign"
        id="peopleToSign"
        name="peopleToSign"
        :min="1"
        :max="openSlotsForHikers"
        @change="totalPrice"
      />
      <p>Total: ${{ booking.sum }}</p>
      <button class="action">Book Trip</button>
    </form>
    <div v-else>You Are Already Booked For This Trip</div>
  </section>
</template>

<script>
import { eventBusService, SHOW_MSG } from "../../services/eventBus-service.js";
export default {
  props: {
    trip: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      booking: {
        createdAt: new Date().toLocaleDateString(),
        guide: {
          _id: this.trip.aboutGuide._id,
          name: this.trip.aboutGuide.name,
          imgUrl: this.trip.aboutGuide.imgUrl,
        },

        trip: {
          _id: this.trip._id,
          name: this.trip.name,
          imgUrl: this.trip.imgUrls,
          totalBooked: this.trip.totalBooked,
          date: this.trip.date
        },
        status: "pending",
        peopleToSign: 1,
        specialReq: "",
        sum: this.trip.price,
      },
      isBooked: false,
    };
  },

  computed: {
    openSlotsForHikers() {
      const signed = this.trip.totalBooked;
      let openSlots = 10 - signed;
      return openSlots;
    },
  },

  methods: {
    emitBook() {
      this.$emit("bookTrip", this.booking);

 eventBusService.$emit(SHOW_MSG, {
        txt: "Trip Booked!",
        subTxt: "Please wait for guide's final approval",
        type: "success",
      });
      

      this.updateTotalBooked();

      eventBusService.$emit(SHOW_MSG, {
        txt: "Trip Booked!",
        subTxt: "Please wait for guide's final approval",
        type: "success",
      });
    },

    totalPrice() {
      const price = this.trip.price;
      const numOfPeople = this.booking.peopleToSign;
      this.booking.sum = (price * numOfPeople).toFixed(2);
      return this.booking.sum;
    },
    updateTotalBooked() {
      let totalBooked = this.booking.trip.totalBooked;
      const peopleToSign = this.booking.peopleToSign;
      totalBooked += peopleToSign;
      this.$store.dispatch({
        type: "updateTotalBooked",
        id: this.trip._id,
        totalBooked: JSON.parse(JSON.stringify(totalBooked)),
      });
    },
    getBookingByUser(user) {
      const bookings = this.$store.getters.bookings;

      const filteredBookings = bookings.filter(
        (booking) => booking.user._id === this.user._id
      );

      filteredBookings.some((booking) => {
        if (booking.trip.name === this.trip.name) return (this.isBooked = true);
      });
    },
    getDateString(trip) {
      var date = new Date(this.trip.date);
      return date.toLocaleDateString("en-GB");
    },
  },

  created() {
    this.getBookingByUser(this.user);
    this.booking.trip.date = this.getDateString(this.trip);
  },
};
</script>
