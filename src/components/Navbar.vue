<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-white shadow-sm p-0 fixed-top">
            <div class="container nav-box">
                <a class="navbar-brand d-flex align-items-center" href="#">
                    <img src="@/assets/images/logo.png" alt="Logo" width="30" height="24"
                        class="d-inline-block align-text-top brand" />
                    <span class="text-pink"> Sunnycos-Rent </span>
                </a>
                <button class="navbar-toggler me-3 me-sm-0" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse navbar-box" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-lg-0 px-2">
                        <li class="nav-item me-3 bg-white">
                            <router-link to="#hero" class="ps-3 nav-link d-flex align-items-center active-nav"
                                aria-current="page" id="span-home">Home</router-link>
                        </li>
                        <li class="nav-item me-3 bg-white">
                            <router-link to="#form" class="ps-3 nav-link d-flex align-items-center"
                                id="span-form">Rent</router-link>
                        </li>
                        <li class="nav-item me-3 bg-white">
                            <router-link to="#check" class="ps-3 nav-link d-flex align-items-center" id="span-check">Cek
                                Order</router-link>
                        </li>
                        <li class="nav-item me-3">
                            <router-link to="#return" class="ps-3 nav-link d-flex align-items-center bg-white"
                                id="span-return">Pengembalian</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>