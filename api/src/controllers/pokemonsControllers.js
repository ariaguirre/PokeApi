const db = require("../db");
const {Pokemon, Type} = require("../db");
const axios = require("axios");

async function getPokemonsAPI() {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=40"
      );
      const data = Promise.all(
        response.data.results.map(async (pokemon) => {
          let subRequest = await axios.get(pokemon.url);
          let pokemonResult = {
            name: subRequest.data.name,
            id: Number(subRequest.data.id),
            hp: subRequest.data.stats[0].base_stat,
            // attack: subRequest.data.stats[1].base_stat,
            // defense: subRequest.data.stats[2].base_stat,
            // speed: subRequest.data.stats[4].base_stat,
            // height: subRequest.data.height,
            // weight: subRequest.data.weight,
            image: subRequest.data.sprites.other.home.front_default,
            types: subRequest.data.types.map((type) => {
              return { name: type.type.name };
            }),
            created: "false",
          };
          return pokemonResult;
        })
      );
      return data;
    } catch (error) {
      return error;
    }
  }

  const getDbPokemons = async () => {
    const dbPokemons = await Pokemon.findAll({
      include: {
        model: Type,
      },
    });
    const dbPokemon = dbPokemons.map((pokemon)=> {
      const result = pokemon.toJSON();
      return{
        ...result, 
        types: result.types.map((type) => type.name)
      }
    })
    return dbPokemon;
  }

  // async function getAllPokemons() {
  //   const dbPokemons = await Pokemon.findAll({
  //     include: {
  //       model: Type,
  //       through: {

  //         attributes: [],
  //       },
  //       attributes: ["name"],
  //     },
  //   });
  //   const ApiPokemons = await getPokemonsAPI();
  //   return [...ApiPokemons, ...dbPokemons];
  // }

  const getAllPokemons = async () => {
    try {
      const apiPokemons = await getPokemonsAPI();
      const dbPokemons = await getDbPokemons();
      return [...apiPokemons, ...dbPokemons];
    } catch (error) {
      res.send(400).json({error: error.message});
    }
  };



const createPokemon = async function (name, hp, attack, speed, defense, height, weight) {
  let newPokemon = await Pokemon.create({name, hp, attack, speed, defense, height, weight});
  return "Pokemon created ok";
};

const getPokemonByNameOrId = async (id, name) => {
  if (id && !name) {
    try {
      const apiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const foundPokemon = apiPokemon.data;
      const pokemon = {
        id: foundPokemon.id,
        name: foundPokemon.name,
        img: foundPokemon.sprites.other['official-artwork'].front_default,
        hp: foundPokemon.stats[0].base_stat,
        attack: foundPokemon.stats[1].base_stat,
        defense: foundPokemon.stats[2].base_stat,
        speed: foundPokemon.stats[5].base_stat,
        height: foundPokemon.height,
        weight: foundPokemon.weight,
        types: foundPokemon.types.map((t) => t.type.name),
      };
      return pokemon;
    } catch (error) {
      console.log(error);
    }
  }
  if (!id && name) {
    try {
      const apiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const foundPokemon = apiPokemon.data;
      const pokemon = {
        id: foundPokemon.id,
        name: foundPokemon.name,
        img: foundPokemon.sprites.other['official-artwork'].front_default,
        hp: foundPokemon.stats[0].base_stat,
        attack: foundPokemon.stats[1].base_stat,
        defense: foundPokemon.stats[2].base_stat,
        speed: foundPokemon.stats[5].base_stat,
        height: foundPokemon.height,
        weight: foundPokemon.weight,
        types: foundPokemon.types.map((t) => t.type.name),
      };
      return pokemon;
    } catch (error) {
      console.log(error);
    }
  }
};

const pokemonByNameController = async(name)=> {
  try{
    const extApiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if(extApiPokemon.data !== "") return extApiPokemon.data
  } catch(error){
    const dbPokemon = await Pokemon.findAll({where:{name:name}});
    console.log("dbPokemon:", dbPokemon)
    if(dbPokemon.length > 0 ) return dbPokemon;
  }
} 




// const getPokemonById = async (id) => {
//     if (typeof id === "number") {
//       const pokemonDb = await Pokemon.findAll({
//         where: {
//           id: id,
//         },
//         include: {
//           model: Type,
//           through: {
//             attributes: [],
//           },
//           attributes: ["name"],
//         },
//       });
//       if (pokemonDb) {
//         return res.json(pokemonDb);
//       } else {
//         const pokemonsApi = await getPokemonsAPI();
//         const foundPokemon = pokemonsApi.find((p) => p.id === id);
//         if (foundPokemon) {
//           return res.json(foundPokemon);
//         } else {
//           return res.json("El ID ingresado no pertenece a ningún pokemon");
//         }
//       }
//     }
//     return res.send("El ID debe ser un número").status(404);
//   }



module.exports = {createPokemon, pokemonByNameController, getPokemonByNameOrId, getPokemonsAPI, getAllPokemons, getDbPokemons}