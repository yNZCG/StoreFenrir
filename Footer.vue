<script setup>
import { useWhatsApp } from "../composables/useWhatsApp.js";

const { abrirWhatsApp } = useWhatsApp();
</script>

<template>
    <footer>
        <div class="footer-grid">
            <div>
                <div class="footer-logo">
                    <span>🐺</span> Fenrir <span>Store</span>
                </div>
                <p class="footer-description">
                    Smartphones, tecnologia e atendimento especializado para você fazer a escolha certa.
                </p>
            </div>

            <div>
                <h4>Loja</h4>
                <a href="#produtos">Celulares</a>
                <a href="#beneficios">Por que Fenrir?</a>
                <a href="#faq">Dúvidas</a>
            </div>

            <div>
                <h4>Atendimento</h4>
                <a href="#" @click.prevent="abrirWhatsApp">WhatsApp</a>
                <a href="#">Instagram</a>
                <a href="#">Contato</a>
            </div>

            <div>
                <h4>Informações</h4>
                <a href="#">Termos de uso</a>
                <a href="#">Privacidade</a>
                <a href="#">Trocas e devoluções</a>
            </div>
        </div>

        <div class="footer-bottom">
            © 2026 Fenrir Store — Todos os direitos reservados.
        </div>
    </footer>
</template>
