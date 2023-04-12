const {Router} = require('express');
const {getPokemonsHandler, createPokemonHandler, getPokemonByIdHandler, getPokemonByNameHandler}  = require("../handlers/pokemonsHandlers")
const {Pokemon, Type} = require("../db");

const pokemonsRouter = Router();

//  const validate = (req, res, next) => {
//     const {name} = req.body;
//     if(!name) return res.status(400).json({error: "Missing name."});

//     next();
//  }

pokemonsRouter.get("/", getPokemonsHandler);

// pokemonsRouter.get("/name", getPokemonsHandler);
pokemonsRouter.get("/byname", getPokemonByNameHandler);

pokemonsRouter.get('/:id', getPokemonByIdHandler);

pokemonsRouter.post("/", createPokemonHandler);


// pokemonsRouter.post("/", validate, createPokemonHandler);




module.exports = pokemonsRouter;