require('dotenv').config();
const { Dog } = require('../../models');
const dbConnection = require('../../db');



describe('Dog model', () => {
    
  beforeEach(() => {
    
    dbConnection({ force: true });
  })
  

  it('should throw an error if name is null', (done) => {

    Dog.create({})
      .then(() => done(new Error('It requires a valid name')))
      .catch(() => done());
  })

})
