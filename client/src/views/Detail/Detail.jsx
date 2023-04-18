import React, {useEffect} from "react";
import {  useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import {Link} from "react-router-dom";
import style from "./Detail.module.css"
import logo from "../../images/logo.png"




export default function Detail() {
    const dispatch = useDispatch();
    const pokemonDetail = useSelector((state) => state.detail);
    console.log("esto renderiza pokemonDetail", pokemonDetail)
    const id = useParams();
    useEffect(() => {dispatch(getPokemonById(id.id))}, []); 

    console.log("pokemonDetail: ", pokemonDetail)
    return(
        <div>
            <Link to="/">
            <img src={logo} className={style.logo} alt="imagen logo"/>
            </Link>        
            <br/>
            <Link to="/home" className={style.word}>Go to all Pokemons</Link>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {Object.keys(pokemonDetail).length > 0?
            <div className={style.fullCont}>
            
            <h1>{pokemonDetail.name.charAt(0).toUpperCase()+pokemonDetail.name.slice(1)}</h1>
            <div className={style.imgCont}>
                {pokemonDetail.image !== 'null' ? 
                <img src={pokemonDetail.img} className={style.image} />
                : !<img src = {pokemonDetail.image}/>
                }
            </div>

            <div>
            <div className={style.data}>
            <h3 className={style.types}>Types: {pokemonDetail.types.map(type => `${type.charAt(0).toUpperCase()+type.slice(1)} `)}</h3>
            
            <span>#{pokemonDetail.id}</span>
            <br/>
            <span>Hp: {pokemonDetail.hp}</span>
            <br/>
            <span>Attack:  {pokemonDetail.attack}</span>
            <br/>
            <span>Defense: {pokemonDetail.defense}</span>
            <br/>
            <span>Speed: {pokemonDetail.speed}</span>
            <br/>
            <span>Height: {pokemonDetail.height}</span>
            <br/>
            <span>Weight: {pokemonDetail.weight}</span>
            </div>
            <br/>
            </div>
            </div>
            : <h3>Loading...</h3>
        }
        </div>
    )

}
