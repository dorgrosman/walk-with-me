  <template>
  <section v-if="tripToEdit" class="add-trip">
    <button class="action" @click="showAddBtn">Create A New Trip</button>

    <form class="add-trip-form" @submit.prevent="addTrip" v-if="isAdding">
      <input
        type="text"
        placeholder="Trip Name..."
        v-model.trim="tripToEdit.name"
        required
      />
      <input
        type="number"
        placeholder="Trip Price..."
        v-model.number="tripToEdit.price"
        required
      />
      <input
        type="text"
        placeholder="Trip Desc..."
        v-model.number="tripToEdit.description"
        required
      />

      <input
        type="number"
        placeholder="Trip Difficulty..."
        v-model.number="tripToEdit.difficulty"
        min="1"
        max="5"
        required
      />
      <select v-model="tripToEdit.type">
        <option value="" selected disabled hidden>Choose type here</option>
        <option value="mountain">mountain</option>
        <option value="seaside">seaside</option>
        <option value="city">city</option>
        <option value="forest">forest</option>
      </select>
<br/>
  
      <button>Save</button>
    </form>
  </section>
</template>

<script>
import { tripService } from "../../services/trip-service.js";

export default {
  props: {
      guide: {
          type: Object
      }
  },

  data() {
    return {
      tripToEdit: null,
      isAdding: false,
    };
  },

  computed: {},

  methods: {
    addTrip() {
      const tripCopy = JSON.parse(JSON.stringify(this.tripToEdit));
      this.$store.dispatch({
        type: "saveTrip",
        trip: this.tripToEdit,
      });
      this.$router.push("/");
    },
    showAddBtn() {
      this.isAdding = !this.isAdding;
    },
  },
  async created() {
    this.tripToEdit = await tripService.getEmptyTrip();
    this.tripToEdit.aboutGuide= {
        _id: this.guide._id,
        name: this.guide.name,
        imgUrl: this.guide.profileImgUrl,
        rate: this.guide.guideInfo.rate
      }
  },
};
</script>

<style>
</style>