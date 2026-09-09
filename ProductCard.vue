<script setup>
import { ref } from "vue";
import { useCart, formatarPreco } from "../composables/useCart.js";

const props = defineProps({
    produto: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(["open-product"]);
const { adicionarAoCarrinho } = useCart();
const imagemQuebrou = ref(false);

function badge(id) {
    return id <= 2 ? "DESTAQUE" : "OFERTA";
}

function comprar(event) {
    event.stopPropagation();
    adicionarAoCarrinho(props.produto.id);
}
</script>

<template>
    <div class="product" :data-brand="produto.categoria" @click="emit('open-product', produto.id)">
        <div class="product-image">
            <div class="product-badge">
                {{ badge(produto.id) }}
            </div>

            <img
                v-show="!imagemQuebrou"
                :src="produto.imagem"
                :alt="produto.nome"
                @error="imagemQuebrou = true"
            >

            <div v-show="imagemQuebrou" class="product-placeholder">
                📱
            </div>
        </div>

        <div class="product-content">
            <div>
                <div class="product-brand">{{ produto.marca }}</div>
                <h3 class="product-name">{{ produto.nome }}</h3>
                <p class="product-spec">
                    {{ produto.especificacoes["Armazenamento"] }} • {{ produto.especificacoes["RAM"] }} RAM
                </p>
            </div>

            <div class="product-bottom">
                <div class="product-price">{{ formatarPreco(produto.preco) }}</div>
                <button
                    class="product-buy"
                    title="Adicionar ao Carrinho"
                    @click="comprar"
                >
                    🛒
                </button>
            </div>
        </div>
    </div>
</template>
