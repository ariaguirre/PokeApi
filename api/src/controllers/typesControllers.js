const {Type} = require("../db");
const axios = require("axios");

const getAllTypes = async () => {
    databaseTypes = Type.findAll();
    const apiTypes = (await axios.get("https://pokeapi.co/api/v2/type")).data.results;

    if(databaseTypes.length > 0) return apiTypes.concat(databaseTypes);
    else return apiTypes;
}

const createType = async (name) => await Type.create({name});




const getTypes = async (types) =>  {return await Type.findAll({where: {name: types}})}


module.exports = {getAllTypes, createType, getTypes};