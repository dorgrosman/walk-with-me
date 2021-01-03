<template>
  <section class="login-page flex f-col f-center">
    <form @submit.prevent="sendUserDetails" class="from-box">
      <h1 class="title">{{ titleToShow }}</h1>
      <div class="input-box">
        <i class="fa fa-user" aria-hidden="true"></i>
        <input type="text" v-model="user.name" placeholder="Enter Your Name" />
      </div>
      <div class="input-box">
        <i class="fa fa-key" aria-hidden="true"></i>
        <input
          :type="showPass"
          v-model="user.password"
          placeholder="Enter Password"
        /><i :class="showPassClass" @click="isShowPass = !isShowPass"></i>
      </div>
      <button class="login-btn">{{ btnTextToShow }}</button>
      <button class="login-btn" @click="homePage">Back to the home page</button>
    </form>
  </section>
</template>

<script>
import { eventBusService, SHOW_MSG } from "../services/eventBus-service.js";

export default {
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
      isShowPass: false,
    };
  },
  methods: {
    async sendUserDetails() {
      if (
        (!this.isLogin && !this.user.name) ||
        !this.user.password ||
        !this.user.name
      ) {
        console.log("Fill all the details!!");
        return;
      }
      const res = await this.$store.dispatch({
        type: this.isLogin ? "login" : "signup",
        userCred: this.user,
      });

      if (res.err) {
        console.log("err", res.err);
      }

      if (this.isLogin) {
        eventBusService.$emit(SHOW_MSG, {
          txt: `Welcome ${this.user.name}`,
          subTxt: "Login Successful",
          type: "success",
        });
      } else {
        eventBusService.$emit(SHOW_MSG, {
          txt: `Welcome ${this.user.name}`,
          subTxt: "Signup Successful",
          type: "success",
        });
      }

      this.$router.push("/");
    },
    homePage() {
      this.$router.push("/");
    },
  },
  computed: {
    titleToShow() {
      return this.isLogin ? "Login" : "Sign Up";
    },
    btnTextToShow() {
      return this.isLogin ? "Login" : "Sign Up";
    },
    showPass() {
      return this.isShowPass ? "text" : "password";
    },
    showPassClass() {
      return {
        "fas fa-eye": !this.isShowPass,
        "fas fa-eye-slash": this.isShowPass,
      };
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  watch: {},
};
</script>