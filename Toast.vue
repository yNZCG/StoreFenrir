<script setup>
import { useCart } from "./useCart.js";

const { toastTexto, toastVisivel } = useCart();
</script>

<template>
    <div class="toast" :class="{ show: toastVisivel }">
        {{ toastTexto }}
    </div>
</template>
