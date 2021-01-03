import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home-page.vue";
import about from "../views/about.vue";
import allTripList from "../views/all-trips-list";
import tripDetails from "../views/trip-details.vue";
import userDetails from "../views/user-details.vue";
import backOffice from "../views/back-office.vue";
import guideDetails from '../views/guide-details.vue';
import login from '../views/login.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home
  },
  {
    path: "/user/:id",
    name: "user-details",
    component: userDetails
  },
  {
    path: "/trip",
    name: "trip-list",
    component: allTripList
  },
  {
    path: "/trip/:id",
    name: "trip-details",
    component: tripDetails
  },
  {
    path: "/back-office",
    name: "back-office",
    component: backOffice
  },
  {
    path: '/guide/:id',
    name: 'guide-details',
    component: guideDetails
  },
  {
    path: '/login',
    component: login
  },
  {
    path: "/about",
    name: "about",
    component: about
    
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router;
