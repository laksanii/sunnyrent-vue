<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'

onMounted(() => {
  const popper = document.createElement("script");
  popper.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
  );
  document.head.appendChild(popper);
})
</script>

<template>
  <RouterView />
</template>

