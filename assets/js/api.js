const api = {
    getPokemon: async id => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        return await res.json();
    },
}