import { defineStore } from "pinia";
import axios from "axios";

export const useAddressStore = defineStore({
  id: "address",
  state: () => ({
    province: false,
    city: false,
    district: false,
  }),
  getters: {
    getProvinces: (state) => state.province,
    getCities: (state) => state.city,
    getDistrict: (state) => state.district,
  },
  actions: {
    async fetchProvinces() {
      try {
        const { data } = await axios.get("http://localhost:8000/api/provinces");
        this.province = data;
      } catch (error) {
        this.province = false;
      }
    },
    async fetchCities(province) {
      try {
        const { data } = await axios.get("http://localhost:8000/api/cities", {
          params: {
            province: province,
          },
        });
        this.city = data;
      } catch (error) {
        this.city = false;
      }
    },
    async cityLoad() {
      this.city = false;
    },
  },
});
