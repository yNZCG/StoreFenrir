<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useTheme } from "../composables/useTheme.js";
import { useCart } from "../composables/useCart.js";

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
                <span class="logo-wolf">🐺</span> Fenrir <span>Store</span>
            </a>

            <nav class="nav" :class="{ open: menuAberto }">
                <a href="#inicio" @click="fecharMenu">Início</a>
                <a href="#produtos" @click="fecharMenu">Celulares</a>
                <a href="#beneficios" @click="fecharMenu">Por que Fenrir?</a>
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
