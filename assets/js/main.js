const pokedex = document.getElementById("pokedex");
const pokemonList = document.getElementById("pokemonList");
const pokemonDetails = document.getElementById("pokemonDetails");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 1302;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <a href="#" onClick = "loadPokemonDetails(${
                  pokemon.number - 1
                }, 1)">
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}"
                        >
                </a>
            </div>
        </li>
    `;
}

function convertPokemonToDetails(pokemon) {
  return `
        <div class="details ${pokemon.type}">
            <nav class="details__navigation">
                <a href="index.html">←</a>
                <button type="button" class="${pokemon.type}">♡</button>
            </nav>
            <span class="details__name">${pokemon.name}</span>
            <span class="details__number">#${pokemon.number}</span>

            <ul class="details__types">
                ${pokemon.types
                  .map(
                    (type) => `<li class="details__type ${type}">${type}</li>`
                  )
                  .join("")}
            </ul>

            <img src="${pokemon.photo}"
                alt="${pokemon.name}"
            >
        </div>

        <div class="info">
            <nav class="info__navigation">
                <a href=# id="aboutHeader">About</a>
                <a href=#>Base Stats</a>
                <a href=#>Evolution</a>
                <a href=#>Moves</a>
            </nav>
            <section id="aboutSection">
                <div class="about">
                    <span class="about__key">Height</span>
                    <span class="about__value">${(pokemon.height / 10).toFixed(
                      2
                    )} M</span>
                </div>
                <div class="about">
                    <span class="about__key">Weight</span>
                    <span class="about__value">${pokemon.weight / 10} Kg</span>
                </div>
                <div class="about">
                    <span class="about__key">Abilities</span>
                    <span class="about__value">
                        <ul id="abilities">
                        ${pokemon.abilities
                          .map(
                            (ability) =>
                              `<li>${ability
                                .charAt(0)
                                .toUpperCase()}${ability.substring(1)}</li>`
                          )
                          .join(", ")}
                        </ul>
                    </span>
                </div>
                <h3>Breeding</h3>
                <div class="about">
                    <span class="about__key">Egg Cycle</span>
                    <span class="about__value" id="eggCycle">${pokemon.types[0]
                      .charAt(0)
                      .toUpperCase()}${pokemon.types[0].substring(1)}</span>
                </div>
            </section>
        </div>
  `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

function loadPokemonDetails(offset, limit) {
  pokedex.innerText = "";

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToDetails);
    pokemonDetails.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
