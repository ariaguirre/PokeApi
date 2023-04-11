const { Router } = require('express');
const axios = require('axios')
const {Pokemon, Type} = require('../db')
const pokemonsRouter = require('./pokemonsRouter');
const typesRouter = require("./typesRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/pokemons', pokemonsRouter);
router.use("/types", typesRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
