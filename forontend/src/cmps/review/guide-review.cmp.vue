<template>
  <section class="guide-reviews">
    <div class="reviews-header flex space-between align-center">
      <h2 class="title">Reviews</h2>
      <button @click="showAddBtn" v-show="!isAdding" class="action">Add</button>
    </div>

    <form class="add flex column space-between" v-show="isAdding">
      <star-rating
        v-model="newReview.rate"
        :increment="1"
        :star-size="25"
        :rounded-corners="true"
        active-color="#FF8A44"
        :padding="1"
        :active-on-click="true"
        :clearable="true"
      />

      <textarea
        v-model="newReview.txt"
        rows="4"
        placeholder="What do you think?"
      />
      <div class="form-btns">
        <button type="button" @click.prevent="cancelReview">Cancel</button>
        <button class="action" @click="handleReview">Submit</button>
      </div>
    </form>
    <ul class="review-container">
      <li class="review-card" v-for="review in reviews" :key="review._id">
        <p>{{ review.txt }}</p>
        <h4><i class="fas fa-star"></i> Rate: {{ review.rate }}</h4>
        <div class="review-by flex">
          <img
            class="profile-img-s"
            :src="require('@/assets/img/users/' + review.reviewByUser.imgUrl)"
            alt="Image..."
          />
          <h3>{{ review.reviewByUser.userName }}</h3>
        </div>
      </li>
    </ul>

    <div></div>
  </section>
</template>

<script>
import { userService } from "../../services/user-service.js";
import StarRating from 'vue-star-rating';
import {utilService} from '../../services/util-service.js';

export default {
  props: {
    guideId: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isAdding: false,
      newReview: {
        txt: "",
        rate: null,
        _id: utilService.makeId(6),
        reviewByUser: {
          userName: this.user.name,
          imgUrl: this.user.profileImgUrl,
          _id: this.user._id,
        },
      },
    };
  },
  methods: {
    handleReview() {
      this.$store.dispatch({
        type: "saveReview",
        review: JSON.parse(JSON.stringify(this.newReview)),
        guideId: this.guideId,
        user: this.user,
      });
    },
    showAddBtn() {
      this.isAdding = !this.isAdding;
    },
    cancelReview() {
      this.newReview = { txt: "", guideId: this.guideId };
      this.isAdding = !this.isAdding;
    },
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
  },
  async created() {
    // console.log('this.guideId:', this.guideId)
    this.$store.dispatch({ type: "loadReviews", guideId: this.guideId });
  },
  components: {
    StarRating,
  },
};
</script>
