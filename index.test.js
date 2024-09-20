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
    const musician = await Musician.create({
      name: "Bad Bunny",
      instruments: "horns",
    });
    await Musician.update(
      { name: "Post Malone", instruments: "guitar" },
      { where: { id: musician.id } }
    );
    const updatedMusician = await Musician.findByPk(musician.id);

    expect(updatedMusician.name).toBe("Post Malone");
    expect(updatedMusician.instruments).toBe("guitar");
  });

  test("can delete a Band", async () => {
    const band = await Band.create({ name: "Rebelution", genre: "reggae" });

    const deletedBand = await band.destroy();
    expect(deletedBand.name).toBeNull;
  });

  test("can delete a Musician", async () => {
    const song = await Song.create({
      title: "golden hour",
      year: 2022,
      length: 3.52,
    });

    const deletedSong = song.destroy();
    expect(deletedSong).toBeNull;
  });

  test("Can associate Musicians with a Band", async () => {
    const band = await Band.create({
      name: "Linkin Park",
      genre: "Alternative/Rock",
    });
    const musician1 = await Musician.create({
      name: "Chester",
      instruments: "vocals",
    });

    await band.addMusician(musician1);

    const musicians = await band.getMusicians();

    expect(musicians[0].name).toBe("Chester");
  });

  test("Song and musician association", async () => {
    const band = await Band.create({
      name: "Linkin Park",
      genre: "Alternative/Rock",
    });
    const musician1 = await Musician.create({
      name: "Chester",
      instruments: "vocals",
    });
    const musician2 = await Musician.create({
      name: "Mike Shinoda",
      instruments: "vocals/guitar",
    });

    await band.addMusician(musician1);
    await band.addMusician(musician2);

    const song1 = await Song.create({
      title: "Numb",
      year: 2003,
      length: 3.08,
    });
    const song2 = await Song.create({
      title: "Faint",
      year: 2003,
      length: 2.43,
    });

    await band.addSong(song1);
    await band.addSong(song2);

    const bandSongs = await band.getSongs();

    expect(bandSongs.length).toBe(2);

    const bandMusicians = await band.getMusicians();

    expect(bandMusicians.length).toBe(2);
  });
});
