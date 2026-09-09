<script setup>
import { computed, ref } from "vue";
import { produtos } from "../data/produtos.js";
import ProductCard from "./ProductCard.vue";

const props = defineProps({
    search: {
        type: String,
        default: ""
    }
});

const emit = defineEmits(["open-product"]);

const filtroCategoriaAtual = ref("todos");
const filtros = [
    { id: "todos", label: "Todos" },
    { id: "apple", label: "Apple" },
    { id: "samsung", label: "Samsung" },
    { id: "xiaomi", label: "Xiaomi" },
    { id: "motorola", label: "Motorola" }
];

const lista = computed(() => {
    const termo = props.search.toLowerCase().trim();

    return produtos.filter((produto) => {
        const atendeCategoria = filtroCategoriaAtual.value === "todos" || produto.categoria === filtroCategoriaAtual.value;
        const atendeBusca = produto.nome.toLowerCase().includes(termo) || produto.marca.toLowerCase().includes(termo);
        return atendeCategoria && atendeBusca;
    });
});

function filtrar(marca) {
    filtroCategoriaAtual.value = marca;
}
</script>

<template>
    <section class="section" id="produtos">
        <div class="section-container">
            <div class="section-header">
                <div class="section-title">
                    <small>ESCOLHA SEU SMARTPHONE</small>
                    <h2>Mais vendidos</h2>
                    <p>Clique em qualquer aparelho para ver todos os detalhes.</p>
                </div>
            </div>

            <div class="filters">
                <button
                    v-for="filtro in filtros"
                    :key="filtro.id"
                    class="filter"
                    :class="{ active: filtroCategoriaAtual === filtro.id }"
                    @click="filtrar(filtro.id)"
                >
                    {{ filtro.label }}
                </button>
            </div>

            <div class="products">
                <div v-if="lista.length === 0" class="no-results">
                    <h3>Nenhum aparelho encontrado</h3>
                    <p>Tente buscar por outro termo ou selecione outra marca.</p>
                </div>

                <ProductCard
                    v-for="produto in lista"
                    :key="produto.id"
                    :produto="produto"
                    @open-product="emit('open-product', $event)"
                />
            </div>
        </div>
    </section>
</template>
