/*  Códigos dos Países - Plano básico
Usa	1
China	3
Europe	4
Italy	6
Netherlands	7
England	8
France	9
Scotland	21
Germany	27
Portugal	41
Spain	60
*/

async function getLeagues() {
  try {
    const response = await fetch(
      "https://api.soccerdataapi.com/league/?country_id=6&auth_token=2bdb4609569b5080a1163c48b598bf507fa222d3",
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
    console.log(data.results)

  } catch (error) {
    console.error("Erro ao buscar ligas:", error);
  }
}

// Chama a função
getLeagues();
