/* =========================
   TEAMS - FIFA WORLD CUP 2026 SIMULATOR
   ========================= */

const TEAMS = [
    { id: "BRA", name: "Brasil", strength: 95 },
    { id: "ARG", name: "Argentina", strength: 94 },
    { id: "FRA", name: "França", strength: 93 },
    { id: "ENG", name: "Inglaterra", strength: 92 },
    { id: "ESP", name: "Espanha", strength: 90 },
    { id: "GER", name: "Alemanha", strength: 89 },
    { id: "POR", name: "Portugal", strength: 88 },
    { id: "NED", name: "Holanda", strength: 87 },

    { id: "CBV", name: "Cabo Verde", strength: 86 },
    { id: "BEL", name: "Bélgica", strength: 85 },
    { id: "PAR", name: "Paraguai", strength: 84 },
    { id: "CRO", name: "Croácia", strength: 83 },

    { id: "USA", name: "Estados Unidos", strength: 82 },
    { id: "MEX", name: "México", strength: 81 },
    { id: "COL", name: "Colômbia", strength: 80 },
    { id: "NWA", name: "Noruega", strength: 79 },

    { id: "JPN", name: "Japão", strength: 78 },
    { id: "ASU", name: "África do Sul", strength: 78 },
    { id: "AUT", name: "Áustria", strength: 76 },
    { id: "MAR", name: "Marrocos", strength: 82 },

    { id: "SEN", name: "Senegal", strength: 81 },
    { id: "GAN", name: "Gana", strength: 77 },
    { id: "EGY", name: "Egito", strength: 76 },
    { id: "CON", name: "Congo", strength: 75 },

    { id: "CAN", name: "Canadá", strength: 74 },
    { id: "ECU", name: "Equador", strength: 75 },
    { id: "BOS", name: "Bósnia", strength: 73 },
    { id: "ECU", name: "Equador", strength: 78 },

    { id: "SUI", name: "Suíça", strength: 83 },
    { id: "AUS", name: "Austrália", strength: 84 },
    { id: "SWE", name: "Suécia", strength: 82 },
    { id: "CMF", name: "Costa do Marfim", strength: 80 }
];

/* =========================
   FUNÇÃO AUXILIAR
   ========================= */

function getTeamById(id) {
    return TEAMS.find(team => team.id === id);
}

/* =========================
   PROBABILIDADE DE VITÓRIA
   ========================= */

function getWinProbability(teamA, teamB) {
    const powerA = teamA.strength;
    const powerB = teamB.strength;

    const total = powerA + powerB;

    return {
        teamA: powerA / total,
        teamB: powerB / total
    };
}

/* =========================
   SORTEAR TIMES OITAVAS
   ========================= */

function shuffleTeams() {
    return [...TEAMS]
        .sort(() => Math.random() - 0.5);
}