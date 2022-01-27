/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest');
const { app, server } = require('../../app');

const api = supertest(app);

const { Dog } = require('../../models');


describe('henrydogs route /api/dog to create dog', () => {

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
  })

  afterAll(async() => {
    await Dog.destroy({ where: {} });
  })
  
  afterAll(async() => {
    await server.close();
  })
  
  // name

   it('should return 404 if the name already exists in the database', async() => {
    
    await api
      .get('/api/temperament')
      .expect(200)
    
    await api
    .post('/api/dog')
      .send(dog)
      .expect(201)

    await api
      .post('/api/dog')
      .send(dog)
      .expect(400)
  })
  
  it('should return a 404 when the name is invalid', async() => {
    
    dog.name = "hello1";
    
    await api
    .post('/api/dog')
    .send(dog)
    .expect(400)
  })

  it('should return a 404 when the name is empty', async() => {
    
    const dog2 = {
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

    await api
    .post('/api/dog')
    .send(dog2)
    .expect(400)
  })

  // weights

  it('should return a 404 when the weight range is invalid', async() => {

    dog.minWeight = "20";
    dog.maxWeight = "10";

    await api
      .post('/api/dog')
      .send(dog)
      .expect(400)
  })

  it('should return a 404 when the weight is not number', async() => {

    dog.minWeight = "a";
    dog.maxWeight = "10";

    await api
      .post('/api/dog')
      .send(dog)
      .expect(400)
  })

  // heights

  it('should return a 404 when the heigth range is invalid', async() => {

    dog.minHeight = "20";
    dog.maxHeight = "10";

    await api
      .post('/api/dog')
      .send(dog)
      .expect(400)
  })

  it('should return a 404 when the heigth is not number', async() => {

    dog.minHeight = "a";
    dog.maxHeight = "10";

    await api
      .post('/api/dog')
      .send(dog)
      .expect(400)
  })

  // years

  it('should return a 404 when the life_span range is invalid', async() => {

    dog.minYear = "20";
    dog.maxYear = "10";

    await api
      .post('/api/dog')
      .send(dog)
      .expect(400)
  })

  it('should return a 404 when the year is not number', async() => {

    dog.minYear = "a";
    dog.maxYear = "10";

    await api
      .post('/api/dog')
      .send(dog)
      .expect(400)
  })


  // temps

  it('should return 404 if a temper does not exist in the database', async() => {

    dog.temps = [ "hello", "Active"];

    await api
      .post('/api/dog')
      .send(dog)
      .expect(400)
  })

})
