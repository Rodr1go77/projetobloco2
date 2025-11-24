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

    if (!request.ok) throw new Error(`Erro ${request.status}`);

    const data = await request.json();
    const matches = data[0]?.stage?.[0]?.matches || [];
    console.log("Matches extraídos:", matches);

    return { results: matches};

  } catch (error) {
    return { error: error.message };
  }
}

getMatches();
