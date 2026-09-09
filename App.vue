<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { produtos } from "./data/produtos.js";
import { useTheme } from "./composables/useTheme.js";
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import Brands from "./components/Brands.vue";
import ProductSection from "./components/ProductSection.vue";
import Benefits from "./components/Benefits.vue";
import Promo from "./components/Promo.vue";
import Faq from "./components/Faq.vue";
import FinalCta from "./components/FinalCta.vue";
import Footer from "./components/Footer.vue";
import ProductModal from "./components/ProductModal.vue";
import CartDrawer from "./components/CartDrawer.vue";
import FloatingButtons from "./components/FloatingButtons.vue";
import Toast from "./components/Toast.vue";

const { inicializarTema } = useTheme();

const searchTerm = ref("");
const produtoSelecionado = ref(null);
const carrinhoAberto = ref(false);

function irProdutos() {
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
}

function abrirProduto(id) {
    const produto = produtos.find((item) => item.id === id);
    if (!produto) return;
    produtoSelecionado.value = produto;
}

function fecharProduto() {
    produtoSelecionado.value = null;
}

function abrirCarrinho() {
    carrinhoAberto.value = true;
}

function fecharCarrinho() {
    carrinhoAberto.value = false;
}

function onKeydown(event) {
    if (event.key === "Escape") {
        fecharProduto();
        fecharCarrinho();
    }
}

watch(produtoSelecionado, (produto) => {
    document.body.classList.toggle("modal-open", Boolean(produto));
});

onMounted(() => {
    inicializarTema();
    document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
    document.removeEventListener("keydown", onKeydown);
    document.body.classList.remove("modal-open");
});
</script>

<template>
    <Header
        v-model:search="searchTerm"
        @open-cart="abrirCarrinho"
        @ir-produtos="irProdutos"
    />
    <Hero />
    <Brands />
    <ProductSection :search="searchTerm" @open-product="abrirProduto" />
    <Benefits />
    <Promo />
    <Faq />
    <FinalCta />
    <Footer />
    <ProductModal :produto="produtoSelecionado" @close="fecharProduto" />
    <CartDrawer :aberto="carrinhoAberto" @close="fecharCarrinho" />
    <FloatingButtons />
    <Toast />
</template>
