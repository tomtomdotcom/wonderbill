import 'mocha';
import chai from 'chai';
import createServer from '../../src/server';
import sinonChai from 'sinon-chai';
import supertest from 'supertest';
import supertestAgent from 'supertest-koa-agent';

chai.use(sinonChai);
// const expect = chai.expect;

describe('/bills', () => {
  let server: any;
  let request: supertest.SuperTest<supertest.Test>;

  before(() => {
    return (server = createServer().then(s => {
      server = s;
      request = supertestAgent(server);
    }));
  });

  describe('/bills/:type', () => {
    it('should return 404 if no bills type is specified', () => {
      return request.get('/bills').expect(404);
    });
  });

  describe('/bills/:type', () => {
    it('should return 200 if a gas bill type is specified', () => {
      return request.get('/bills/gas').expect(200);
    });
  });

  describe('/bills/:type', () => {
    it('should return 200 if an internet bill type is specified', () => {
      return request.get('/bills/internet').expect(200);
    });
  });

  describe('/bills/:type', () => {
    it('should return 404 if a shopping bill type is specified', () => {
      return request.get('/bills/shopping').expect(404);
    });
  });
});
