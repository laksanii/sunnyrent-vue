<script setup>
import { ref } from 'vue'
import axios from 'axios'

const success_msg = ref(false)
const error_msg = ref(false)
const loading = ref(false)

function submitForm(e) {
  // const formEl = document.getElementById("");
  loading.value = true
  const formData = new FormData(e.target)
  axios({
    method: "post",
    url: "https://sunnycos-rent.my.id/api/order/return",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      e.target.reset()
      error_msg.value = false
      success_msg.value = 'Data pengembalian kostum berhasil dikirim'
      // formEl.scrollIntoView()

    })
    .catch(function (response) {
      //handle error
      success_msg.value = false
      error_msg.value = 'Data pengembalian kostum gagal dikirim'

    }).finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <div>
    <section class="section bg-white" id="return">
      <div class="container">
        <h3 class="text-center mb-4">Form Pengembalian</h3>
        <div class="row justify-content-center">
          <div class="col-lg-6 col-12">
            <form @submit.prevent="submitForm" id="returnForm">
              <div v-if="success_msg" class="alert alert-success alert-dismissible fade show" role="alert">
                <div>
                  Data pengembalian berhasil dikirim
                </div>
                <button type="button" @click="clearFound" class="btn-close" data-bs-dismiss="alert"
                  aria-label="Close"></button>
              </div>
              <div v-if="error_msg" class="alert alert-warning alert-dismissible fade show" role="alert">
                <div>
                  Code book tidak ditemukan atau data gagal dikirim
                </div>
                <button type="button" @click="clearNotFound" class="btn-close" data-bs-dismiss="alert"
                  aria-label="Close"></button>
              </div>
              <div class="mb-3">
                <label for="code" class="form-label">Kode Order
                </label>
                <input type="text" class="form-control" name="code" id="code" required />
              </div>
              <div class="mb-3">
                <label for="resi" class="form-label">Resi</label>
                <input type="text" class="form-control" name="resi" id="resi" required />
              </div>
              <div class="mb-3">
                <label for="return_pict" class="form-label mb-0">Foto Bukti Pengembalian Paket/Screenshoot
                  Aplikasi</label>
                <p class="text-danger fs-6 mt-0">*Isi menggunakan link google drive</p>
                <input class="form-control" type="text" id="return_pict" name="return_pict" required
                  placeholder="https://drive.google.com/drive/xxxx" />
              </div>
              <div class="submit text-center mt-4">
                <button disabled v-if="loading"
                  class="btn w-75 btn-primary rounded-pill px-4 py-2 border border-dark fw-semibold form-submit">
                  <div class="lds-dual-ring"></div>
                </button>
                <button type="submit" v-else
                  class="btn w-75 btn-primary rounded-pill px-4 py-2 border border-dark fw-semibold form-submit">
                  Kembalikan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>