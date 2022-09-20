const supertest = require('supertest');
const validator = require('validator');
const assert = require('assert');
const is = require('is_js');
const { faker } = require('@faker-js/faker');

const request = supertest('http://127.0.0.1/fusionsuite/backend');

/**
* /v1/types endpoint
*/
describe('organizations | properties | attach properties to type2 by user1', function() {

  it ('attach prop1 to mytype2', function(done) {
    request
    .post('/v1/config/types/'+global.mytype2+'/property/'+global.myprop1)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + global.tokenUser1)
    .expect(403)
    .expect('Content-Type', /json/)
    .expect(function(response) {
      assert(is.propertyCount(response.body, 2));
      assert(validator.equals(response.body.status, 'error'));
      assert(validator.equals(response.body.message, 'This property is not in your organization'));
    })
    .end(function(err, response) {
      if (err) {
        return done(err + ' | Response: ' + response.text);
      }
      return done();
    });
  });

  it ('attach mypropSub1 to mytype2', function(done) {
    request
    .post('/v1/config/types/'+global.mytype2+'/property/'+global.mypropSub1)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + global.tokenUser1)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function(response) {
      assert(is.propertyCount(response.body, 0));
    })
    .end(function(err, response) {
      if (err) {
        return done(err + ' | Response: ' + response.text);
      }
      return done();
    });
  });

  it ('attach prop2 to mytype2 (not ok because property under the organization of the type)', function(done) {
    request
    .post('/v1/config/types/'+global.mytype2+'/property/'+global.myprop2)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + global.tokenUser1)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function(response) {
      assert(is.propertyCount(response.body, 0));
    })
    .end(function(err, response) {
      if (err) {
        return done(err + ' | Response: ' + response.text);
      }
      return done();
    });
  });

});