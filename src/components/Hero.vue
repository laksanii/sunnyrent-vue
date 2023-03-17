<script setup>
import Slider from "@/components/partials/Slider.vue"
</script>

<template>
    <div>
        <section class="section" id="hero">
            <div class="container hero text-center">
                <div class="row justify-content-center mb-4">
                    <div class="col-12 col-lg-6">
                        <h2>Sekarang cosplay gak harus mahal</h2>
                        <h2>Cosplay jadi karakter favoritmu mulai dari 50 ribuan aja</h2>
                        <h5>
                            Rental di Sunnycos-Rent punya katalog kostum lebih dari 60 katalog
                            dan punya 90 lebih kostum
                        </h5>
                        <router-link to="#form" class="btn btn-primary btn-rent rounded-pill">Rental Sekarang</router-link>
                    </div>
                </div>
                <Slider />
            </div>
        </section>
    </div>
</template>