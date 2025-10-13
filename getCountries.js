async function getCountries() {
  try {
    const response = await fetch(
      "https://api.soccerdataapi.com/country/?auth_token=2bdb4609569b5080a1163c48b598bf507fa222d3",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip",
        },
      }
    );

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

    const data = await response.json();
    const paises = [
      "china",
      "europe",
      "italy",
      "netherlands",
      "england",
      "france",
      "scotland",
      "germany",
      "portugal",
      "spain",
    ];

    for (let item of data.results) {
      if (paises.includes(item.name)) {
        console.log(item);
      }
    }
  } catch (error) {
    console.error("Erro ao buscar ligas:", error);
  }
}

// Chama a função
getCountries();
