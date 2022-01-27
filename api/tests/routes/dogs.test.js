/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest');
const { app, server } = require('../../app');

const api = supertest(app);

const { Dog } = require('../../models');


describe('henrydogs route /api/dogs/:id tt get do by id', () => {

  let dog;
  beforeEach( async() => {
    
    dog = {
      name: "Affenpinscher",
      minWeight: "1",
      maxWeight: "2",
      minHeight: "3",
      maxHeight: "4",
      minYear: "5",
      maxYear: "6",
      temps: [
				"Curious",
        "Adventurous",
        "Active"
      ]
    }

		await api.get('/api/temperament');
  })

  afterAll(async() => {
    await Dog.destroy({ where: {} });
  })
  
  afterAll(async() => {
    await server.close();
  })
  
  // name

   it('should do the get by id of the created dog', async() => {
	
		let id;
    
    await api
			.post('/api/dog')
				.send(dog)
				.then(res => {

					id = res.body.id;
				})

		await api
			.get(`/api/dogs/${id}`)
				.then(res => {
					
					expect(res.body.name).toEqual(dog.name);
					expect(res.body.temps.length).toEqual(dog.temps.length);
					expect(res.body.weight).toEqual(`${dog.minWeight} - ${dog.maxWeight} kg`);
					expect(res.body.height).toEqual(`${dog.minHeight} - ${dog.maxHeight} cm`);
					expect(res.body.life_span).toEqual(`${dog.minYear} - ${dog.maxYear} years`);
				})
  })

})
