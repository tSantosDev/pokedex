
const pokeApi = {}

/*Função que converte o modelo de pokemon da PokeApi para um modelo autoral*/

function convertePokeApiDetailEmModeloPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.image = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}


/*Método do objeto pokeApi para realizar várias requisições dos detalhes dos pokemons através da lista de pokemons obtida da primeira requisição*/

pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertePokeApiDetailEmModeloPokemon)
};

/* Método do objeto pokeApi para realizar a requisição da API para receber a lista de pokemons com name e URL(detalhes) e devolver essa lista de detalhes para ser manipulada no HTML */

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
}