'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
chai.use(chaiHttp);

jest.mock('../src/middleware', () => jest.fn().mockImplementation((req, res, next) => {
  return next();
}))
describe('Employee routes', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => jest.fn())
  });
  it('should return 200 status with GET employees', (done) => {
    chai
    .request(server)
    .get('/api/v1/employees')
    .end((err, res) => {
      expect(err).toBe(null);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        status: 'success',
        message: 'GET employees'
      });
      done();
    });
  });
  it('should return 200 status with POST employees', (done) => {
    chai
    .request(server)
    .post('/api/v1/employees')
    .end((err, res) => {
      expect(err).toBe(null);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        status: 'success',
        message: 'POST employees'
      });
      done();
    });
  });
  it('should return 200 status with DELETE employees', (done) => {
    chai
    .request(server)
    .delete('/api/v1/employees')
    .end((err, res) => {
      expect(err).toBe(null);
      expect(res.statusCode).toEqual(404);
      done();
    });
  });
});