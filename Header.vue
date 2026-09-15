<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useTheme } from "./useTheme.js";
import { useCart } from "./useCart.js";

const search = defineModel("search", { type: String, default: "" });
const emit = defineEmits(["open-cart", "ir-produtos"]);

const { isLight, alternarTema } = useTheme();
const { quantidadeTotal } = useCart();

const menuAberto = ref(false);
const escondido = ref(false);

let ultimoScrollY = 0;

function onScroll() {
    const scrollAtual = window.scrollY;

    if (scrollAtual > ultimoScrollY && scrollAtual > 80) {
        escondido.value = true;
    } else {
        escondido.value = false;
    }

    ultimoScrollY = scrollAtual;
}

onMounted(() => {
    ultimoScrollY = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
});

function onSearchKeydown(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        emit("ir-produtos");
    }
}

function toggleMenu() {
    menuAberto.value = !menuAberto.value;
}

function fecharMenu() {
    menuAberto.value = false;
}
</script>

<template>
    <header class="header" :class="{ 'header--escondido': escondido }">
        <div class="header-container">
            <a href="#inicio" class="logo" @click="fecharMenu">
                <svg class="logo-badge" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#a1a1aa" />
                            <stop offset="50%" stop-color="#52525b" />
                            <stop offset="100%" stop-color="#18181b" />
                        </linearGradient>
                    </defs>
                    <rect x="1" y="1" width="30" height="38" rx="8" fill="url(#logoGrad)" stroke="#a1a1aa" stroke-width="1" />
                    <rect x="11" y="4.5" width="10" height="2.2" rx="1.1" fill="#27272a" />
                    <text x="16" y="25" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="10.5" font-weight="800" letter-spacing="0.5" fill="#f4f4f5">EOC</text>
                    <rect x="12.5" y="34" width="7" height="1.4" rx="0.7" fill="#a1a1aa" opacity="0.6" />
                </svg>
                Ever on Cell  <span>Store</span>
            </a>

            <nav class="nav" :class="{ open: menuAberto }">
                <a href="#inicio" @click="fecharMenu">Início</a>
                <a href="#produtos" @click="fecharMenu">Celulares</a>
                <a href="#beneficios" @click="fecharMenu">Por que Ever on Cell?</a>
                <a href="#faq" @click="fecharMenu">Dúvidas</a>
            </nav>

            <div class="header-actions">
                <div class="search-box">
                    <span class="search-icon">⌕</span>
                    <input
                        v-model="search"
                        type="text"
                        class="search-input"
                        placeholder="Buscar celular..."
                        @keydown="onSearchKeydown"
                    >
                </div>

                <button class="theme-toggle" title="Alternar Tema" @click="alternarTema">
                    {{ isLight ? "☀️" : "🌙" }}
                </button>

                <button class="cart-button" @click="emit('open-cart')">
                    🛒
                    <span class="cart-text">Carrinho</span>
                    <span class="cart-count">{{ quantidadeTotal }}</span>
                </button>

                <button class="menu-button" @click="toggleMenu">
                    ☰
                </button>
            </div>
        </div>
    </header>
</template>
