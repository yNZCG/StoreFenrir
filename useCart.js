import { computed, ref } from "vue";
import { produtos } from "../data/produtos.js";

const carrinho = ref(JSON.parse(localStorage.getItem("fenrirCarrinho")) || []);
const toastTexto = ref("Produto adicionado ao carrinho!");
const toastVisivel = ref(false);
let toastTimer = null;

export function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

export function useCart() {
    const quantidadeTotal = computed(() =>
        carrinho.value.reduce((soma, item) => soma + item.quantidade, 0)
    );

    const total = computed(() =>
        carrinho.value.reduce((soma, item) => {
            const produto = produtos.find((p) => p.id === item.id);
            return produto ? soma + produto.preco * item.quantidade : soma;
        }, 0)
    );

    const itensDetalhados = computed(() =>
        carrinho.value
            .map((item) => {
                const produto = produtos.find((p) => p.id === item.id);
                if (!produto) return null;
                return { ...produto, quantidade: item.quantidade };
            })
            .filter(Boolean)
    );

    function salvarCarrinho() {
        localStorage.setItem("fenrirCarrinho", JSON.stringify(carrinho.value));
    }

    function mostrarToast(texto) {
        toastTexto.value = texto;
        toastVisivel.value = true;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toastVisivel.value = false;
        }, 2500);
    }

    function adicionarAoCarrinho(id) {
        const produto = produtos.find((item) => item.id === id);
        if (!produto) return;

        const existente = carrinho.value.find((item) => item.id === id);

        if (existente) {
            existente.quantidade++;
        } else {
            carrinho.value.push({ id: produto.id, quantidade: 1 });
        }

        salvarCarrinho();
        mostrarToast(produto.nome + " foi adicionado ao carrinho!");
    }

    function alterarQuantidade(id, alteracao) {
        const item = carrinho.value.find((produto) => produto.id === id);
        if (!item) return;

        item.quantidade += alteracao;

        if (item.quantidade <= 0) {
            carrinho.value = carrinho.value.filter((produto) => produto.id !== id);
        }

        salvarCarrinho();
    }

    function removerDoCarrinho(id) {
        carrinho.value = carrinho.value.filter((item) => item.id !== id);
        salvarCarrinho();
    }

    function limparCarrinho() {
        if (carrinho.value.length === 0) return;
        if (!confirm("Tem certeza que deseja limpar o carrinho?")) return;

        carrinho.value = [];
        salvarCarrinho();
    }

    return {
        carrinho,
        quantidadeTotal,
        total,
        itensDetalhados,
        toastTexto,
        toastVisivel,
        formatarPreco,
        adicionarAoCarrinho,
        alterarQuantidade,
        removerDoCarrinho,
        limparCarrinho,
        mostrarToast
    };
}
