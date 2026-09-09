<script setup>
import { ref } from "vue";
import { useCart, formatarPreco } from "../composables/useCart.js";
import { useWhatsApp } from "../composables/useWhatsApp.js";

defineProps({
    aberto: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(["close"]);
const {
    carrinho,
    total,
    itensDetalhados,
    alterarQuantidade,
    removerDoCarrinho,
    limparCarrinho
} = useCart();
const { finalizarPedido } = useWhatsApp();
const imagensQuebradas = ref({});

function fecharFora(event) {
    if (event.target === event.currentTarget) {
        emit("close");
    }
}

function marcarErro(id) {
    imagensQuebradas.value[id] = true;
}

function checkout() {
    finalizarPedido(carrinho.value);
}
</script>

<template>
    <div v-show="aberto" class="cart-overlay active" @click="fecharFora">
        <div class="cart-panel">
            <div class="cart-header">
                <h2>Seu carrinho</h2>
                <button class="close-cart" @click="emit('close')">×</button>
            </div>

            <div class="cart-items">
                <div v-if="itensDetalhados.length === 0" class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <h3>Seu carrinho está vazio</h3>
                    <p>Adicione alguns celulares para começar sua compra.</p>
                </div>

                <div
                    v-for="item in itensDetalhados"
                    v-else
                    :key="item.id"
                    class="cart-item"
                >
                    <div class="cart-item-image">
                        <img
                            v-show="!imagensQuebradas[item.id]"
                            :src="item.imagem"
                            :alt="item.nome"
                            @error="marcarErro(item.id)"
                        >
                        <div v-show="imagensQuebradas[item.id]" class="cart-item-placeholder">📱</div>
                    </div>

                    <div>
                        <div class="cart-item-name">{{ item.nome }}</div>
                        <div class="cart-item-price">{{ formatarPreco(item.preco) }}</div>

                        <div class="quantity">
                            <button @click="alterarQuantidade(item.id, -1)">−</button>
                            <span>{{ item.quantidade }}</span>
                            <button @click="alterarQuantidade(item.id, 1)">+</button>
                        </div>
                    </div>

                    <button class="remove-item" title="Remover item" @click="removerDoCarrinho(item.id)">
                        🗑
                    </button>
                </div>
            </div>

            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total</span>
                    <strong>{{ formatarPreco(total) }}</strong>
                </div>

                <button class="checkout-button" @click="checkout">
                    💬 Finalizar pedido pelo WhatsApp
                </button>

                <button class="clear-cart" @click="limparCarrinho">
                    Limpar carrinho
                </button>
            </div>
        </div>
    </div>
</template>
