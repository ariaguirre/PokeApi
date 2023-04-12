import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {getPokemons, filterByType, getTypes, filterByOrigin, orderByName, removeDetails, orderByStrength} from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./Home.module.css";
import logo from "../../images/logo.png";
import Card from "../../components/Card/Card";
import Paginado from "../../components/Paginado/Paginado";


export default function Home (){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.allPokemons);
    const filteredPokemons = useSelector((state) => state.filteredPokemons);
    const types = useSelector((state)=>state.types);


    const [loadedPokemons /*, setLoadedPokemons*/] = useState(allPokemons.length ? true : false);



    useEffect(() => {if(allPokemons.length === 0) dispatch(getPokemons())}, [filteredPokemons]);
    useEffect(() => {dispatch(getTypes())}, [])

    // console.log("allPokemons desde home", allPokemons)
    // console.log("filteredPokemons desde home", filteredPokemons)
    const [order, setOrder] = useState('')

    useEffect(()=>{
        dispatch(removeDetails());
        if(!loadedPokemons){
            dispatch(getPokemons());
            dispatch(getTypes());
        }
    }, [loadedPokemons, dispatch])


    //paginacion 
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPage /*, setPokemonPage*/] = useState(8);
    const indexLast = currentPage * pokemonPage;
    const indexFirst = indexLast - pokemonPage;
    const currentPokemons = allPokemons.slice(indexFirst, indexLast);
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() =>{
        setCurrentPage(1);
    }, [allPokemons.length, setCurrentPage])


    function handleSortName(event){
        event.preventDefault();
        dispatch(orderByName(event.target.value));
        setOrder(`Alphabetical ${event.target.value} order`);
        setCurrentPage(1);
        event.target.value= 'default';
    }

    function handleSortAttack(e) {
        e.preventDefault();
        dispatch(orderByStrength(e.target.value));
        setOrder(`Ordered by ${e.target.value} Pokemon`);
        setCurrentPage(1);
        e.target.value= 'default';
    }


    function handleFilterType(event) {
        event.preventDefault();
        dispatch(filterByType(event.target.value));
        setOrder(`Filtered by Type: ${event.target.value}`);
        event.target.value= 'default';
    }

    function handleFilterByOrigin(event){
        event.preventDefault();
        dispatch(filterByOrigin(event.target.value));
        setOrder(`Filtered by Origin: ${event.target.value}`);
        event.target.value= 'default';
    }
    // console.log("currentPokemons desde home:", currentPokemons)

    return(
        <div>
            <br/>
            <Link to="/">
                <img src={logo} className={style.logo} alt="imagen logo"/>
                </Link>
            <SearchBar/>
            <br/>
            <br/>
            <br/>
            <form className={style.allFilters}>
            <select className={style.filters} value='default' onChange={event => handleSortName(event)}>
                    <option disabled value = "default">Order by name...</option>
                    <option value = "asc">A - Z</option>
                    <option value = "desc">Z - A</option>
                </select>
                <select className={style.filters} value='default' onChange={e => handleSortAttack(e)}>
                    <option disabled value = "default">Order by attack...</option>
                    <option value = "strongest">Strongest attack</option>
                    <option value = "weakest">Weakest attack</option>
                </select>
            <select className={style.filters} value='default' onChange={event => handleFilterType(event)}>
                    <option disabled value = "default">Filter by type...</option>
                    <option value = 'all'>All</option>
                    {types?.map((type) => (
                    <option value = {type.name} key={type.name}>{type.name.charAt(0).toUpperCase()+type.name.slice(1)}</option>
                    ))}
                </select>
                <select className={style.filters} value='default' onChange={event => handleFilterByOrigin(event)}>
                    <option disabled value = "default">Filter by origin...</option>
                    {/* <option value = "all">Show all...</option> */}
                    <option value = "originals">Originals...</option>
                    <option value = "created by User">Created By User...</option>
                </select>
                {/* {order.length > 0 && (<span className={style.filtered}>{order}</span>)} */}
            </form>
            <br />

            <div className={style.containerCards}>
                {currentPokemons.length > 0 ? currentPokemons.map((pokemon)=> {
                    return(
                        <div className={style.homeCards} key={pokemon.id}>
                             <Link to={`/pokemon/${pokemon.id}`} className={style.homeCardsLink}>
                                <Card 
                                name={pokemon.name}  
                                image={pokemon.image}
                                // hp={pokemon.hp}
                                types={pokemon.types}  
                                id={pokemon.id} 
                            />
                            </Link>
                        </div>
                        
                    )
                }) :
                <h3>Loading...</h3>
            }
            </div>
            
        <div>
        <Paginado
        pokemonPage={pokemonPage}
        Pokemons={allPokemons.length}
        paginado={paginado}
        page={currentPage}/>
        </div>
        </div>
    )
}