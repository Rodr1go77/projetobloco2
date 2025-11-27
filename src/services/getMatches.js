import localMatchesPremiere from "../localData/localMatchesPremiere.json";

const BASE_URL = `https://api.soccerdataapi.com/matches/?league_id=228&auth_token=2bdb4609569b5080a1163c48b598bf507fa222d3`;

export async function getMatches() {
  try {
    const request = await fetch(BASE_URL);

    if (!request.ok) throw new Error(`Erro ${request.status}`);

    const data = await request.json();

    const leagueHeader = {
      leagueName: data[0]?.league_name,
      seasonYear: data[0]?.season?.year
    };

    const matches = data[0]?.stage?.[0]?.matches ?? []

    return { fallback: false, leagueHeader, results: matches };

  } catch (error) {
    alert("Erro na API, usando dados locais:", error.message);

    const leagueHeader = {
      leagueName: localMatchesPremiere[0]?.league_name,
      seasonYear: localMatchesPremiere[0]?.season?.year
    };

    const matchesLocal =
      localMatchesPremiere?.[0]?.stage?.[0]?.matches ?? [];

    return { fallback: true, leagueHeader, results: matchesLocal };
  }
}

