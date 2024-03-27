async function getFromId(id) {
  const address = `https://pokeapi.co/api/v2/pokemon/${Math.floor(id)}`;
  const results = await fetch(address)
    .then(response => response.json());

  return results;
}

export { getFromId };
