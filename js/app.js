/* =========================
   APP - FIFA WORLD CUP 2026 SIMULATOR
   CONTROLE GERAL DA APLICAÇÃO
   ========================= */

/* =========================
   ELEMENTOS DA UI
   ========================= */

const btnSimulateAll = document.getElementById("simulateAll");
const btnRandom = document.getElementById("random");
const btnReset = document.getElementById("reset");
const btnSave = document.getElementById("save");
const btnShare = document.getElementById("share");
const btnPDF = document.getElementById("pdf");

/* =========================
   INICIALIZAÇÃO
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
    initBracket();
    bindEvents();
    loadSaved();
});

/* =========================
   EVENTOS DOS BOTÕES
   ========================= */

function bindEvents() {

    if (btnSimulateAll) {
        btnSimulateAll.addEventListener("click", () => {
            simulateAll();
        });
    }

    if (btnRandom) {
        btnRandom.addEventListener("click", () => {
            resetBracket();
            setTimeout(() => simulateAll(), 300);
        });
    }

    if (btnReset) {
        btnReset.addEventListener("click", () => {
            resetBracket();
        });
    }

    if (btnSave) {
        btnSave.addEventListener("click", () => {
            saveState();
        });
    }

    if (btnShare) {
        btnShare.addEventListener("click", () => {
            shareResult();
        });
    }

    if (btnPDF) {
        btnPDF.addEventListener("click", () => {
            exportPDF();
        });
    }
}

/* =========================
   SALVAR NO LOCALSTORAGE
   ========================= */

function saveState() {
    localStorage.setItem("worldcup2026", JSON.stringify(state));
    alert("Progresso salvo com sucesso!");
}

/* =========================
   CARREGAR SALVO
   ========================= */

function loadSaved() {
    const saved = localStorage.getItem("worldcup2026");

    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.assign(state, data);
            renderBracket();
        } catch (e) {
            console.error("Erro ao carregar dados salvos", e);
        }
    }
}

/* =========================
   COMPARTILHAR RESULTADO
   ========================= */

function shareResult() {
    if (!state.champion) {
        alert("Finalize o torneio antes de compartilhar!");
        return;
    }

    const text = `🏆 Meu campeão da Copa 2026 é: ${state.champion.name}!`;

    if (navigator.share) {
        navigator.share({
            title: "Simulador Copa 2026",
            text: text,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(text);
        alert("Resultado copiado para a área de transferência!");
    }
}

/* =========================
   EXPORTAR PDF (BÁSICO)
   ========================= */

function exportPDF() {
    const content = document.body.innerHTML;

    const win = window.open("", "", "width=900,height=700");
    win.document.write(`
        <html>
        <head>
            <title>Resultado Copa 2026</title>
            <style>
                body { font-family: Arial; padding: 20px; }
                h1 { text-align: center; }
            </style>
        </head>
        <body>
            <h1>Simulador Copa do Mundo FIFA 2026</h1>
            <p>Campeão: ${state.champion ? state.champion.name : "Não definido"}</p>
        </body>
        </html>
    `);

    win.document.close();
    win.print();
}

/* =========================
   ATALHOS DE TECLADO
   ========================= */

document.addEventListener("keydown", (e) => {

    // S = simular tudo
    if (e.key.toLowerCase() === "s") {
        simulateAll();
    }

    // R = reset
    if (e.key.toLowerCase() === "r") {
        resetBracket();
    }
});