<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { produtos } from "./produtos.js";
import { useTheme } from "./useTheme.js";

import Header from "./Header.vue";
import Hero from "./Hero.vue";
import Brands from "./Brands.vue";
import ProductSection from "./ProductSection.vue";
import Benefits from "./Benefits.vue";
import Promo from "./Promo.vue";
import Faq from "./Faq.vue";
import FinalCta from "./FinalCta.vue";
import Footer from "./Footer.vue";
import ProductModal from "./ProductModal.vue";
import CartDrawer from "./CartDrawer.vue";
import FloatingButtons from "./FloatingButtons.vue";
import Toast from "./Toast.vue";
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
