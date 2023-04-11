import React from "react";
// import {NavLink} from "react-router-dom";

import style from "./Card.module.css";


export default function Card({name, hp, image, id, types}){
    return (
        <div className={style.card}>
            <img src={image} className={style.image} alt="Image not found."/>
            {/* <h3>{name.toUpperCase()}</h3> */}
            <br/>
            <div className={style.name}>
            {name.charAt(0).toUpperCase()+name.slice(1)}
            </div>
            <br/>
            <div>
            {/* <span>Hp: {hp}</span> */}
            <div className={style.type}>Types: </div>
                {types?.map((e)=> {
                    return(
                        <div key={e}>
                            <span className={style.types}>{e.name.charAt(0).toUpperCase()+e.name.slice(1)}</span>
                        </div> 
                    )
                })}
            </div>
        </div>
    )
}





