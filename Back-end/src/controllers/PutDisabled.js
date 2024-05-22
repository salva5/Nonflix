const { Movie } = require('../db')


const putDisabled = async (req, res) => {
    try {

       const { disabled, id} = req.body;
       

        const movie = await Movie.findByPk(id);
        await movie.update({disabled});
        

        

        res.status(200).json(movie)

    } catch (error) {
        res.status(400).json(error.message)        
    }
};

module.exports = { putDisabled }