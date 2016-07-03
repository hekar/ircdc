const pgp = require('pg-promise');
const row = require('./row');

function create(table) {
  function* create(db, value) { //eslint-disable-line no-shadow
    return row.first(yield db.query(
      `insert into $<table~>(json)
      values($<json>)
      `, {
        table,
        json: pgp.as.json(value)
    }));
  }

  function* list(db) {
    return row.json('json',
      yield db.query('select json from $<table~>',
        { table }));
  }

  function* get(db, id) {
    return row.first(yield db.query(
      `select json from $<table~>
      where id=$<id>
      `, {
        table,
        id
    }));
  }

  function* del(db, id) {
    return row.first(yield db.query(
      `delete from $<table~>
      where id=$<id>
      `, {
        table,
        id
    }));
  }

  const dao = {
    create,
    list,
    get: get,
    del
  };

  return dao;
}

module.exports = {
  create
};
