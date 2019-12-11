const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db("steps")
    .join("schemes", "schemes.id", "steps.scheme_id")
    .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
    .where({ scheme_id: id })
    .orderBy("steps.step_number");
}

function add(schemeData) {
  return db("schemes")
    .insert(schemeData)
    .then(ids => {
      console.log(ids);
      return findById(ids[0]);
    });
}

function addStep(stepData, id) {
  return db("steps")
    .insert(stepData, id)
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(count => {
      return findById(id);
    });
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}
