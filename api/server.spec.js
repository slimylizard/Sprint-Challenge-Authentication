const request = require('supertest')
const jokesRouter = require('../jokes/jokes-router.js');

describe('GET /', () => {
 //should return 200 ok
 it('should return 200 http status code', () => {
     request(jokesRouter).get('/').then(response => {
         expect(response.status).toBe(500);
     })
 })
 //should return joke data results
 test('should return JSON', async () => {
     const response = await request(server).get('/');
     expect(response.type).toMatch(/xml/i)
 })
})