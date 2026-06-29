/* =========================
   BRACKET - FIFA WORLD CUP 2026 SIMULATOR
   ========================= */

let state = {
    round16: [],
    quarter: [],
    semi: [],
    final: [],
    champion: null
};

/* =========================
   INICIAR O BRACKET
   ========================= */

function initBracket() {
    const shuffled = shuffleTeams();

    state.round16 = [];

    for (let i = 0; i < shuffled.length; i += 2) {
        state.round16.push({
            teamA: shuffled[i],
            teamB: shuffled[i + 1],
            winner: null
        });
    }

    renderBracket();
}

/* =========================
   RENDERIZAÇÃO
   ========================= */

function renderBracket() {
    renderRound("round16", state.round16);
    renderRound("quarterfinals", state.quarter);
    renderRound("semifinals", state.semi);
    renderRound("final", state.final);

    renderChampion();
}

/* =========================
   RENDER DE UMA FASE
   ========================= */

function renderRound(containerId, matches) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    matches.forEach((match, index) => {
        const div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <div class="team" onclick="selectWinner('${containerId}', ${index}, 'A')">
                <span>🇺🇳 ${match.teamA.name}</span>
            </div>

            <div class="team" onclick="selectWinner('${containerId}', ${index}, 'B')">
                <span>🇺🇳 ${match.teamB.name}</span>
            </div>

            <div class="score">
                ${match.winner ? "✔ Vencedor: " + match.winner.name : "Clique para escolher"}
            </div>
        `;

        container.appendChild(div);
    });
}

/* =========================
   ESCOLHER VENCEDOR MANUAL
   ========================= */

function selectWinner(stage, index, team) {
    const match = state[stage === "round16" ? "round16" :
                        stage === "quarterfinals" ? "quarter" :
                        stage === "semifinals" ? "semi" : "final"][index];

    match.winner = team === "A" ? match.teamA : match.teamB;

    updateProgress();
}

/* =========================
   AVANÇAR FASES
   ========================= */

function updateProgress() {

    // QUARTAS
    if (state.round16.every(m => m.winner)) {
        state.quarter = createNextRound(state.round16);
    }

    // SEMI
    if (state.quarter.length && state.quarter.every(m => m.winner)) {
        state.semi = createNextRound(state.quarter);
    }

    // FINAL
    if (state.semi.length && state.semi.every(m => m.winner)) {
        state.final = createNextRound(state.semi);
    }

    // CAMPEÃO
    if (state.final.length && state.final.every(m => m.winner)) {
        state.champion = state.final[0].winner;
    }

    renderBracket();
}

/* =========================
   CRIAR PRÓXIMA FASE
   ========================= */

function createNextRound(prevRound) {
    const winners = prevRound.map(m => m.winner);

    const next = [];

    for (let i = 0; i < winners.length; i += 2) {
        next.push({
            teamA: winners[i],
            teamB: winners[i + 1],
            winner: null
        });
    }

    return next;
}

/* =========================
   MOSTRAR CAMPEÃO
   ========================= */

function renderChampion() {
    const name = document.getElementById("championName");

    if (!name) return;

    if (state.champion) {
        name.innerText = `🏆 ${state.champion.name}`;
    } else {
        name.innerText = "Aguardando definição...";
    }
}

/* =========================
   RESET
   ========================= */

function resetBracket() {
    state = {
        round16: [],
        quarter: [],
        semi: [],
        final: [],
        champion: null
    };

    initBracket();
}

/* =========================
   AUTO INICIAR
   ========================= */

initBracket();