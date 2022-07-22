const supertest = require('supertest');
const validator = require('validator');
const assert = require('assert');
const is = require('is_js');
const { faker } = require('@faker-js/faker');

const request = supertest('http://127.0.0.1/fusionsuite/backend');

/**
* /v1/types endpoint
*/
describe('organizations | items | get items with user1', function() {

  it ('get all items in sub1 level of oganization', function(done) {
    request
    .get('/v1/items/type/'+global.typeId)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + global.tokenUser1)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function(response) {
      assert(is.not.empty(response.body), 'response body must not be empty');
      assert(is.array(response.body), 'response body must be an array');
      assert(is.propertyCount(response.body, 3), 'must have the 3 items');
      assert(is.equal(response.body[0].id, global.myitemSub1), 'must have the id of the myitemSub1');
      assert(is.equal(response.body[1].id, global.myitem2), 'must have the id of the myitem2');
      assert(is.equal(response.body[2].id, global.myitem3), 'must have the id of the myitem3');

    })
    .end(function(err, response) {
      if (err) {
        return done(err + ' | Response: ' + response.text);
      }
      return done();
    });
  });
});
