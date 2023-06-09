const {createPokemon, getPokemonByNameOrId, getDbPokemons,  getAllPokemons, pokemonByNameController} = require("../controllers/pokemonsControllers");
const {getTypes, getAllTypes} = require("../controllers/typesControllers");
const {Pokemon, Type} = require("../db");


const getPokemonsHandler = async(req, res) =>{
    const {name}=req.query;
    const id = req.params.idPokemon
    try{
        const results = (id || name) ? await getPokemonByNameOrId(id, name) : await getAllPokemons();
        const dbTypes = await Type.findAll()
        if(dbTypes.length ===  0){
            const types = await getAllTypes();
            const addedTypes = await Type.bulkCreate(types);
        }
        res.status(200).json(results);
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

const getPokemonByNameHandler = async(req, res) => {
    const {name} = req.query;
    try{
        const pokemonByName = await pokemonByNameController(name); 
        res.status(200).json(pokemonByName);
    } catch(error){
        res.status(400).json({error: error.message});
        console.log(error)
    }
}


const getPokemonByIdHandler = async (req, res) => {
    const { id } = req.params;
    let foundPokemon;
    if (id > 0 && id < 100) {
      const foundPokemon = await getPokemonByNameOrId(id);
      return foundPokemon ? res.status(200).send(foundPokemon)
        : res.status(404).send('No pokemon found with that id :(');
    }
    const pokemonsDB = await getDbPokemons();
    if (!foundPokemon && id) {
        console.log("buscando con este id:", id)
      const pokemonDb = pokemonsDB.find((pokemon) => pokemon.id === id);
      console.log("retorna este poke: ", pokemonDb)
      return pokemonDb ? res.status(200).json(pokemonDb)
        : res.status(404).send('No pokemon found with that id :(');
    }
}


//prueba
// const createPokemonHandler = async (req, res) => {
//     const {name, hp, attack, speed, defense, height, weight, types} = req.body;
//     try{
//         const newPokemon = await createPokemon(name, hp, attack, speed, defense, height, weight);
//         const pokeTypes = await getTypes(types);
//         newPokemon.addType(pokeTypes);
//         console.log(newPokemon);
//         res.status(201).json(newPokemon)
//     } catch (error){
//         res.status(400).json({error: error.message});
//     }
// }

const createPokemonHandler = async (req, res) => {
    const {name, hp, attack, speed, defense, height, weight, types } = req.body;
    try{
        const created = await Pokemon.create({name, hp, attack, speed, defense, height, weight});
        const typesDb = await Type.findAll({
            where: {name: types}
        });
        created.addType(typesDb);
        console.log(created);
        return res.status(200).send("Pokemon created!");
    } catch (error) {
        res.send(400).json({error: error.message});
    }
}


  



module.exports = {getPokemonsHandler, createPokemonHandler, getPokemonByIdHandler, getPokemonByNameHandler};