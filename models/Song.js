const { Sequelize, sequelize } = require("../db");

// TODO - define the Song model
class Song extends Sequelize.Model {}

Song.init(
  {
    title: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.INTEGER,
    },
    length: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Song",
  }
);

module.exports = {
  Song,
};
