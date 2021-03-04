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

async function openModal(id) {
    const pokemon = await api.getPokemon(id)
    const species = await api.getPokemonSpecies(pokemon.species.url)

    const about_html = ` 
    <div class="li">
        <div class="title">Description</div>
        <div class="value" id="description">${species["flavor_text_entries"][0]["flavor_text"]}</div>
        </div>

        <div class="li">
            <div class="title">Species</div>
            <div class="value">${pokemon.species.name}</div>
        </div>

        <div class="li">
            <div class="title">Height</div>
            <div class="value">${pokemon.height * 10} cm</div>
        </div>

        <div class="li">
            <div class="title">Weight</div>
            <div class="value">${pokemon.weight / 10} kg</div>
        </div>

        <div class="li">
            <div class="title">Abilities</div>
            <div class="value">${parseAbilities(pokemon.abilities)}</div>
        </div>

        <div class="li">
            <div class="title">Base Experience</div>
            <div class="value">${pokemon["base_experience"]}</div>                                     
    </div>`

    const stats_html = `
    <div class="li">
        <div class="title">HP</div>
        <div class="value">
            <p class="ratio">${pokemon.stats[0]["base_stat"]}%</p>
            <div class="ratio_container">
                <div class="ratio_bar ${pokemon.stats[0]["base_stat"] >= 50 ? "green_bar": ""}"
                    style="width: ${pokemon.stats[0]["base_stat"]}%"></div>
            </div>
        </div>
    </div>
    <div class="li">
        <div class="title">Attack</div>
        <div class="value">
            <p class="ratio">${pokemon.stats[1]["base_stat"]}%</p>
            <div class="ratio_container">
                <div class="ratio_bar ${pokemon.stats[1]["base_stat"] >= 50 ? "green_bar": ""}"
                    style="width: ${pokemon.stats[1]["base_stat"]}%"></div>
            </div>
        </div>
    </div>
    <div class="li">
        <div class="title">Defense</div>
        <div class="value">
            <p class="ratio">${pokemon.stats[2]["base_stat"]}%</p>
            <div class="ratio_container">
                <div class="ratio_bar ${pokemon.stats[2]["base_stat"] >= 50 ? "green_bar": ""}"
                    style="width: ${pokemon.stats[2]["base_stat"]}%"></div>
            </div>
        </div>
    </div>
    <div class="li">
        <div class="title">Special Attack</div>
        <div class="value">
            <p class="ratio">${pokemon.stats[3]["base_stat"]}%</p>
            <div class="ratio_container">
                <div class="ratio_bar ${pokemon.stats[3]["base_stat"] >= 50 ? "green_bar": ""}"
                    style="width: ${pokemon.stats[3]["base_stat"]}%"></div>
            </div>
        </div>
    </div>
    <div class="li">
        <div class="title">Special Defense</div>
        <div class="value">
            <p class="ratio">${pokemon.stats[4]["base_stat"]}%</p>
            <div class="ratio_container">
                <div class="ratio_bar ${pokemon.stats[4]["base_stat"] >= 50 ? "green_bar": ""}"
                    style="width: ${pokemon.stats[4]["base_stat"]}%"></div>
            </div>
        </div>
    </div>
    <div class="li">
        <div class="title">Speed</div>
        <div class="value">
            <p class="ratio">${pokemon.stats[5]["base_stat"]}%</p>
            <div class="ratio_container">
                <div class="ratio_bar ${pokemon.stats[5]["base_stat"] >= 50 ? "green_bar": ""}"
                    style="width: ${pokemon.stats[5]["base_stat"]}%"></div>
            </div>
        </div>
    </div>` 

    img_container.innerHTML = `
                <h1 class="name">${capitalize(pokemon.name)}<span class="number">#${pokemon.id
                    .toString()
                    .padStart(3, '0')}</span></h1>
                <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" >
    `
    
    img_container.style.backgroundColor = colors[parseType(pokemon.types)]

    pokemon.moves.forEach(moveObj => {
        const li = document.createElement('div');
        li.classList.add('li')
        li.innerHTML = `
            <div class="value">${capitalize(moveObj.move.name)}</div>
            <div class="value">${moveObj["version_group_details"][0]["level_learned_at"]}</div>
            <div class="value">${capitalize(moveObj["version_group_details"][0]["move_learn_method"].name)}</div>
        `
        moves_tab.appendChild(li);
    });

    about_tab.innerHTML = about_html;
    stats_tab.innerHTML = stats_html;
    body.classList.add('modal_open')
    modal.classList.add('active_modal')
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function parseAbilities(s) {
    return s.map(a => capitalize(a.ability.name)).join(', ')
}

function parseType(types) {
    const poke_types = types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
    return type
}

search_input.addEventListener('keydown', (e) => {
    searchPokemons(search_input.value);
})