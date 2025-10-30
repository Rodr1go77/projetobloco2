async function getPreview() {
  try {
    const response = await fetch(
      "https://api.soccerdataapi.com/match-preview/?match_id=966622&auth_token=2bdb4609569b5080a1163c48b598bf507fa222d3",
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
    console.log("Resposta Completa:", data)

  } catch (error) {
    console.error("Erro ao buscar ligas:", error);
  }
}

// Chama a função
getPreview();
