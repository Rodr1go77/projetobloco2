import matchLocal from "../localData/matchLocal.json";

export async function getMatchById(match_id) {
    const URL = `https://api.soccerdataapi.com/match/?match_id=${match_id}&auth_token=2bdb4609569b5080a1163c48b598bf507fa222d3`;

    try {
        const response = await fetch(URL);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        if (data.error) {
            alert("Erro ao buscar detalhes da partida. Usando dados locais.");
            return { fallback: true, result: matchLocal };
        }

        return { fallback: false, result: data };

    } catch (error) {
        alert("Erro ao conectar com a API. Usando dados locais.");
        return { fallback: true, result: matchLocal };
    }
}


// https://api.soccerdataapi.com/match/?match_id=961083&auth_token=2bdb4609569b5080a1163c48b598bf507fa222d3