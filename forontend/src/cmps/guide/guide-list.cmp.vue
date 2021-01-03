<template>
   <section class="guide-list card-grid">
   
    <guide-preview v-for="(guide) in sortedGuides" :key="guide._id" :guide="guide">
    </guide-preview>
  </section>
</template>

<script>
import guidePreview from "./guide-preview.cmp.vue";

export default {
  name: "guide-list",
  props: {
    guides: {
      type: Array,
      required: true,
    },
  },

  components: {
    guidePreview,
  },

  methods: {},
  computed: {
    // sorted_users() {
    //   return this.users.sort((a, b) => {return b.guideInfo.rate - a.guideInfo.rate});
    // },
    sortedGuides() {
      return _.orderBy(this.guides, 'guideInfo.rate', 'desc' )
    }
  },
};
</script>

<style>
</style>