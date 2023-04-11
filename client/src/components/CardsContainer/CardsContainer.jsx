import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import {useSelector} from "react-redux";


// const CardsContainer = ({allPokemons}) => {
//     // const pokemons = useSelector(state=>state.pokemons)
//     const pokemonsList = allPokemons;
    
//     return(
//         <div className={style.container}>
//             {/* {pokemons.map(p => {
//                 return <Card
//                 name={p.name}
//                 height={p.height}
//                 weight={p.weight}
//                 />
//             })} */}

//             {pokemonsList?.map((pokemon)=>(
//                 <Card pokemon={pokemon}/> 
//             ) )}
//         </div>
//     )
// }

// export default CardsContainer;


const CardsContainer = () => {
    const pokemons = useSelector(state => state.allPokemons)
    return(
        <div className={style.container}>
            {pokemons.map(pokemon=> {
                return <Card
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
                />
            })}
        </div>
    )
}

export default CardsContainer;