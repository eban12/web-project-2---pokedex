const poke_container = document.getElementById('poke_container');
const load_more_btn = document.querySelector('.load_more');
const modal = document.querySelector('.modal_container');
const about_btn = document.querySelector('#about_btn');
const stats_btn = document.querySelector('#stats_btn');
const moves_btn = document.querySelector('#moves_btn');
const about_tab = document.querySelector('.about');
const stats_tab = document.querySelector('.stats');
const moves_tab = document.querySelector('.moves');
const body = document.querySelector('body');
const img_container = document.querySelector('.img_container');
const search_input = document.querySelector(".search_bar input");

let pokemons_number = 24;
let pokemon_start = 1;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = pokemon_start; i <= pokemons_number; i++) {
		const pokemon = await api.getPokemon(i);
        createPokemonCard(pokemon)
	}
};

const searchPokemons = async text => {
    const searchResult = pokemons.filter(pokemon => pokemon.name.indexOf(text.toLowerCase()) != -1);
    poke_container.innerHTML = "";
    for (let i = 0; i < searchResult.length && i <= 24; i++) {
        const pokemon = await api.getPokemon(searchResult[i].name)
        createPokemonCard(pokemon)
    }
}

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const type = parseType(pokemon.types);
	const name = capitalize(pokemon.name);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;
    pokemonEl.addEventListener('click', () => {
        openModal(pokemon.id)
    })

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}