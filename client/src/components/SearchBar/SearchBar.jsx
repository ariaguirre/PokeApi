import React, { useState } from 'react';
import axios from 'axios';
// import Card from "../../components/Card/Card";
import {Link} from "react-router-dom";

import style from "./SearchBar.module.css";


function SearchBar() {
  const [pokemon, setPokemon] = useState(null);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      setPokemon(response.data);
      setErrorMessage('');
      if(!response){
        const dbResponse = await axios.get(`http://localhost:3001/pokemons/name?name=${query.toLowerCase()}`);
        setPokemon(dbResponse.data);
        setErrorMessage('');
      }
    } catch (error) {
      console.error(error);
      setPokemon(null);
      setErrorMessage('No pokemon found.');
    }
  };
  console.log("pokemon desde searchBar:", pokemon)
  return (
    <div>
      <div>
      <div className={style.mainContainer}>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        </div>
        <br/>
      <button className={style.btn} onClick={handleSearch}>Search</button>
      </div>
      {pokemon && (
        <div className={style.searchCont}>
             <Link to={`/pokemon/${pokemon.id}`} className={style.searchLink}>
                  <h3 className={style.nameCont}>{pokemon.name.charAt(0).toUpperCase()+ pokemon.name.slice(1)}</h3>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className={style.searchImg}/>
              </Link>
        </div>
      )}
      {errorMessage && <p className={style.error}>{errorMessage}</p>}
    </div>
  );
}

export default SearchBar;
