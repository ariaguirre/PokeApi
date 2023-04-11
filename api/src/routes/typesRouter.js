const {Router} = require('express');
const {getTypesHandler, createTypeHandler} = require("../handlers/typesHandlers");

const typesRouter = Router();

typesRouter.get("/", getTypesHandler);

typesRouter.post("/",createTypeHandler);


module.exports = typesRouter;