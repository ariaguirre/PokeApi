import {GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, POST_POKEMON, SEARCHED_POKEMON,FILTER_BY_DEFENSE,  FILTER_BY_TYPE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_STRENGTH} from "./actions";

const initialState = {
    allPokemons: [],
    totalPokemons: [],
    filteredPokemons: [],
    lastSearchedPokemon: [],
    types: [],
    detail: [],
    pokemonByName: undefined,
};

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_POKEMONS:
            return{...state, allPokemons: action.payload, totalPokemons: action.payload}
        case GET_POKEMON_BY_ID:
            return{...state, detail: action.payload, filteredPokemons: action.payload}

        case GET_POKEMON_BY_NAME:
    
        const pokeByName = state.totalPokemons.filter((p) => p.name===action.payload);

            return{
                ...state,
                pokemonByName: pokeByName,
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
            const apiPokemon = state.totalPokemons.filter((p) => typeof (p.id) === "number") 
            const dbPokemonRaw = state.totalPokemons.filter((p) => typeof (p.id) !== "number") 
            const dbPokemon = dbPokemonRaw.map((p)=>{
                const jsonTypes = p.types.map((t)=>{return {
                    name: t
                }})
                return{
                id: p.id,
                name: p.name,
                attack: p.attack,
                speed: p.speed,
                defense: p.defense, 
                height: p.height,
                weight: p.weight,
                image: p.image,
                types: jsonTypes
            }})
            const pokeByOrigin = action.payload === 'originals' ? apiPokemon : dbPokemon;
            return{
                ...state,
                allPokemons: pokeByOrigin,          //todo paginado en base a allPokemons
                filteredPokemons: pokeByOrigin      //useEffect cambia cada vez que este se modifica
            }


        case FILTER_BY_DEFENSE:
            const highDefPoke = state.totalPokemons.filter((p) => p.hp > 80);
            const lowDefPoke = state.totalPokemons.filter((p) => p.hp < 80);
            const defPokes =  action.payload === 'highD' ? highDefPoke : lowDefPoke;
            console.log("lowDefPoke:", lowDefPoke)
            console.log("highDefPoke:", highDefPoke)
            return{
                ...state,
                allPokemons: defPokes, 
                filteredPokemons: defPokes
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