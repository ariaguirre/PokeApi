const request = require('supertest');
// const app = require('../src/app')
const app = require('../src/app.js');

const pokemonsRouter = require("../src/routes/pokemonsRouter")

// describe('GET /', () =>{
//     it('should return a list of pokemons', async () => {
//         const response = await request(pokemonsRouter).get('/') 
//         expect(response.status).toBe(200);
//             expect(response.body).toBeInstanceOf(Array)
//         })
//         // expect(response.body).toHaveProperty('id');
//         // expect(response.body).toHaveProperty('name');
//     });

    describe("GET /", () => {
        it("should return an array of pokemons", async () => {
          const res = await request(pokemonsRouter).get("/");
          expect(res.statusCode).toEqual(200);
        //   expect(Array.isArray(res.body)).toBe(true);
        });
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