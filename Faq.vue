<script setup>
import { nextTick, ref } from "vue";

const aberto = ref(null);
const respostas = ref([]);

const perguntas = [
    {
        pergunta: "Quais formas de pagamento vocês aceitam?",
        resposta: "Pix, boleto, cartões de crédito e débito."
    },
    {
        pergunta: "Os aparelhos possuem garantia?",
        resposta: "Sim. As condições de garantia podem variar conforme o produto."
    },
    {
        pergunta: "Vocês ajudam a escolher o celular?",
        resposta: "Sim. Nossa equipe pode recomendar um aparelho de acordo com suas necessidades, orçamento e requisições!"
    }
];

async function faq(index) {
    if (aberto.value === index) {
        aberto.value = null;
        return;
    }

    aberto.value = index;
    await nextTick();
}

function altura(index) {
    if (aberto.value !== index) return null;
    const el = respostas.value[index];
    return el ? el.scrollHeight + "px" : "0px";
}
</script>

<template>
    <section class="section" id="faq">
        <div class="section-container">
            <div class="section-header">
                <div class="section-title">
                    <small>DÚVIDAS</small>
                    <h2>Perguntas frequentes.</h2>
                </div>
            </div>

            <div class="faq">
                <div v-for="(item, index) in perguntas" :key="item.pergunta" class="faq-item">
                    <button class="faq-question" @click="faq(index)">
                        {{ item.pergunta }}
                        <span>{{ aberto === index ? "−" : "+" }}</span>
                    </button>
                    <div
                        :ref="(el) => { if (el) respostas[index] = el }"
                        class="faq-answer"
                        :style="{ maxHeight: altura(index) }"
                    >
                        <p>{{ item.resposta }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
