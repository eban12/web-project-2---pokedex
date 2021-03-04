const api = {
    getPokemon: async id => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        return await res.json();
    },

    getAllPokemon: async () => {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")
        const pokes =  await res.json()
        return pokes.results
    }
}