import { produtos } from "../data/produtos.js";
import { formatarPreco } from "./useCart.js";

export const WHATSAPP = "5561998120366";

export function useWhatsApp() {
    function abrirWhatsApp() {
        const mensagem = "Olá! Vim pelo site da Fenrir Store e gostaria de conhecer os celulares disponíveis.";
        window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensagem), "_blank");
    }

    function comprarAgora(produto) {
        if (!produto) return;

        const mensagem =
`Olá! Tenho interesse em comprar:

📱 ${produto.nome}
💰 ${formatarPreco(produto.preco)}

Gostaria de saber como posso finalizar a compra.`;

        window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensagem), "_blank");
    }

    function finalizarPedido(carrinho) {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio.");
            return;
        }

        let mensagem = "Olá! Gostaria de fazer um pedido na Fenrir Store:%0A%0A";
        let total = 0;

        carrinho.forEach((item) => {
            const produto = produtos.find((p) => p.id === item.id);
            if (!produto) return;

            const subtotal = produto.preco * item.quantidade;
            total += subtotal;

            mensagem +=
            `📱 ${produto.nome}%0A` +
            `Quantidade: ${item.quantidade}%0A` +
            `Valor: ${formatarPreco(subtotal)}%0A%0A`;
        });

        mensagem += `💰 TOTAL: ${formatarPreco(total)}%0A%0A`;
        mensagem += "Gostaria de saber as opções para finalizar a compra.";

        window.open("https://wa.me/" + WHATSAPP + "?text=" + mensagem, "_blank");
    }

    return {
        WHATSAPP,
        abrirWhatsApp,
        comprarAgora,
        finalizarPedido
    };
}
