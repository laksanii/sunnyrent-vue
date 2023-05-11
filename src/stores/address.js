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
        const { data } = await axios.get(
          "https://api.rajaongkir.com/starter/province",
          {
            headers: {
              key: "05fb707215b778a76401b6996bc53823",
            },
          }
        );
        this.province = data;
      } catch (error) {
        this.province = false;
      }
    },
  },
});
