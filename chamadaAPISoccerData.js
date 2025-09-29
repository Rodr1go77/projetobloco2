fetch(
  "https://api.soccerdataapi.com/country/?auth_token=2bdb4609569b5080a1163c48b598bf507fa222d3",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip",
    },
  }
).then(
  (response) => response.json() // transforma a resposta em json
)
.then (
dadosPaises => console.log(dadosPaises) 
)
