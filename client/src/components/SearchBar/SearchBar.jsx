import React, { useState } from 'react';
import axios from 'axios';
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
    try{
      dispatch(getPokemonByName(query));
      setQuery(event.target.value) 
    } catch(error){
      console.log(error)
      alert('No pokemon found!')
    }
  }


  function handleInputChange(event){
    event.preventDefault()
    setQuery(event.target.value) 
  }
  // console.log("query desde handleSearch:", query)

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
             <Link to={`/pokemon/${pokemon[0].id}`} className={style.searchLink}>
                  <h3 className={style.nameCont}>{pokemon[0].name.charAt(0).toUpperCase() + pokemon[0].name.slice(1)}</h3>
                <img src={pokemon[0].image} alt={pokemon.name} className={style.searchImg}/>
              </Link>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
