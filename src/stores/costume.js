import { defineStore } from "pinia";
import axios from "axios";

export const useCostumeStore = defineStore({
  id: "costume",
  state: () => ({
    costume: false,
    costumeDetail: false,
  }),
  getters: {
    getCostumes: (state) => state.costume,
  },
  actions: {
    async fetchCostumes() {
      try {
        const { data } = await axios.get(
          "http://www.sunnycosrent-backend.test/api/costume?all=true"
        );
        this.costume = data;
      } catch (error) {
        this.costume = false;
      }
    },
  },
});
