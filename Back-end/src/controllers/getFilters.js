const { Movie, Genre } = require("../db");

// EndPoint: http://localhost:3001/Nonflix/movies/filter/year/:number  example:2023
const getFilterYear = async (req, res) => {
  try {
    const { number } = req.params;

    if (number) {
      const movies = await Movie.findAll(); // db movies
      const moviesYear = movies.filter((movie) => movie.year === +number); // Filter year

      moviesYear.length
        ? res.status(200).json(moviesYear)
        : res.status(400).json("Year no Found");
    } else {
      return res.status(400).json({ error: "Año no proporcionado en la ruta" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// EndPoint:  http://localhost:3001/Nonflix/movies/filter/language/?name= example:en
const getFilterLanguage = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const movies = await Movie.findAll(); // db movies
      const moviesLanguage = movies.filter(
        (movie) => movie.language === name.toLowerCase()
      );

      moviesLanguage.length
        ? res.status(200).json(moviesLanguage)
        : res.status(400).json("Language no Found");
    } else {
      return res.status(400).json({ error: "Query language not in the URL" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
// EndPoint:  http://localhost:3001/Nonflix/movies/filters?origin=home&year=2020&lang=en
const filters = async (req, res) => {
  try {
    const { origin, year, lang } = req.query;
    let filters = [];
    if (origin === "Home") {
      filters = await Movie.findAll({
        where: {
          ...(year ? { year: year } : {}),
          ...(lang ? { language: lang } : {}),
        },
      });
      
      if (filters === undefined || filters === null) {
        return res.status(404).json({ message: "No movies to display" });
      } else {
        return res.status(200).json(filters);
      }
    } else {
      filters = await Genre.findByPk(origin, {
        include: [
          {
            model: Movie,
            where: {
              ...(year ? { year: year } : {}),
              ...(lang ? { language: lang } : {}),
            },
          },
        ],
      });
      console.log(filters);
      if (filters === undefined || filters === null) {
        return res.status(404).json({ message: "No movies to display" });
      } else {
        return res.status(200).json(filters);
      }
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  getFilterYear,
  getFilterLanguage,
  filters,
};
