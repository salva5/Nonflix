// http://localhost:3001/Nonflix/movies/fav?movieId=" "&userId=" "

const { Movie, User, FavoriteMovie } = require("../db")

const deleteFav = async (req, res) => {
    try {
        const { movieId, userId } = req.query;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json("User not found");
        }

        const movie = await Movie.findByPk(movieId);

        if (!movie) {
            return res.status(404).json("Movie not found");
        }

        await FavoriteMovie.destroy({
            where: {
                userId,
                movieId
            }
        });

        const AllFavorites = await FavoriteMovie.findAll({
            where: {
                userId
            }
        })

        let favoritesMovies = [];

        for (const object of AllFavorites) {
            favoritesMovies.push(await Movie.findByPk(object.movieId))
        }

        res.status(200).json(favoritesMovies)
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
}
module.exports = { deleteFav };