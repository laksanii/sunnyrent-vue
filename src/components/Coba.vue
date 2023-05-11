<script setup>
import { ref, onMounted, onUpdated, computed } from "vue";
import { useAddressStore } from "@/stores/address";
import axios from "axios";

// const addressStore = useAddressStore();
// const provinces = computed(() => addressStore.getProvinces);

const { data } = await axios.get(
    "https://api.rajaongkir.com/starter/province",
    {
        headers: {
            key: "05fb707215b778a76401b6996bc53823",
        },
    }
);

console.log(data);
</script>

<template>
    <div>
        COBAA
    </div>
</template>