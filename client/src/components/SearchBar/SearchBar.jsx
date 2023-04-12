import React, { useState } from 'react';
import axios from 'axios';
// import Card from "../../components/Card/Card";
import {Link} from "react-router-dom";
import { getPokemonByName } from '../../redux/actions';
import {useDispatch, useSelector} from "react-redux"
import style from "./SearchBar.module.css";


function SearchBar() {

  const pokemon = useSelector((state) => state.pokemonByName)

  const dispatch = useDispatch()
  const [query, setQuery] = useState('');


  const handleSearch = async (event) => {
    event.preventDefault();
    dispatch(getPokemonByName(query));
  }


  function handleInputChange(event){
    event.preventDefault()
    setQuery(event.target.value) 
    console.log(query) 
}

  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
  //     setPokemon(response.data);
  //     setErrorMessage('');
  //     if(!response){
  //       const dbResponse = await axios.get(`http://localhost:3001/pokemons/name?name=${query.toLowerCase()}`);
  //       setPokemon(dbResponse.data);
  //       setErrorMessage('');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setPokemon(null);
  //     setErrorMessage('No pokemon found.');
  //   }
  // };
  console.log("pokemon desde searchBar:", pokemon)



  return (
    <div>
      <div>
      <div className={style.mainContainer}>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={query}
        onChange={(event) => {handleInputChange(event)}}
        />
        </div>
        <br/>
      <button className={style.btn} onClick={(event) => handleSearch(event)}>Search</button>
      </div>
      {pokemon && (
        <div className={style.searchCont}>
             <Link to={`/pokemon/${pokemon.id}`} className={style.searchLink}>
                  <h3 className={style.nameCont}>{pokemon.name}</h3>
                {/* <img src={pokemon.sprites.front_default} alt={pokemon.name} className={style.searchImg}/> */}
              </Link>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
