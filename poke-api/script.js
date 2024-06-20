const pokemonName = document.getElementById("pokemonName");
const pokemonInfo = document.getElementById("pokemonInfo");

pokemonName.addEventListener("input", () => {
  const name = pokemonName.value.toLowerCase().trim();

  if (name) {
    fetchPokemon(name);
  } else {
    pokemonInfo.innerHTML = "";
  }
});

document.getElementById("searchBtn").addEventListener("click", () => {
  const name = pokemonName.value.toLowerCase().trim();

  if (name) {
    fetchPokemon(name);
  }
});

function fetchPokemon(name) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      return response.json();
    })
    .then((data) => {
      displayPokemon(data);
    })
    .catch((error) => {
      pokemonInfo.innerHTML = `<p class="error">${error.message}</p>`;
    });
}

function displayPokemon(data) {
  const pokemonTypes = data.types.map((type) => type.type.name);
  const pokemonAbilities = data.abilities.map(
    (ability) => ability.ability.name
  );

  pokemonInfo.innerHTML = `
    <img src="${data.sprites.front_default}" alt="${data.name}">
    <h2>${data.name}</h2>
    <p>ID: ${data.id}</p>
    <p>Height: ${data.height / 10} m</p>
    <p>Weight: ${data.weight / 10} kg</p>
    <p>Types: ${pokemonTypes.join(", ")}</p>
    <p>Abilities: ${pokemonAbilities.join(", ")}</p>
  `;
}
