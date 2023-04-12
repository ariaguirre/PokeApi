import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMON = "POST_POKEMON";
export const SEARCHED_POKEMON = "SEARCHED_POKEMON"
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const ORDER_BY_STRENGTH = "ORDER_BY_STRENGTH";
export const REMOVE_DETAILS = "REMOVE_DETAILS";





export function getPokemons(){
    return async function(dispatch){
        const pokemons = await axios.get('http://localhost:3001/pokemons');
        // console.log(pokemons.data)
        return dispatch({
            type: GET_POKEMONS,
            payload: pokemons.data
        })
    }
}

export const getPokemonById = (id) => {
    return async function (dispatch) {
        const pokemonById = await axios.get(`http://localhost:3001/pokemons/${id}`);
        return dispatch({type: GET_POKEMON_BY_ID, payload: pokemonById.data});
    };
};


export function getPokemonByName(name){
    return async function(dispatch){
        try{
            let pokemon = await axios.get(`http://localhost:3001/pokemons/byname?name=${name}`);
            // const pokeData=pokemon.data[0].name
            // console.log("pokeData desde action: ", pokeData)

            // const dbPokemon = pokemon.data[0].name;
            // const apiPokemon = pokemon.data.name;
            const pokemonName = pokemon.data.name ? pokemon.data.name : pokemon.data[0].name;
            
            // console.log("pokemonName:", pokemonName)
            // if(pokemon.data.hasOwnProperty([0])) return pokemon.data[0].name;
            // else return pokemon.data.name

            // console.log("esto envia la action", pokemonName)

            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: pokemonName
            })
        } catch (error) {
            console.log(error)
            
            }
        }
    }


export function searchedPokemon (payload) {
    return {
        type: SEARCHED_POKEMON,
        payload
    };
};


export const getTypes = () => {
    return async function (dispatch) {
        const response = await axios.get(
            "http://localhost:3001/types/");
            // console.log(response)
            return dispatch({ type: "GET_TYPES", payload: response.data });
    } 
};

export function postPokemon(payload){
    return async function(dispatch){
        try{
            await axios.post('http://localhost:3001/pokemons/', payload);
            return dispatch({
                type: 'POST_POKEMON',
            })
        } catch(error) {
            console.log(error)
        }
    }
}


export function filterByType(payload){
    return {
        type: FILTER_BY_TYPE,
        payload
    }
}


export function filterByOrigin(payload){
    return{
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByStrength(payload){
    return{
        type: ORDER_BY_STRENGTH,
        payload
    }
}


export function removeDetails(){
    return{
        type: 'REMOVE_DETAILS',
    }
}










// export const filterBySource = () => {
//     dispatch({type: "FILTER_BY_SOURCE"});
// }


/*
Si quiero traer los tipos de la bdd, tengo que ir a mi back y poner 
Router.get("/genres", (req, res) => {
    const genres = Genres.findAll(); 
    res.status(200).json(genres);
})
*/