<template>
  <section class="main-header full main-layout">
    <div class="main-header-content flex space-between">
      <div class="logo flex align-center">
        <router-link to="/"
          ><img
            v-if="isHome"
            src="@/assets/logo/logo-text-OW.svg"
            class="logo"
          />
          <img v-else src="@/assets/logo/logo-O.svg" class="logo" />
        </router-link>
      </div>
      <user-msg :user="this.user"></user-msg>
      <div class="nav-bar flex space-between align-center">
        <div class="nav-link">
          <router-link to="/">Home</router-link>
        </div>
        <div class="nav-link">    
          <router-link to="/about">About</router-link>
        </div>
        <div class="nav-link">
          <a @click="becomeGuide(user)">Become a Guide</a>
        </div>
        <div class="avatar flex align-center" @click="toggleMenu">
          <i class="fas fa-bars"></i>
          <img
            class="avatar-img profile-img-s"
            :src="require('@/assets/img/users/' + this.user.profileImgUrl)"
          />
          <div class="user-menu flex column" :class="{ hide: !isMenuOpen }">
            <router-link to="/back-office" v-if="user.isGuide">
              {{ userName(user) }}'s Office</router-link
            >
            <router-link to="/user/:id" v-if="!user.isGuide">
              Profile
            </router-link>
            <a @click="logout">Logout</a>
            <template v-show="!isLoggingIn">
              <div v-if="loggedUser" class="login-btns">
                <a v-if="!loggedUser" @click="loginSignUp('login')"> Login </a>
                <a v-if="!loggedUser" @click="loginSignUp('signUp')">
                  Sign Up
                </a>
                <div class="s-nav-link">
                  <router-link to="/">Home</router-link>
                </div>
                <div class="s-nav-link">
                  <router-link to="/about">About</router-link>
                </div>
                <div class="s-nav-link">
                  <a @click="becomeGuide(user)">Become a Guide</a>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import userMsg from "./user-msg.cmp.vue";
import socketService from "../../services/socket-service.js";

export default {
  props: {
    user: {
      type: Object,
    },
    isHome: {
      type: Boolean,
    },
  },

  data() {
    return {
      imgSrc: "",
      isMenuOpen: false,
    };
  },

  methods: {
    userName(user) {
      var loggedUser = this.user.name;
      var userFullName = loggedUser.split(" ");
      return userFullName[0];
    },
    becomeGuide(user) {
      this.$store.dispatch({
        type: "login",
        userCred: { name: "Arnold Wellington", password: "123456" },
      });
    },
    loginGuide() {
      this.$store.dispatch({
        type: "login",
        userCred: { name: "Arnold Wellington", password: "123456" },
      });
    },
    loginSignUp(action) {
      this.$store.commit({ type: "setLoginSignUp", action });
      if (this.$route.path !== "/login") this.$router.push("/login");
    },
    async logout() {
      await this.$store.dispatch({ type: "logout" });
      this.$store.dispatch({ type: "loadTrip" });
    },
    isHomePage() {
      let isHomePage = this.$route.path === "/";
      if (isHomePage) return "text-OW";
      else return "O";
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  computed: {
    isLoggingIn() {
      return this.$route.path === "/login";
    },
    loggedUser() {
      return this.$store.getters.loggedinUser;
    },
  },

  components: {
    userMsg,
  },
  created() {
    // console.log('user main header:', this.user)
  },
};
</script>
