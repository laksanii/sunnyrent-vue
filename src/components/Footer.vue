<script setup>
import { RouterLink } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWhatsapp, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([faWhatsapp, faInstagram, faFacebookF])
</script>

<template>
  <div>
    <footer class="bg-custome-dark text-light pt-4">
      <div class="container d-flex flex-lg-row flex-column justify-content-between">
        <div class="col-12 col-lg-5 mb-3 gap-3">
          <h3>Navigation</h3>
          <div class="d-md-flex gap-3">
            <div class="footer-nav mb-1">
              <router-link to="/#hero" class="fs-5 text-decoration-none ">Home</router-link>
            </div>
            <div class="footer-nav mb-1">
              <router-link to="#form" class="fs-5 text-decoration-none ">Rent</router-link>
            </div>
            <div class="footer-nav mb-1">
              <router-link to="#check" class="fs-5 text-decoration-none ">Cek Order</router-link>
            </div>
            <div class="footer-nav mb-1">
              <router-link to="#confirm" class="fs-5 text-decoration-none ">Konfirmasi</router-link>
            </div>
            <div class="footer-nav mb-1">
              <router-link to="#return" class="fs-5 text-decoration-none ">Pengembalian</router-link>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 mb-3 ">
          <h3>Contact Us</h3>
          <div class="d-flex flex-column flex-md-row gap-3 mt-2 ">
            <a href="https://wa.me/6283832352467" target="_blank"
              class="text-light text-decoration-none fw-light "><font-awesome-icon icon="fa-brands fa-whatsapp"
                class="me-1" /> Whatsapp</a>
            <a href="https://www.instagram.com/sunnycosrent.id/" target="_blank"
              class="text-light text-decoration-none fw-light "><font-awesome-icon icon="fa-brands fa-instagram"
                class="me-1" /> Instagram</a>
            <a href="https://fb.me" target="_blank" class="text-light text-decoration-none fw-light "><font-awesome-icon
                icon="fa-brands fa-facebook-f" class="me-1" /> Facebook</a>
          </div>
        </div>
      </div>
      <hr />
      <div class="pb-3 text-center copyright">&copy;Sunnycos-rent 2023</div>
    </footer>
  </div>
</template>