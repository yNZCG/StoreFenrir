import { ref } from "vue";

const isLight = ref(false);

function aplicarTema() {
    if (isLight.value) {
        document.body.classList.add("light-theme");
    } else {
        document.body.classList.remove("light-theme");
    }
}

export function useTheme() {
    function inicializarTema() {
        isLight.value = localStorage.getItem("EveronCellTema") === "light";
        aplicarTema();
    }

    function alternarTema() {
        isLight.value = !isLight.value;
        localStorage.setItem("EveronCellTema", isLight.value ? "light" : "dark");
        aplicarTema();
    }

    return {
        isLight,
        inicializarTema,
        alternarTema
    };
}
