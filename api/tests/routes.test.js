const request = require('supertest');
const app = require('../src/app.js');


  describe("GET /", () => {
    it("should return an array of pokemons", async () => {
    const response = await request(app).get("/pokemons");
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});


  describe("GET /id", () => {
    it('should return an object', async () => {
      const id = 1; 
      const response = await request(app).get(`/pokemons/${id}`);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Object);
    })
    it('should return a statusCode 404 when id does not exist', async () => {
      const id = 'no-valid';
      const response = await request(app).get(`/pokemons/${id}`);
      expect(response.statusCode).toBe(404);
    })
  })

    
    // describe("POST /", () => {
    //   it('should create a new Pokemon', async ()=> {
    //     const response = await request(app).post("/pokemons");
    //     expect(response.statusCode).toEqual(201);
    //     expect(Array.isArray(response.body)).toBe(true);
    //   })
    // })
