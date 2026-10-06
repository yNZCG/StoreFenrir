<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useWhatsApp } from "./useWhatsApp.js";

const { abrirWhatsApp } = useWhatsApp();

const stageRef = ref(null);
const phoneRef = ref(null);

// ---- Relógio e data reais, na tela do celular do hero ----
const agora = ref(new Date());
let relogioTimer = null;

const horaFormatada = computed(() => {
    const h = String(agora.value.getHours()).padStart(2, "0");
    const m = String(agora.value.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
});

const dataFormatada = computed(() => {
    const texto = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long"
    }).format(agora.value);
    return texto.charAt(0).toUpperCase() + texto.slice(1);
});

// ---- Clima real (Brasília — mesmo DDD do WhatsApp da loja), via Open-Meteo ----
const temperatura = ref(null);
const condicao = ref("sol"); // "sol" | "nuvem" | "chuva"

function mapearCondicao(codigo) {
    if (codigo === 0 || codigo === 1) return "sol";
    if (codigo >= 51) return "chuva";
    return "nuvem";
}

async function buscarClima() {
    try {
        const resposta = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=-15.7801&longitude=-47.9292&current_weather=true"
        );
        const dados = await resposta.json();
        if (!dados?.current_weather) return;
        temperatura.value = Math.round(dados.current_weather.temperature);
        condicao.value = mapearCondicao(dados.current_weather.weathercode);
    } catch (erro) {
        // Falha silenciosa — a tela mantém o placeholder "--°"
    }
}

const baseRy = -18;
const baseRx = 4;

