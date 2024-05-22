//http://localhost:3001/Nonflix/movies/fav?userId="la userId"

const {Movie, FavoriteMovie} = require("../db")

const getFavs = async (req,res)=> {
    try{
        const {userId} = req.query;

        const FavoritesMovies = await FavoriteMovie.findAll({where:{userId}})

        let allFavorites = [];

        for(const object of FavoritesMovies) {
            allFavorites.push(await Movie.findByPk(object.movieId));
        }
        
        res.status(200).json(allFavorites)
    } catch(error) {
        res.status(400).json({Error: error.message})
    }
}

module.exports = {getFavs}