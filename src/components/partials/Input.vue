<script setup>
defineProps({
    labelText: String,
    type: String,

})
</script>

<template>
    <div class="mb-3">
        <label for="name" class="form-label">Nama</label>
        <input type="text" class="form-control" id="name" name="name" />
    </div>
</template>