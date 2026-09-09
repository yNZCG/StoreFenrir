<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { WHATSAPP } from "../composables/useWhatsApp.js";

const mostrarTopo = ref(false);

function onScroll() {
    mostrarTopo.value = window.scrollY > 600;
}

function topo() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
    window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
});
</script>

<template>
    <a
        :href="'https://wa.me/' + WHATSAPP"
        target="_blank"
        class="whatsapp"
        title="Falar no WhatsApp"
    >
        💬
    </a>

    <button class="top" :class="{ show: mostrarTopo }" title="Voltar ao topo" @click="topo">
        ↑
    </button>
</template>
