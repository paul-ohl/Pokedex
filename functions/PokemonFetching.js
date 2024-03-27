async function fetchFromId(id) {
  const address = `https://pokeapi.co/api/v2/pokemon/${Math.floor(id)}`;
  const results = await fetch(address)
    .then(response => response.json());

  return results;
}

async function fetchFromIdList(ids) {
  return Promise.all(ids.map(id => fetchFromId(id)))
    .then(pokemons => pokemons);
}

export { fetchFromId, fetchFromIdList };
