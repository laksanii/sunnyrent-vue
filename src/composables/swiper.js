import { ref, onMounted } from "vue";

export const useSwiper = (swiperOptions) => {
  const swiperInstance = ref(null);

  onMounted(() => {
    swiperInstance.value = new SwiperCore(".mySwiper", swiperOptions);
  });

  return swiperInstance;
};
