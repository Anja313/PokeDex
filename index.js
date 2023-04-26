'use strict'

let pokemons_number = 100;
let allPokemon = [];

let colors = {
	Fire: '#F9A060',
	Grass: '#7ACD52',
	Electric: '#F2DA53',
	Water: '#399CFE',
	Ground: '#D6B55A',
	Rock: '#80968f',
	Fairy: '#EE95E5',
	Poison: '#B55AA5',
	Bug: '#ACBD20',
	Dragon: '#0772C7',
	Psychic: '#d3d49c',
	Flying: '#9EB8E9',
	Fighting: '#E5434A',
	Normal: '#ADA594',
	Ice: '#7ed8cc',
	Ghost: '#6A70C7',
	Dark: '#725A4A',
	Steel: '#5599A5',
};

let main_types = Object.keys(colors);

async function init() {
	for (let i = 1; i < pokemons_number; i++) {
		let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		let response = await fetch(url);
		let pokemon = await response.json();
		allPokemon.push(await pokemon);
		createPokemonCard(pokemon);
	}
};

async function createPokemonCard(poki) {
	let poke_container = document.getElementById('poke_container');
	let pokemon = getValuesFromPokemon(poki);

	poke_container.innerHTML += /*html*/`
			<div  onclick = "showCard(id)"  class="pokemon" id="${pokemon.id}"  style="background-color: ${pokemon.color}" >
				<span class="pokemonName">
					${pokemon.name.toUpperCase()}
				</span> 
				<img class="img" src=" ${pokemon.img}">
				<div class="pokeNumber">
					<span># ${pokemon.id.toString().padStart(3, '0')}</span>
				</div>
			</div>`;
}

function showCard(id) {
	let contain = document.getElementById('showPoco');
	let pokemon = getPokemenById(id-1);

	contain.innerHTML = /*html*/` 
		<div class="slideContainer"  >
				<div class="pokemon2Page" id="${pokemon.id}"  style="background-color: ${pokemon.color}" >
					<h3 class="pokemonName2Page" >
						${pokemon.name.toUpperCase()}
					</h3> 
					<i onclick="backContent()" class="bi bi-x-lg closeIcon"></i>

					<div class="iCons" >
							<p onclick="leftImg(${pokemon.id})"><i class="bi bi-chevron-double-left leftIcon"></i></p>
							<img class="img2Page" src=" ${pokemon.img}" >
							<p onclick="rightImg(${pokemon.id})"><i class="bi bi-chevron-double-right rightIcon"></i></p>
					</div>
			
					<div class="text2Page">
						<div class="pokemonWertelinks" >
							<!-- <span > Number </span> -->
							<span > Type</span>
							<span > Height  </span>
							<span > Weight  </span>
							<span > HP  </span>
							<span > Attack </span>
							<span > Defense </span>
							<span > Specialattack  </span>
							<span > Specialdefense   </span>
						</div>

						<div class="pokemonWerterechts" >
							<span > ${pokemon.type}</span>
							<span > ${pokemon.height / 10 + ' '+'m'} </span>
							<span > ${pokemon.weight /10 + ' ' + 'kg '} </span>
							<span > ${pokemon.hp} </span>
							<span > ${pokemon.attack} </span>
							<span > ${pokemon.defense} </span>
							<span > ${pokemon.specialattack} </span>
							<span > ${pokemon.specialdefense} </span>
						</div>
					</div>
				</div>
	    </div>`;
}


function backContent() {
	document.getElementById('showPoco').innerHTML = '';
}

function leftImg(i) {
    if (i > 1) {
        showCard(i - 1);
    } else {
        showCard(allPokemon.length - 1);
    }
}

function rightImg(i) {
    if (i < allPokemon.length - 1) {
        showCard(i + 1);
    } else {
        showCard(0);
    }
}


 function filterpokomon(pokotype) {
 	for (let i = 0; i < allPokemon.length; i++) {
 		let poko = getPokemenById(i) ;
		if (poko.type == pokotype || pokotype == '') {
			document.getElementById(poko.id).style.display = '';
		} else {
			document.getElementById(poko.id).style.display = 'none';
		}
 	}
}


function all() {
	for (let i = 0; i < allPokemon.length; i++) {
		   document.getElementById(id).style.display = '';
	}
}

function getStatsValue(name, stats) {
	for (let i = 0; i < stats.length; i++) {
		if (stats[i].stat.name === name) {
			return stats[i].base_stat;
		}
	}
}

function getValuesFromPokemon(pokemon) {
	let poke_types = pokemon['types'][0]['type']['name'][0].toUpperCase() + pokemon['types'][0]['type']['name'].slice(1);
	let img = pokemon['sprites']['other']['official-artwork']['front_default'];
	let pokemonid = pokemon['id'];
	let names = pokemon['name'];
	let color = colors[poke_types];
	let stats = pokemon['stats'];

	return {
		type: poke_types,
		img: img,
		id: pokemonid,
		name: names,
		color: color,
		height: pokemon['height'],
		weight: pokemon['weight'],
		hp: getStatsValue('hp', stats),
		attack: getStatsValue('attack', stats),
		defense: getStatsValue('defense', stats),
		specialattack: getStatsValue('special-attack', stats),
		specialdefense: getStatsValue('special-defense', stats),
	}
}

function getPokemenById(id) {
	let pokemon = allPokemon[id];
	return getValuesFromPokemon(pokemon);
}

function search() {
	let search = document.getElementById('fixed-header-drawer-exp').value;
	search = search.toLowerCase();
	
	for (let i = 0; i < allPokemon.length; i++) {
		let pokoname = getPokemenById(i).name ;
		let id = i + 1;
		if (pokoname.includes(search)) {
			document.getElementById(id).style.display = '';
		} else {
			document.getElementById(id).style.display = 'none';
		}
	}
}
