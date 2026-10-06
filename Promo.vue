<script setup>
import { useWhatsApp } from "./useWhatsApp.js";
import logoEverOnCell from "./assets/logo-ever-on-cell.png";

const { abrirWhatsApp } = useWhatsApp();
</script>

<template>
    <section class="promo">
        <div class="promo-container">
            <div class="promo-content">
                <small>EVER ON CELL</small>
                <h2>Seu próximo upgrade começa aqui.</h2>
                <p>Não sabe qual celular escolher? Converse com nossa equipe e tenha um atendimento personalizado.</p>
                <button class="primary-button" @click="abrirWhatsApp">
                    Falar com especialista
                </button>
            </div>

            <div class="promo-phone">
                <img :src="logoEverOnCell" alt="Ever On Cell">
            </div>
        </div>
    </section>
</template>
