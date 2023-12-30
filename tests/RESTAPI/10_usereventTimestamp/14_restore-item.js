const supertest = require('supertest');
const validator = require('validator');
const assert = require('assert');
const is = require('is_js');

const request = supertest('http://127.0.0.1/fusionsuite/backend');

describe('usereventTimestamp | restore item', function () {
  it('update the item with admin user to restore the item', function (done) {
    request
      .patch('/v1/items/' + global.itemId)
      .send({})
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + global.tokenUser2)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, response) {
        if (err) {
          return done(err + ' | Response: ' + response.text);
        }
        return done();
      });
  });

  it('check the item fields', function (done) {
    request
      .get('/v1/items/' + global.itemId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + global.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (response) {
        assert(is.not.empty(response.body));
        assert(is.equal('test patch', response.body.name));
        assert(validator.isISO8601(response.body.created_at, 'created_at must be filled with creation date'));
        assert(validator.isISO8601(response.body.updated_at, 'updated_at must be filled with update date'));
        assert(is.null(response.body.deleted_at, 'deleted_at must be null'));
        assert(is.not.equal(response.body.created_at, response.body.updated_at, 'created_at and updated_at must be different'));

        assert(is.object(response.body.created_by), 'created_by must be object');
        assert(is.equal(4, Object.keys(response.body.created_by).length), 'created_by must have 4 attributes: id, name, first_name, last_name');
        assert(is.equal(2, response.body.created_by.id, 'created_by must be filled with admin user id'));
        assert(is.equal(4, Object.keys(response.body.updated_by).length), 'updated_by must have 4 attributes: id, name, first_name, last_name');
        assert(is.equal(global.user2, response.body.updated_by.id, 'updated_by must be filled with admin id'));
        assert(is.null(response.body.deleted_by, 'deleted_by must be null'));
      })
      .end(function (err, response) {
        if (err) {
          return done(err + ' | Response: ' + response.text);
        }
        return done();
      });
  });
});
