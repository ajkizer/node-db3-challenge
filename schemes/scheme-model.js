const db = require("../data/db-config");

module.exports = {
  find
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}
