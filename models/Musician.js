const { Sequelize, sequelize } = require("../db");

// TODO - define the Musician model
class Musician extends Sequelize.Model {}

Musician.init(
  {
    name: {
      type: Sequelize.STRING,
    },
    instruments: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: "Musicians",
  }
);

module.exports = {
  Musician,
};
