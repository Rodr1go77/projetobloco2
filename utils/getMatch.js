const BASE_URL = `https://api.soccerdataapi.com/matches/?league_id=228
&auth_token=2bdb4609569b5080a1163c48b598bf507fa222d3`;

async function getMatches() {
  const request = await fetch(
    BASE_URL,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
    }
  );

  const data = await request.json();

  if (request.status !== 200) {
    return {
      error: 'Falha ao carregar página.',
    };
  }

  console.log(data[0].stage[0].matches.slice(0,3));
  console.log(data[0].stage[0].matches.slice(0,3).length)

  return {
    results: data,
    totalSliceJogos: data[0].stage[0].matches.slice(0,3).count
    
  };

}

getMatches();



// # Get Country: Javascript Example Request
// async function getCountries() {

//     const response = await fetch("https://api.soccerdataapi.com/country/?auth_token=YOUR-AUTH-TOKEN", {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             "Accept-Encoding": "gzip"
//         },
//     })
//     .then(response => {
//         return response;
//     })
//     .catch(error => {
//         return error;
//     });

//     const data = await response.json();
//     console.log(data);

// }
