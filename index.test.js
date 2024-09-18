const { sequelize } = require("./db");
const { Band, Musician, Song } = require("./index");

describe("Band, Musician, and Song Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Band", async () => {
    const band = await Band.create({
      name: "Kings of Leon",
      genre: "Alternative/Indie",
    });

    expect(band.name).toBe("Kings of Leon");
  });

  test("can create a Musician", async () => {
    const musician = await Musician.create({
      name: "Peso Pluma",
      instruments: "guitar",
    });

    expect(musician.name).toBe("Peso Pluma");
  });

  test("can create a Song", async () => {
    const song = await Song.create({
      title: "Nueva Vida",
      year: 2023,
      length: 3.11,
    });

    expect(song.title).toBe("Nueva Vida");
  });

  test("can update a Band", async () => {
    const band = await Band.create({ name: "Guns and Roses", genre: "Rock" });
    await Band.update(
      { name: "Fuerza Regida", genre: "Mexican" },
      { where: { id: band.id } }
    );
    const updatedBand = await Band.findByPk(band.id);

    expect(updatedBand.name).toBe("Fuerza Regida");
    expect(updatedBand.genre).toBe("Mexican");
  });

  test("can update a Musician", async () => {
    // TODO - test updating a musician
    expect("NO TEST").toBe("EXPECTED VALUE HERE");
  });

  test("can delete a Band", async () => {
    // TODO - test deleting a band
    expect("NO TEST").toBe("EXPECTED VALUE HERE");
  });

  test("can delete a Musician", async () => {
    // TODO - test deleting a musician
    expect("NO TEST").toBe("EXPECTED VALUE HERE");
  });
});