function aplicarTilt(ry, rx) {
    if (!phoneRef.value) return;
    phoneRef.value.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg)`;
}

function onMouseMove(event) {
    if (!stageRef.value) return;
    const rect = stageRef.value.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    aplicarTilt(baseRy + px * 22, baseRx - py * 12);
}

function onMouseLeave() {
    aplicarTilt(baseRy, baseRx);
}

let tiltAtivo = false;

onMounted(() => {
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const telaGrande = window.matchMedia("(min-width: 981px)").matches;

    if (!semMovimento && telaGrande && stageRef.value) {
        stageRef.value.addEventListener("mousemove", onMouseMove);
        stageRef.value.addEventListener("mouseleave", onMouseLeave);
        tiltAtivo = true;
    }

    relogioTimer = setInterval(() => {
        agora.value = new Date();
    }, 1000);

    buscarClima();
});

onUnmounted(() => {
    clearInterval(relogioTimer);

    if (tiltAtivo && stageRef.value) {
        stageRef.value.removeEventListener("mousemove", onMouseMove);
        stageRef.value.removeEventListener("mouseleave", onMouseLeave);
    }
});
</script>

<template>
    <section class="hero" id="inicio">
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-tag">
                    <span> ● </span> Novidades disponíveis
                </div>

                <h1>
                    Seu próximo
                    celular está
                    <span>aqui.</span>
                </h1>

                <p class="hero-description">
                    Smartphones das principais marcas, atendimento especializado e uma experiência de compra pensada para você.
                </p>

                <div class="hero-buttons">
                    <button class="secondary-button" @click="abrirWhatsApp">
                        Falar com especialista
                    </button>
                </div>

                <div class="hero-info">
                    <div class="hero-info-item">✓ Compra segura</div>
                    <div class="hero-info-item">✓ Atendimento especializado</div>
                </div>
            </div>

            <div class="hero-product" ref="stageRef">
                <div class="beam"></div>
                <div class="hotspot"></div>
                <div class="floor-glow"></div>
                <div class="ring spin"></div>

                <div class="phone-float">
                    <div class="phone-wrap">
                        <div class="phone" ref="phoneRef">
                            <div class="phone-edge">
                                <div class="btn-vol"></div>
                                <div class="btn-vol two"></div>
                                <div class="btn-power"></div>
                            </div>

                            <div class="phone-front">
                                <svg viewBox="0 0 260 540" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#d9d9dd"/>
                                            <stop offset="14%" stop-color="#a3a3ab"/>
                                            <stop offset="36%" stop-color="#6a6a70"/>
                                            <stop offset="58%" stop-color="#3a3a3e"/>
                                            <stop offset="80%" stop-color="#1a1a1c"/>
                                            <stop offset="100%" stop-color="#040405"/>
                                        </linearGradient>
                                        <linearGradient id="screenGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                                            <stop offset="0%" stop-color="#5c2430"/>
                                            <stop offset="45%" stop-color="#2a1016"/>
                                            <stop offset="100%" stop-color="#0a0506"/>
                                        </linearGradient>
                                        <linearGradient id="widgetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.14"/>
                                            <stop offset="100%" stop-color="#ffffff" stop-opacity="0.03"/>
                                        </linearGradient>
                                        <linearGradient id="glassSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
                                            <stop offset="42%" stop-color="#ffffff" stop-opacity="0"/>
                                            <stop offset="50%" stop-color="#ffffff" stop-opacity="0.16"/>
                                            <stop offset="58%" stop-color="#ffffff" stop-opacity="0"/>
                                            <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
                                        </linearGradient>
                                        <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
                                            <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
                                            <stop offset="100%" stop-color="#000000" stop-opacity="0.45"/>
                                        </radialGradient>
                                        <clipPath id="screenClip">
                                            <rect x="9" y="9" width="242" height="522" rx="38"/>
                                        </clipPath>
                                    </defs>

                                    <rect x="0" y="0" width="260" height="540" rx="46" fill="url(#frameGrad)"/>
                                    <rect x="1.2" y="1.2" width="257.6" height="537.6" rx="45" fill="none" stroke="#ffffff" stroke-opacity="0.14" stroke-width="1"/>
                                    <path d="M46 3 A43 43 0 0 0 3 46" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.4" fill="none" stroke-linecap="round"/>

                                    <g clip-path="url(#screenClip)">
                                        <rect x="9" y="9" width="242" height="522" fill="url(#screenGrad)"/>

                                        <text x="26" y="30" font-family="Arial, Helvetica, sans-serif" font-size="13" fill="#ffffff" fill-opacity="0.92">{{ horaFormatada }}</text>
                                        <rect x="196" y="24" width="3" height="6" rx="1" fill="#fff" fill-opacity="0.85"/>
                                        <rect x="201" y="21" width="3" height="9" rx="1" fill="#fff" fill-opacity="0.85"/>
                                        <rect x="206" y="18" width="3" height="12" rx="1" fill="#fff" fill-opacity="0.85"/>
                                        <path d="M215 27 Q221 20 227 27" stroke="#fff" stroke-opacity="0.85" stroke-width="1.6" fill="none" stroke-linecap="round"/>
                                        <path d="M218 29.5 Q221 26 224 29.5" stroke="#fff" stroke-opacity="0.85" stroke-width="1.6" fill="none" stroke-linecap="round"/>
                                        <rect x="232" y="20" width="19" height="10" rx="2.5" fill="none" stroke="#fff" stroke-opacity="0.85" stroke-width="1.2"/>
                                        <rect x="234" y="22" width="13" height="6" rx="1.2" fill="#fff" fill-opacity="0.85"/>
                                        <rect x="251.5" y="23.5" width="1.6" height="3" rx="0.8" fill="#fff" fill-opacity="0.85"/>

                                        <rect x="95" y="15" width="70" height="18" rx="9" fill="#050505"/>
                                        <circle cx="150" cy="24" r="3" fill="#111315" stroke="#ffffff" stroke-opacity="0.12"/>

                                        <text x="130" y="185" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="300" letter-spacing="-1" fill="#ffffff">{{ horaFormatada }}</text>
                                        <text x="130" y="209" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="600" fill="#ffffff" fill-opacity="0.82">{{ dataFormatada }}</text>

                                        <rect x="95" y="226" width="70" height="30" rx="15" fill="url(#widgetGrad)" stroke="#ffffff" stroke-opacity="0.10"/>
                                        <circle v-if="condicao === 'sol'" cx="109" cy="241" r="6" fill="#fbbf24" fill-opacity="0.9"/>
                                        <g v-else-if="condicao === 'chuva'">
                                            <ellipse cx="106" cy="238" rx="7" ry="5" fill="#a1a1aa" fill-opacity="0.9"/>
                                            <ellipse cx="112" cy="236" rx="5" ry="4" fill="#a1a1aa" fill-opacity="0.9"/>
                                            <line x1="105" y1="246" x2="103" y2="250" stroke="#60a5fa" stroke-width="1.5" stroke-linecap="round"/>
                                            <line x1="111" y1="246" x2="109" y2="250" stroke="#60a5fa" stroke-width="1.5" stroke-linecap="round"/>
                                        </g>
                                        <g v-else>
                                            <ellipse cx="106" cy="241" rx="7" ry="5" fill="#d4d4d8" fill-opacity="0.85"/>
                                            <ellipse cx="112" cy="238" rx="5" ry="4" fill="#d4d4d8" fill-opacity="0.85"/>
                                        </g>
                                        <text x="122" y="246" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" fill="#ffffff" fill-opacity="0.9">{{ temperatura !== null ? temperatura + "°" : "--°" }}</text>

                                        <circle cx="50" cy="478" r="24" fill="url(#widgetGrad)" stroke="#ffffff" stroke-opacity="0.12"/>
                                        <path d="M53 467 L44 480 L49 480 L46 491 L57 476 L51 476 Z" fill="#ffffff" fill-opacity="0.9"/>

                                        <circle cx="210" cy="478" r="24" fill="url(#widgetGrad)" stroke="#ffffff" stroke-opacity="0.12"/>
                                        <rect x="199" y="471" width="22" height="15" rx="4" fill="#ffffff" fill-opacity="0.9"/>
                                        <rect x="206" y="466" width="8" height="6" rx="2" fill="#ffffff" fill-opacity="0.9"/>
                                        <circle cx="210" cy="479" r="5" fill="#2a1016"/>
                                        <circle cx="208" cy="477" r="1.3" fill="#ffffff" fill-opacity="0.7"/>

                                        <rect x="85" y="519" width="90" height="4" rx="2" fill="#ffffff" fill-opacity="0.5"/>

                                        <rect x="9" y="9" width="242" height="522" fill="url(#glassSheen)"/>
                                        <rect x="9" y="9" width="242" height="522" fill="url(#vignette)"/>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div class="reflection">
                            <svg viewBox="0 0 260 540" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0" y="0" width="260" height="540" rx="46" fill="url(#frameGrad)"/>
                                <rect x="9" y="9" width="242" height="522" rx="38" fill="url(#screenGrad)"/>
                                <rect x="95" y="15" width="70" height="18" rx="9" fill="#050505"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
