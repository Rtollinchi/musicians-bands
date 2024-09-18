const { Sequelize, sequelize } = require("../db");

// TODO - define the Band model
class Band extends Sequelize.Model {}

Band.init(
  {
    name: {
      type: Sequelize.STRING,
    },
    genre: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: "Band",
  }
);
module.exports = {
  Band,
};
