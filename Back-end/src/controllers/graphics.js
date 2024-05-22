const { Movie, Shop } = require("../db");

const bestsellers = (req, res) => {
  Movie.sequelize
    .query(
      'SELECT "Movie"."id", "Movie"."title" as "name", COUNT(*) as "value" ' +
        'FROM "Movie" ' +
        'INNER JOIN "moviesShops" ON "Movie"."id" = "moviesShops"."MovieId" ' +
        'GROUP BY "Movie"."id" ' +
        'ORDER BY "value" DESC ' +
        "LIMIT 5",
      { model: Movie, raw: true }
    )
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(401).json(error);
    });
};

const bestFavorite = (req, res) => {
  Movie.sequelize
    .query(
      'SELECT COUNT(*) as "value", "title" as "name" ' +
        'FROM "Movie" ' +
        'INNER JOIN "FavoriteMovie" ON "Movie"."id" = "FavoriteMovie"."movieId" ' +
        'GROUP BY "Movie"."id" ' +
        'ORDER BY "value" DESC ' +
        "LIMIT 5",
      { model: Movie, raw: true }
    )
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(401).json(error);
    });
};

const salesByDate = (req, res) => {
  Shop.findAll({
    attributes: [
      [
        Shop.sequelize.fn(
          "TO_CHAR",
          Shop.sequelize.fn(
            "DATE_TRUNC",
            "day",
            Shop.sequelize.col("createdAt")
          ),
          "YYYY-MM-DD"
        ),
        "Date",
      ],
      [Shop.sequelize.fn("SUM", Shop.sequelize.col("total")), "Total by date"],
    ],
    group: ["Date"],
    order: ["Date"],
  })
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(401).json(error);
    });
};

  
module.exports = { bestsellers, bestFavorite, salesByDate };
