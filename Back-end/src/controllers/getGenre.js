// http://localhost:3001/Nonflix/movies/genres

const {Genre } = require("../db")



const getGenre = async (req, res) => {
    try {

        const genre = await Genre.findAll()
        

        
        res.status(200).json(genre);

    } catch (error) {
        res.status(404).json({error: error.message})
        
    }
}

module.exports = {getGenre}