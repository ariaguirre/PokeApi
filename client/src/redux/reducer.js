import {GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, POST_POKEMON, SEARCHED_POKEMON, FILTER_BY_TYPE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_STRENGTH} from "./actions";

const initialState = {
    allPokemons: [],
    totalPokemons: [],
    filteredPokemons: [],
    lastSearchedPokemon: [],
    types: [],
    detail: [],
};

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_POKEMONS:
            return{...state, allPokemons: action.payload, totalPokemons: action.payload}
        case GET_POKEMON_BY_ID:
            return{...state, detail: action.payload, filteredPokemons: action.payload}

        case GET_POKEMON_BY_NAME:
            const addPokemonByName = state.filteredPokemons;
            if(addPokemonByName.filter((p)=>p.name === action.payload[0].name).length > 0) {
                console.log('El Pokemon mostrado se encuentra en la App')
            } else {
                addPokemonByName.push(action.payload[0]);
                console.log('El Pokemon mostrado se cargó a la App')
            }
            return{
                ...state,
                addedPokemons: action.payload,
            }
        case SEARCHED_POKEMON: 
            return{...state, lastSearchedPokemon: action.payload}

        case GET_TYPES:
            return{...state, types: action.payload}

        case FILTER_BY_TYPE:
            const pokemons = state.totalPokemons;   //siempre se filtra sobre el n° total de pokemons
            const pokeByType = action.payload === "All" ? pokemons : pokemons.filter(pokemon => {
                return pokemon.types.some(pokeType => pokeType.name === action.payload)
            })
                console.log("pokemons:", pokemons)
                console.log("pokeByType:", pokeByType)
            return{
                ...state, 
                allPokemons: pokeByType,
                filteredPokemons: pokeByType
            }

        case FILTER_BY_ORIGIN:
            // const pokemonsByOrigin= state.filteredPokemons;
            const apiPokemon = state.totalPokemons.filter((p) => typeof (p.id) === "number") 
            const dbPokemon = state.totalPokemons.filter((p) => typeof (p.id) !== "number") 
            const pokeByOrigin = action.payload === 'originals' ? apiPokemon : dbPokemon;
            // if(action.payload === 'originals' || action.payload === 'created by User'){
            //     const pokeByOrigin = action.payload === 'originals' ? apiPokemon : dbPokemon;
            // } else {
            //     pokeByOrigin = apiPokemon.concat(dbPokemon);
            // }

            return{
                ...state,
                allPokemons: pokeByOrigin,          //todo paginado en base a allPokemons
                filteredPokemons: pokeByOrigin      //useEffect cambia cada vez que este se modifica
            }


        case ORDER_BY_NAME: 
            let sortedNames = action.payload === 'asc' ?
            state.allPokemons.sort(function (a,b){
            if (a.name > b.name){
                return 1;}
            if (b.name > a.name){
                return -1;}
                return 0;
            }) : 
            state.allPokemons.sort(function (a,b){
            if (a.name > b.name){
                return -1;}
            if (b.name > a.name){
                return 1;}
                return 0; 
            })
            return{
                ...state, 
                allPokemons: sortedNames
            }

            case ORDER_BY_STRENGTH:
                 const orderedByAttack = action.payload === 'strongest' ? state.allPokemons.sort((a,b) => {
                            if(a.hp < b.hp) return 1;
                            if(a.hp > b.hp) return -1; 
                            return 0;
                        }) : state.allPokemons.sort((a,b) => {
                            if(a.hp > b.hp) return 1;
                            if(a.hp < b.hp) return -1;
                            return 0;
                        })
                        return{
                            ...state, 
                            allPokemons: orderedByAttack
                        }
                    
                


            

        case "REMOVE_DETAILS":
            return{
                ...state,
                details: []
            }








            
        case POST_POKEMON:
            return{...state}
        default:
            return {...state};
    }
};

export default rootReducer;