import React from "react";
import style from "./Paginado.module.css"
// import { useState, useEffect } from 'react';

export default function Paginado ({pokemonPage, Pokemons, paginado, page}){

  const pageNumbers = [];

  for(let i=1; i<= Math.ceil(Pokemons/pokemonPage); i++){
      pageNumbers.push(i);
  }

  return(
      <div className={style.paginado}>
          <div className={style.prevBtn}>
              <button className={style.pagesBtn} style={page <= 1 ?
                  {display: 'none'} : {}} onClick={()=>paginado(page-1)}>Prev</button>
          </div>
          <div className={style.nextBtn}>
              <button className={style.pagesBtn} style={page >= pageNumbers.length ?
                  {display: 'none'} : {}} onClick={()=>paginado(page+1)}>Next</button>
          </div><br/>
          <br/>
          <br/>
              {pageNumbers && pageNumbers.map((pageNumber)=>(
                  pageNumbers.length === 1 ? null :
                  <div className={style.pages} key={pageNumber}>
                      <button className={style.pagesBtn} style={page === pageNumber ?
                          {background:"transparent",color:"#273314"} : {}} onClick={()=>paginado(pageNumber)}>{pageNumber}</button>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                  </div>
              ))}
      </div>
  )
}