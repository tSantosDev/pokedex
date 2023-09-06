
const pokemonOl = document.getElementById('pokemonList')
const carregaMaisPokemon = document.getElementById('carregarMaisBotao')
const limit = 4
let offset = 0

function carregaPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const novoHtml = pokemonList.map((pokemon) =>
            `
                <li class="listagemPokemon_lista_item ${pokemon.type}">
                    <span class="numero">#${pokemon.number}</span>
                    <span class="nome">${pokemon.name}</span>
        
                    <div class="propriedades">
                        <ol class="propriedades_listaTipos">
                            ${pokemon.types.map((type) => `<li class="tipo ${type}">${type}</li>`).join('')}
                        </ol>
        
                        <img src="${pokemon.image}" alt="${pokemon.name}">
                    </div>
                </li>
            
            `
        ).join('')

        pokemonOl.innerHTML += novoHtml
    })
}

carregaPokemons(offset, limit)

carregaMaisPokemon.addEventListener('click', () => {
    offset += limit
    carregaPokemons(offset, limit)
})


