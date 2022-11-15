const common = require('../common.js');
const commonCreateItem = require('../commonCreateItem.js');

describe('itemProperties | typelink type | working set | default value', function () {
  describe('prepare', function () {
    it('define the type typelink', function (done) {
      common.defineValuetype(done, 'typelink');
    });

    it('create a new type typelink', function (done) {
      common.createType(done, 'typelink');
    });

    it('create the property', function (done) {
      common.createProperty(done, 1); // with type with id=1 (organization)
    });

    it('Get the property to check value is good', function (done) {
      common.checkProperty(done, 1);
    });

    it('Attach a property to the type typelink', function (done) {
      common.attachPropertyToType(done);
    });
  });

  describe('item, create: no property', function () {
    it('create a new item', function (done) {
      commonCreateItem.createItem(done, false, 1);
    });

    it('Get the item to check value is good', function (done) {
      commonCreateItem.checkItemOkTypelink(done, 1);
    });

    it('Soft delete the item', function (done) {
      common.deleteItem(done);
    });

    it('Hard delete the item', function (done) {
      common.deleteItem(done);
    });
  });

  describe('item, create: type id', function () {
    it('create a new item', function (done) {
      commonCreateItem.createItem(done, true, 2);
    });

    it('Get the item to check value is good', function (done) {
      commonCreateItem.checkItemOkTypelink(done, 2);
    });

    it('Soft delete the item', function (done) {
      common.deleteItem(done);
    });

    it('Hard delete the item', function (done) {
      common.deleteItem(done);
    });
  });

  describe('item, create: null value', function () {
    it('create a new item', function (done) {
      commonCreateItem.createItem(done, true, null);
    });

    it('Get the item to check value is good', function (done) {
      commonCreateItem.checkItemOkTypelink(done, null);
    });
  });

  describe('item, update: type id', function () {
    it('update item', function (done) {
      commonCreateItem.updateItem(done, 1);
    });

    it('Get the item to check value is good', function (done) {
      commonCreateItem.checkItemOkTypelink(done, 1);
    });
  });

  describe('item, update: return to null value', function () {
    it('update item', function (done) {
      commonCreateItem.updateItem(done, null);
    });

    it('Get the item to check value is good', function (done) {
      commonCreateItem.checkItemOkTypelink(done, null);
    });
  });

  describe('item, update: return to default value', function () {
    it('Update the item to default value', function (done) {
      commonCreateItem.updateItemToDefault(done);
    });

    it('Get the item to check value is good', function (done) {
      commonCreateItem.checkItemOkTypelink(done, 1);
    });
  });

  describe('clean', function () {
    it('Soft delete the item', function (done) {
      common.deleteItem(done);
    });

    it('Hard delete the item', function (done) {
      common.deleteItem(done);
    });

    it('Soft delete the type: test typelink', function (done) {
      common.deleteType(done);
    });

    it('Hard delete the type: test typelink', function (done) {
      common.deleteType(done);
    });

    it('Soft delete the property', function (done) {
      common.deleteProperty(done);
    });

    it('Hard delete the property', function (done) {
      common.deleteProperty(done);
    });
  });
});
