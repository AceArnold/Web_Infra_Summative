async function comparePokemons() {
  const pokemon1Name = document.getElementById('pokemon1').value.toLowerCase();
  const pokemon2Name = document.getElementById('pokemon2').value.toLowerCase();

  try {
    const [pokemon1, pokemon2] = await Promise.all([
      getPokemonData(pokemon1Name),
      getPokemonData(pokemon2Name)
    ]);

    displayPokemonStats(pokemon1, 'pokemonResult1');
    displayPokemonStats(pokemon2, 'pokemonResult2');

    const strongerPokemon = compareStats(pokemon1, pokemon2);
    displayStrongerPokemon(strongerPokemon);
  } catch (error) {
    console.error(error);
    alert('Error fetching Pokémon data. Please check the names and try again.');
  }
}

async function getPokemonData(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  if (!response.ok) {
    throw new Error('Pokemon not found');
  }
  const data = await response.json();
  return {
    name: data.name,
    image: data.sprites.front_default,
    stats: data.stats.map(stat => ({
      name: stat.stat.name,
      value: stat.base_stat
    }))
  };
}

function displayPokemonStats(pokemon, resultDivId) {
  const resultDiv = document.getElementById(resultDivId);
  resultDiv.innerHTML = `
    <div>
      <img src="${pokemon.image}" alt="${pokemon.name}">
    </div>
    <div>
      <h3>${pokemon.name.toUpperCase()}</h3>
      <ul>
        ${pokemon.stats.map(stat => `<li>${stat.name}: ${stat.value}</li>`).join('')}
      </ul>
    </div>
  `;
}

function compareStats(pokemon1, pokemon2) {
  const totalStats1 = pokemon1.stats.reduce((sum, stat) => sum + stat.value, 0);
  const totalStats2 = pokemon2.stats.reduce((sum, stat) => sum + stat.value, 0);
  return totalStats1 >= totalStats2 ? pokemon1 : pokemon2;
}

function displayStrongerPokemon(pokemon) {
  const strongerPokemonDiv = document.getElementById('strongerPokemon');
  strongerPokemonDiv.innerHTML = `
    <div>
      <img src="${pokemon.image}" alt="${pokemon.name}">
    </div>
    <div>
      <h3>${pokemon.name.toUpperCase()}</h3>
      <p>is stronger!</p>
    </div>
  `;
}
