const request = require('supertest');
// const app = require('../src/app')
const pokemonsRouter = require("../src/routes/pokemonsRouter")

describe('GET /', () =>{
    it('should return a list of pokemons', async () => {
        const response = await request(pokemonsRouter).get('/') 
        expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array)
        })
        // expect(response.body).toHaveProperty('id');
        // expect(response.body).toHaveProperty('name');
    });


// describe('GET /', () =>{
//     it('should return a list of pokemons', async () => {
//         const response = await request(pokemonsRouter).get('/').then(response => {expect(response.status).toBe(200);
//             // expect(response.body).toBeInstanceOf(Array)
//         })
//         // expect(response.body).toHaveProperty('id');
//         // expect(response.body).toHaveProperty('name');
//     });
// });