<script setup>
import { ref, onMounted, onUpdated, computed } from "vue";
import { useCostumeStore } from "@/stores/costume";
import axios from "axios";
import VueSelect from "vue-select";

import "vue-select/dist/vue-select.css";

// Costume
let alreadySelect = ref(false);
let costumeDetail = ref(false);
const loading = ref(false);

const costumeStore = useCostumeStore();
const costumes = computed(() => costumeStore.getCostumes);
const costumeList = computed(() => costumes.value.result);

async function onSelected(costume) {
    costume_id.value = costume.id;
    alreadySelect.value = true;
    costumeDetail.value = computed(() =>
        costumeList.value.find((cost) => cost.id == costume.id)
    );
    accessories.value = [];
    total_payment.value = costumeDetail.value.value.price;
}

onMounted(() => {
    costumeStore.fetchCostumes();
});

onUpdated(() => { });

const costume_id = ref("");
const accessories = ref([]);
const total_payment = ref(0);
const error_msg = ref([]);
const success_msg = ref(false);
const available = ref(null);
const error_check = ref(null);

const preview = {
    KTP_pict: ref(false),
    KTP_selfie: ref(false),
    payment_pict: ref(false),
};

function clearError() {
    error_msg.value = [];
}

function clearSuccess() {
    success_msg.value = false;
}

function clearErrorCheck() {
    error_check.value = null;
}

function onChange(e, price) {
    if (e.target.checked) {
        total_payment.value = +total_payment.value + +price;
    } else {
        total_payment.value = +total_payment.value - +price;
    }
}

function openPicker(e) {
    e.target.showPicker();
}

