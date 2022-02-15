'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('reports', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true},
    timestamp: { type: 'datetime', notNull: true },
    rating: { type: 'int', notNull: true },
    image: { type: 'blob', notNull: false },
    latitude: { type: 'decimal', notNull: true},
    longitude: { type: 'decimal', notNull: true}
  });
};

exports.down = function(db) {
  return db.dropTable('reports');
};

exports._meta = {
  "version": 1
};
