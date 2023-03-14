<template>
    <swiper class="mySwiper" :loop="true" :clickable="true" :slidesPerView="1" :spaceBetween="30" :breakpoints="{
        '576': {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // when window width is >= 480px
        '768': {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        // when window width is >= 640px
        '992': {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        '1200': {
            slidesPerView: 4,
            spaceBetween: 40,
        },
    }" :autoplay="{
    delay: 2000,
    disableOnInteraction: false,
}" :modules="modules">
        <swiper-slide>
            <img src="@/assets/images/gawr_gura.jpg" alt="gura" />
        </swiper-slide>
        <swiper-slide>
            <img src="@/assets/images/kobo_kanaeru.jpg" alt="gura" />
        </swiper-slide>
        <swiper-slide>
            <img src="@/assets/images/nahida_kusanali.jpg" alt="gura" />
        </swiper-slide>
        <swiper-slide>
            <img src="@/assets/images/nilou.jpg" alt="gura" />
        </swiper-slide>
        <swiper-slide>
            <img src="@/assets/images/gawr_gura.jpg" alt="gura" />
        </swiper-slide>
        <swiper-slide>
            <img src="@/assets/images/kobo_kanaeru.jpg" alt="gura" />
        </swiper-slide>
    </swiper>
</template>
<script setup>
import { Autoplay } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import 'swiper/css';

const modules = [Autoplay];


// import { useSwiper } from '@/composables/swiper';
// install Swiper components
// SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);


// const swiperOptions = {
//     clickable: "true",
//     slidesPerView: "1",
//     spaceBetween: "30",
//     breakpoints: {
//         '576': {
//             slidesPerView: 1,
//             spaceBetween: 10,
//         },
//         // when window width is >= 480px
//         '768': {
//             slidesPerView: 2,
//             spaceBetween: 20,
//         },
//         // when window width is >= 640px
//         '992': {
//             slidesPerView: 3,
//             spaceBetween: 20,
//         },
//         '1200': {
//             slidesPerView: 4,
//             spaceBetween: 40,
//         },
//     },
//     autoplay: {
//         delay: 2000,
//         disableOnInteraction: false,
//     },
// };

// const swiperInstance = useSwiper(swiperOptions);
</script>