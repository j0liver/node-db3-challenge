const knex = require('../db')

const find = (id) => {
  return knex
  .select("*")
  .from("schemes");
          }
    

const findById = (id) => {
  return knex
        .select("*")
        .from("schemes")
        .where({ id: id });
}

const findSteps = (id) => {
    return knex("schemes")
      .join("steps", "schemes.id", "=", "steps.scheme_id")
      .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
      .where({ "schemes.id": id })
      .orderBy(["scheme_name", { column: "step_number", order: "asc" }]);
  }

  const addScheme = (scheme) => {
    return knex("schemes")
    .insert(scheme, "id")
    .then(id => {
      return knex("schemes")
        .select("*")
        .where({ id: id[0] });
    });
  }

  const addStep = (step, id) => {
    return knex('step')
    .insert(step, "id")
    .then(id => {
        return knex("steps")
          .select("*")
          .where({ id: id[0] });
      });
}

const editScheme = (update, id) => {
    return knex('schemes')
    .where({ id })
    .update(update, "id")
    .then(() => {
      return knex("schemes")
        .select("*")
        .where({ id: id });
    });
}

const deleteScheme = (id) => {
    return knex('scheme')
    .where('id', id)
    .del()
}

module.exports = {
    find,
    findById,
    findSteps,
    addScheme,
    addStep,
    editScheme,
    deleteScheme
}