<script setup>
import { ref } from "vue"
import axios from 'axios'

// const check = ref(false)
const codeBook = ref()
const order = ref()
const found = ref(false)
const notFound = ref(false)
const loading = ref(false);

async function submitForm(e) {
  try {
    loading.value = true
    const { data } = await axios.get(
      "https://sunnycos-rent.my.id/api/order/" + codeBook.value
    );
    loading.value = false
    order.value = data.result;
    found.value = true
    notFound.value = false
  } catch (error) {
    order.value = false;
    notFound.value = true
    found.value = false
  }
}

function clearFound() {
  found.value = false
}

function clearNotFound() {
  notFound.value = false
}
</script>

<template>
  <div>
    <section class="section min-vh-100 bg-white" id="check">
      <div class="container">
        <h3 class="text-center mb-4">Cek Order</h3>
        <div class="container px-4 d-flex flex-column align-items-center">
          <div class="col-12 col-md-6">
            <form @submit.prevent="submitForm" class="mx-auto">
              <div class="input-group mb-3">
                <input type="text" v-model="codeBook" class="form-control" placeholder="Kode Order" required />
                <button class="btn btn-primary" type="submit" id="button-addon2">
                  Cek
                </button>
              </div>
            </form>
            <div v-if="found" class="alert alert-success alert-dismissible fade show" role="alert">
              <div>
                Code book berhasil ditemukan
              </div>
              <button type="button" @click="clearFound" class="btn-close" data-bs-dismiss="alert"
                aria-label="Close"></button>
            </div>
            <div v-if="notFound" class="alert alert-warning alert-dismissible fade show" role="alert">
              <div>
                Code book tidak ditemukan
              </div>
              <button type="button" @click="clearNotFound" class="btn-close" data-bs-dismiss="alert"
                aria-label="Close"></button>
            </div>
          </div>
          <div class="lds-dual-ring text-center mb-3" v-if="loading"></div>

          <div v-if="order" class="check-result">
            <div class="result-container">
              <div class="field d-flex mb-1 bg-primary rounded gap-1">
                <div class="label col-12 py-1 px-2 fw-bold">
                  Kode-{{ order.code }}
                </div>
              </div>
              <div class="field d-flex mb-1 rounded gap-1">
                <div class="label col-4 bg-primary py-1 px-2 rounded-start">
                  Nama Lengkap
                </div>
                <div class="value col-8 bg-primary py-1 px-2 rounded-end">
                  {{ order.name }}
                </div>
              </div>
              <div class="field d-flex mb-1 rounded gap-1">
                <div class="label col-4 bg-primary py-1 px-2 rounded-start">
                  Alamat Lengkap
                </div>
                <div class="value col-8 bg-primary py-1 px-2 rounded-end">
                  {{ order.address }}
                </div>
              </div>
              <div class="field d-flex mb-1 rounded gap-1">
                <div class="label col-4 bg-primary py-1 px-2 rounded-start">
                  Karakter
                </div>
                <div class="value col-8 bg-primary py-1 px-2 rounded-end">
                  {{ order.costume.name }}
                </div>
              </div>
              <div class="field d-flex mb-1 rounded gap-1">
                <div class="label col-4 bg-primary py-1 px-2 rounded-start">
                  Tanggal Sewa
                </div>
                <div class="value col-8 bg-primary py-1 px-2 rounded-end">
                  {{ order.rent_date }}
                </div>
              </div>
              <div class="field d-flex mb-1 rounded gap-1">
                <div class="label col-4 bg-primary py-1 px-2 rounded-start">
                  Total Harga
                </div>
                <div class="value col-8 bg-primary py-1 px-2 rounded-end">
                  Rp {{ parseInt(order.total_price).toLocaleString('id-ID') }}
                </div>
              </div>
              <div class="field d-flex mb-1 rounded gap-1">
                <div class="label col-4 bg-primary py-1 px-2 rounded-start">
                  Aksesoris
                </div>
                <div class="value col-8 bg-primary py-1 px-2 rounded-end">
                  <ul class="list-group">
                    <li v-for="accessory in order.order_accessories" class="list-group-item border-0 bg-transparent">
                      {{ accessory.accessory.name }} ( Rp {{ parseInt(accessory.price).toLocaleString('id-ID') }} )
                    </li>
                  </ul>
                </div>
              </div>
              <div class="field d-flex mb-1 rounded gap-1">
                <div class="label col-4 bg-primary py-1 px-2 rounded-start">
                  Status Kembali
                </div>
                <div class="value col-8 bg-primary py-1 px-2 rounded-end">
                  {{ order.return_status }}
                </div>
              </div>
            </div>
            <table class="table bg-primary rounded">
              <thead>
                <tr>
                  <th scope="col" class="text-center align-middle">
                    Pembayaran
                  </th>
                  <th scope="col" class="text-center align-middle">
                    Status Pembayaran
                  </th>
                  <th scope="col" class="text-center align-middle">Resi</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr>
                  <td class="text-center align-middle">{{ order.payment == 'DP' ? order.payment + ' - Rp ' +
                    parseInt(order.DP).toLocaleString('id-ID') :
                    order.payment }}</td>
                  <td class="text-center align-middle">{{ order.payment_status }}</td>
                  <td class="text-center align-middle"> {{ order.shipping_status }} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>