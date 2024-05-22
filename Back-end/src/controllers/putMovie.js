//`http://localhost:3001/Nonflix/movies/update/${id}`

const { Movie } = require('../db')


const putMovie = async (req, res) => {
    try {
        const { id } = req.params;
    

        const movie = await Movie.findByPk(id);
        console.log(movie);
        await movie.update(req.body);
        

        

        res.status(200).json(movie)

    } catch (error) {
        res.status(400).json(error.message)        
    }
};

module.exports = { putMovie }