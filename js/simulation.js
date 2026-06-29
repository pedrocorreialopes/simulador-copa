/* =========================
   SIMULATION - FIFA WORLD CUP 2026 SIMULATOR
   ========================= */

/* =========================
   GERAR RESULTADO DE JOGO
   (COM BASE EM FORÇA + ALEATORIEDADE)
   ========================= */

function simulateMatch(teamA, teamB) {
    const prob = getWinProbability(teamA, teamB);

    let goalsA = Math.floor(Math.random() * 5);
    let goalsB = Math.floor(Math.random() * 5);

    const randomFactor = Math.random();

    // Ajuste baseado na força
    if (randomFactor < prob.teamA) {
        goalsA += 1;
    } else {
        goalsB += 1;
    }

    // Evitar empate em fases eliminatórias
    if (goalsA === goalsB) {
        if (Math.random() > 0.5) {
            goalsA++;
        } else {
            goalsB++;
        }
    }

    return {
        teamA,
        teamB,
        goalsA,
        goalsB,
        winner: goalsA > goalsB ? teamA : teamB
    };
}

/* =========================
   SIMULAR UMA FASE
   ========================= */

function simulateRound(roundName) {
    state[roundName] = state[roundName].map(match => {
        const result = simulateMatch(match.teamA, match.teamB);

        return {
            teamA: result.teamA,
            teamB: result.teamB,
            goalsA: result.goalsA,
            goalsB: result.goalsB,
            winner: result.winner
        };
    });

    updateProgress();
}

/* =========================
   SIMULAR TORNEIO COMPLETO
   ========================= */

function simulateAll() {

    // Oitavas
    state.round16 = createSimulatedRound(state.round16);

    // Quartas
    state.quarter = createSimulatedRound(createNextRound(state.round16));

    // Semifinais
    state.semi = createSimulatedRound(createNextRound(state.quarter));

    // Final
    state.final = createSimulatedRound(createNextRound(state.semi));

    // Campeão
    state.champion = state.final[0].winner;

    renderBracket();
}

/* =========================
   CRIAR FASE SIMULADA
   ========================= */

function createSimulatedRound(matches) {
    return matches.map(match => {
        const result = simulateMatch(match.teamA, match.teamB);

        return {
            teamA: result.teamA,
            teamB: result.teamB,
            goalsA: result.goalsA,
            goalsB: result.goalsB,
            winner: result.winner
        };
    });
}

/* =========================
   PRORROGAÇÃO (EXTRA REALISMO)
   ========================= */

function extraTime(teamA, teamB) {
    const chanceA = teamA.strength / (teamA.strength + teamB.strength);

    return Math.random() < chanceA ? teamA : teamB;
}

/* =========================
   PÊNALTIS (CASO EMPATE)
   ========================= */

function penalties(teamA, teamB) {
    const scoreA = Math.random() + (teamA.strength / 100);
    const scoreB = Math.random() + (teamB.strength / 100);

    return scoreA >= scoreB ? teamA : teamB;
}