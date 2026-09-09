<script setup>
import { useWhatsApp } from "../composables/useWhatsApp.js";

const { abrirWhatsApp } = useWhatsApp();
</script>

<template>
    <section class="hero" id="inicio">
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-tag">
                    <span> ● </span> Novidades disponíveis
                </div>

                <h1>
                    Seu próximo
                    celular está
                    <span>aqui.</span>
                </h1>

                <p class="hero-description">
                    Smartphones das principais marcas, atendimento especializado e uma experiência de compra pensada para você.
                </p>

                <div class="hero-buttons">
                    <button class="secondary-button" @click="abrirWhatsApp">
                        Falar com especialista
                    </button>
                </div>

                <div class="hero-info">
                    <div class="hero-info-item">✓ Compra segura</div>
                    <div class="hero-info-item">✓ Atendimento especializado</div>
                </div>
            </div>

            <div class="hero-product">
                <div class="glow"></div>
                <div class="big-phone">
                    <span class="phone-wolf-logo">🐺</span>
                </div>
            </div>
        </div>
    </section>
</template>