function costumeCheck(e) {
    // alert(e.target.value)
    const date = e.target.value;
    if (costume_id.value == "") {
        alert("Pilih kostum dulu");
        e.target.value = "";
        return;
    }

    if (date == "") {
        available.value = null;
        return;
    }

    axios({
        method: "get",
        url:
            "https://sunnycos-rent.my.id/api/order/costume-check?costume_id=" +
            costume_id.value +
            "&rent_date=" +
            date,
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then(function (response) {
            //handle success\
            available.value = response.data.result;
        })
        .catch(function (response) {
            //handle error
            error_check.value = "Terjadi kesalahan";
        });

    axios;
}

function closePreview(e, id) {
    preview[id].value = false;
    document.getElementById(id).value = "";
}

function onFileChange(event, id) {
    const files = event.target.files;
    if (!files.length) return false;
    const reader = new FileReader();
    reader.onload = (e) => {
        preview[id].value = e.target.result;
    };
    reader.readAsDataURL(files[0]);
}

function submitForm(e) {
    clearError();
    loading.value = true
    const formEl = document.getElementById("form");
    const formData = new FormData(e.target);
    axios({
        method: "post",
        url: "https://sunnycos-rent.my.id/api/order",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then(function (response) {
            //handle success
            e.target.reset();
            total_payment.value = 0;
            preview.KTP_pict.value = false;
            preview.KTP_selfie.value = false;
            preview.payment_pict.value = false;
            available.value = null;
            const codeBook = response.data.result.code;
            success_msg.value =
                "Kostum berhasil dibook simpan kode booknya ya: " + codeBook;
            formEl.scrollIntoView();
        })
        .catch(function (response) {
            //handle error
            const errors = response.response.data.errors;

            for (let key in errors) {
                error_msg.value.push(errors[key][0]);
            }

            if (error_msg.value.length < 1) {
                error_msg.value.push(response.response.data.meta.message);
            }
            formEl.scrollIntoView();
        }).finally(() => {
            loading.value = false;
        });
}
</script>

<template>
    <div>
        <section class="section form bg-page" id="form">
            <div class="container">
                <h3 class="text-center mb-4">Form Rental</h3>
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-12">
                        <form @submit.prevent="submitForm">
                            <div v-if="error_check != null" class="alert alert-warning alert-dismissible fade show"
                                role="alert">
                                {{ error_check }}
                                <button type="button" @click="clearErrorCheck" class="btn-close" data-bs-dismiss="alert"
                                    aria-label="Close"></button>
                            </div>
                            <div v-if="error_msg.length" class="alert alert-warning alert-dismissible fade show"
                                role="alert">
                                <div v-for="msg in error_msg">
                                    {{ msg }}
                                </div>
                                <button type="button" @click="clearError" class="btn-close" data-bs-dismiss="alert"
                                    aria-label="Close"></button>
                            </div>
                            <div v-if="success_msg" class="alert alert-success alert-dismissible fade show" role="alert">
                                <div>
                                    {{ success_msg }} <br />
                                    <small>Kalau lupa bisa hubungi admin :)</small>
                                </div>
                                <button type="button" @click="clearSuccess" class="btn-close" data-bs-dismiss="alert"
                                    aria-label="Close"></button>
                            </div>
                            <div class="mb-3">
                                <label for="costume_id" class="form-label">Kostum Karakter
                                </label>
                                <VueSelect v-if="costumes" v-model="costume_id" :options="costumeList" :clearable="false"
                                    :reduce="(costume) => costume.id" @option:selected="(costume) => onSelected(costume)"
                                    label="name" class="form-control p-0" placeholder="Pilih karakter">
                                </VueSelect>
                            </div>
                            <input type="text" name="costume_id" hidden :value="costume_id" />
                            <div v-if="alreadySelect" class="mb-3">
                                <label for="detailCostume">Detail</label>
                                <div class="row">
                                    <label for="staticEmail" class="col-sm-2 col-2 col-form-label">Size</label>
                                    <div class="col-sm-10 col-8">
                                        <input type="text" readonly class="form-control-plaintext" id="staticEmail"
                                            :value="costumeDetail.value.sizes">
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="staticEmail" class="col-sm-2 col-2 col-form-label">LD</label>
                                    <div class="col-sm-10 col-8">
                                        <input type="text" readonly class="form-control-plaintext" id="staticEmail"
                                            :value="costumeDetail.value.ld">
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="staticEmail" class="col-sm-2 col-2 col-form-label">LP</label>
                                    <div class="col-sm-10 col-8">
                                        <input type="text" readonly class="form-control-plaintext" id="staticEmail"
                                            :value="costumeDetail.value.lp">
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="accessories">Tambahan aksesoris</label>
                                <div v-if="alreadySelect">
                                    <span v-if="costumeDetail.value.accessories.length < 1">Kostum tidak ada aksesoris
                                        tambahan</span>
                                    <div v-for="value in costumeDetail.value.accessories"
                                        class="check-input d-flex align-items-center gap-2">
                                        <input @change="onChange($event, value.price)" class="form-check-input mt-0"
                                            type="checkbox" :id="value.id" v-model="accessories" :value="value.id"
                                            aria-label="Aksesories" name="accessories[]" />
                                        <label :for="value.id">{{ value.name }} ( {{ value.price }} )</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="rent_date" class="form-label">Tanggal Sewa Kostum (Kostum dipakai)</label>
                                <input type="date" class="form-control" id="rent_date" name="rent_date" @click="openPicker"
                                    @change="costumeCheck" />
                                <div v-if="available != null" class="mt-3 ps-2 fw-bold fs-5"
                                    :class="available ? 'text-success' : 'text-danger'">

                                    {{
                                        available
                                        ? "Kostum available"
                                        : "Kostum sudah dibook ditangal ini, pilih tanggal / kostum lain"
                                    }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="ship_date" class="form-label">Tanggal Pengiriman Kostum</label>
                                <input type="date" class="form-control" id="ship_date" name="ship_date"
                                    @click="openPicker" />
                            </div>
                            <div class="mb-3">
                                <label for="DP" class="form-label">Total DP yang dibayar (minimal 50k)
                                </label>
                                <input type="text" class="form-control" id="DP" name="DP" />
                            </div>
                            <div class="mb-3">
                                <label for="total_payment" class="form-label">Total Harga</label>
                                <input type="text" class="form-control" id="total_payment" name="total_payment"
                                    :value="total_payment" readonly />
                            </div>
                            <div class="mb-3">
                                <label for="name" class="form-label">Nama</label>
                                <input type="text" class="form-control" id="name" name="name" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                <input type="text" class="form-control" name="email" id="exampleFormControlInput1"
                                    placeholder="name@example.com" />
                            </div>
                            <div class="mb-3">
                                <label for="telp_numb" class="form-label">No telepon</label>
                                <input type="text" class="form-control" id="telp_numb" name="telp_numb" />
                            </div>
                            <div class="mb-3">
                                <label for="whatsapp" class="form-label">No whatsapp</label>
                                <input type="text" class="form-control" id="whatsapp" name="whatsapp" />
                            </div>
                            <div class="mb-3">
                                <label for="instagram" class="form-label">Instagram (aktif no privat)</label>
                                <input type="text" class="form-control" id="instagram" name="instagram" />
                            </div>
                            <div class="mb-3">
                                <label for="address" class="form-label">Alamat Lengkap</label>
                                <textarea class="form-control" id="address" rows="3" name="address"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="family_number1" class="form-label">No Telepon Kerabat 1</label>
                                <input type="text" class="form-control" id="family_number1" name="family_number1" />
                            </div>
                            <div class="mb-3">
                                <label for="family_number2" class="form-label">No Telepon Kerabat 2</label>
                                <input type="text" class="form-control" id="family_number2" name="family_number2" />
                            </div>
                            <div class="mb-3">
                                <label for="post_code" class="form-label">Kode Pos</label>
                                <input type="text" class="form-control" id="post_code" name="post_code" />
                            </div>
                            <div class="mb-3">
                                <label for="KTP_pict" class="form-label">Foto KTP/KK/Kartu Pelajar</label>
                                <input @change="onFileChange($event, 'KTP_pict')" class="form-control" type="file"
                                    id="KTP_pict" name="KTP_pict" />
                                <div v-if="preview.KTP_pict.value" class="preview-img text-center mt-2">
                                    <img :src="preview.KTP_pict.value" class="img-fluid" />
                                    <button class="btn-close" @click="closePreview($event, 'KTP_pict')"></button>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="KTP_selfie" class="form-label">Foto selfie dengan KTP/KK/Kartu Pelajar</label>
                                <input @change="onFileChange($event, 'KTP_selfie')" class="form-control" type="file"
                                    id="KTP_selfie" name="KTP_selfie" />
                                <div v-if="preview.KTP_selfie.value" class="preview-img text-center p-2 mt-2">
                                    <img :src="preview.KTP_selfie.value" class="img-fluid" />
                                    <button class="btn-close" @click="closePreview($event, 'KTP_selfie')"></button>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="payment_pict" class="form-label">Bukti Pembayaran/DP</label>
                                <input @change="onFileChange($event, 'payment_pict')" class="form-control" type="file"
                                    id="payment_pict" name="payment_pict" />
                                <div v-if="preview.payment_pict.value" class="preview-img text-center p-2 mt-2">
                                    <img :src="preview.payment_pict.value" class="img-fluid" />
                                    <button class="btn-close" @click="closePreview($event, 'payment_pict')"></button>
                                </div>
                            </div>
                            <div class="submit text-center mt-4">
                                <button disabled v-if="loading"
                                    class="btn w-75 btn-primary rounded-pill px-4 py-2 border border-dark fw-semibold form-submit">
                                    <div class="lds-dual-ring"></div>
                                </button>
                                <button id="submit" type="submit" v-else
                                    class="btn w-75 btn-primary rounded-pill px-4 py-2 border border-dark fw-semibold form-submit">
                                    Rental
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
