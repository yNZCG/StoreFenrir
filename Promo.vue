<script setup>
import { useWhatsApp } from "../composables/useWhatsApp.js";

const { abrirWhatsApp } = useWhatsApp();
</script>

<template>
    <section class="promo">
        <div class="promo-container">
            <div class="promo-content">
                <small>FENRIR STORE</small>
                <h2>Seu próximo upgrade começa aqui.</h2>
                <p>Não sabe qual celular escolher? Converse com nossa equipe e tenha um atendimento personalizado.</p>
                <button class="primary-button" @click="abrirWhatsApp">
                    Falar com especialista
                </button>
            </div>

            <div class="promo-phone">
                📱
            </div>
        </div>
    </section>
</template>
