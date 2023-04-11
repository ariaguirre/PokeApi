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
pokemonsRouter.get("/name", getPokemonByNameHandler);

pokemonsRouter.get('/:id', getPokemonByIdHandler);

pokemonsRouter.post("/", createPokemonHandler);

// pokemonsRouter.get("/:id", getPokemonsHandler);
// pokemonsRouter.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     let foundPokemon;
//     if (id > 0 && id < 899 || id > 10000 && id < 10229) {
//       const foundPokemon = await getPokemonByNameOrId(id);
//       return foundPokemon ? res.status(200).send(foundPokemon)
//         : res.status(404).send('Ups! We can\'t find the Pokemon ID you\'re looking for...');
//     }
//     const pokemonsDB = await getDbPokemons();
//     if (!foundPokemon && id) {
//         console.log("buscando con este id:", id)
//       const pokemonDb = pokemonsDB.find((pokemon) => pokemon.id === id);
//       console.log("retorna este poke: ", pokemonDb)
//       return pokemonDb ? res.status(200).json(pokemonDb)
//         : res.status(404).send('Ups! We can\'t find the Pokemon ID you\'re looking for...');
//     }
//   });


// pokemonsRouter.post("/", validate, createPokemonHandler);




module.exports = pokemonsRouter;