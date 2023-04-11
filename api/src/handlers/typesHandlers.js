const {getAllTypes, createType} = require("../controllers/typesControllers");

// const getTypesHandler = async (req, res) => {
//     const {name} = req.query;
//     try{
//         const results = name ? await getTypeByName(name) : await getAllTypes();
//         res.status(200).json(results);
//     } catch(error){
//         res.status(400).json({error: error.message});
//     }
// }

const getTypesHandler = async (req, res)=> {
    try{
        const results = await getAllTypes();
        res.status(200).json(results)
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const createTypeHandler = async (req, res) => {
    const {name} = req.body;
    try {
        const newType = await createType(name);
        res.status(201).json(newType);
    } catch(error){
        res.status(400).json({error: error.message});
    }
};


module.exports = {getTypesHandler, createTypeHandler};