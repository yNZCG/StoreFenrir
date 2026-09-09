<script setup>
import { useWhatsApp } from "../composables/useWhatsApp.js";

const { abrirWhatsApp } = useWhatsApp();
</script>

<template>
    <section class="final-cta">
        <h2>Vamos encontrar seu próximo celular?</h2>
        <p>Nossa equipe está pronta para ajudar você.</p>
        <button class="final-button" @click="abrirWhatsApp">
            Falar com a Fenrir
        </button>
    </section>
</template>
