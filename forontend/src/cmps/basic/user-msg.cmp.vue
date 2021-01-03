<template>
  <section class="user-msg">
    <div v-if="msg">
      <div class="alert" :class="alertClass">
        <p @click="closeMgs()">X</p>
        <p class="bold">{{ msg }}</p>
      </div>
    </div>

    <div v-if="msgBus">
      <div class="alert" :class="alertClassBus">
        <h2>{{ msgBus.txt }}</h2>
        <p>{{ msgBus.subTxt }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { eventBusService, SHOW_MSG } from "../../services/eventBus-service.js";
import socketService from "../../services/socket-service.js";

export default {
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      alive: false,
      msg: null,
      msgBus: null,
    };
  },

  computed: {
    alertClass() {
      if (!this.msg) return;
      return `alert-${this.msg.type}`;
    },
    alertClassBus() {
      if (!this.msgBus) return;
      return `alert-${this.msgBus.type}`;
    },
  },
  methods: {
    closeMgs() {
      this.msg = null;
      this.msgBus = null;

    },
  },
  created() {
    eventBusService.$on(SHOW_MSG, msgBus => {
      this.msgBus = msgBus;
      var delay = msgBus.delay || 3000;
      this.alive = true;
      // this.msgBus = `Hello ${booking.user.name} Trip Booked! Please wait for guide's final approval`;
      setTimeout(() => {
        this.alive = false;
      }, delay);
    });

    socketService.on("sendBooking", (booking) => {
      this.msg = `${booking.user.name} booked the ${booking.trip.name} trip, pending your approval`;
      // setTimeout(() => {
      //   this.closeMgs();
      // }, 3500);
    });

    socketService.on("approveBooking", (booking) => {
      this.msg = `${booking.guide.name} approved your booking`;
      // setTimeout(() => {
      //   this.closeMgs();
      // }, 3500);
    });
    // } else {

    // socketService.on("sendApproveBooking", (booking) => {
    //   console.log('bookingdddddd:', this.booking)
    //   this.msg = `The trip in the name of ${this.booking.trip.name} has been approved for you!`;
    //   setTimeout(() => {
    //     this.closeMgs();
    //   }, 3500);
    // });
    // }
  },
};
</script>

<style>
</style>