const BASE_URL = `https://api.soccerdataapi.com/matches/?league_id=228&auth_token=2bdb4609569b5080a1163c48b598bf507fa222d3`;

export async function getMatches() {
  try {
    const request = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip",
      },
    });

    if (!request.ok) {
      return {
        error: `Erro ao buscar dados (${request.status})`,
      };
    }

    const data = await request.json();

    const slice = data[0].stage[0].matches.slice(0, 5);
    console.log(data[0].stage[0].matches.slice(0, 5));
    console.log(data[0].stage[0].matches.slice(0, 5).length);

    return {
      results: data,
      totalSliceJogos: slice.length,
      sliceJogos: slice,
    };
  } catch (error) {
    return {
      error: "Erro inesperado ao conectar com o servidor.",
      details: error.message,
    };
  }
}

getMatches()