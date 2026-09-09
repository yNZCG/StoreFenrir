<script setup>
import { ref, watch } from "vue";
import { useCart, formatarPreco } from "../composables/useCart.js";
import { useWhatsApp } from "../composables/useWhatsApp.js";

const props = defineProps({
    produto: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(["close"]);
const { adicionarAoCarrinho } = useCart();
const { comprarAgora } = useWhatsApp();
const imagemQuebrou = ref(false);

watch(
    () => props.produto,
    () => {
        imagemQuebrou.value = false;
    }
);

function fecharFora(event) {
    if (event.target === event.currentTarget) {
        emit("close");
    }
}

function adicionarProdutoModal() {
    if (!props.produto) return;
    adicionarAoCarrinho(props.produto.id);
}

function comprar() {
    comprarAgora(props.produto);
}
</script>

<template>
    <div v-if="produto" class="modal-overlay active" @click="fecharFora">
        <div class="product-modal">
            <button class="close-modal" @click="emit('close')">×</button>

            <div class="modal-content">
                <div class="modal-image">
                    <img
                        v-show="!imagemQuebrou"
                        :src="produto.imagem"
                        :alt="produto.nome"
                        @error="imagemQuebrou = true"
                    >
                    <div v-show="imagemQuebrou" class="modal-placeholder">📱</div>
                </div>

                <div class="modal-info">
                    <div class="modal-brand">{{ produto.marca }}</div>
                    <h2>{{ produto.nome }}</h2>
                    <p>{{ produto.descricao }}</p>

                    <div class="modal-price">{{ formatarPreco(produto.preco) }}</div>
                    <div class="spec-list">
                        <div
                            v-for="(valor, nome) in produto.especificacoes"
                            :key="nome"
                            class="spec"
                        >
                            <small>{{ nome }}</small>
                            <strong>{{ valor }}</strong>
                        </div>
                    </div>

                    <div class="modal-buttons">
                        <button class="modal-cart" @click="adicionarProdutoModal">
                            🛒 Adicionar ao carrinho
                        </button>
                        <button class="modal-buy" @click="comprar">
                            Comprar agora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
