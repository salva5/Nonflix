// Endpoint: http://localhost:3001/Nonflix/movies/"aca el <idMovie> a buscar"

const { Movie, Review } = require("../db")

const getDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const finded = await Movie.findByPk(id, {
            include: [
                {
                    model: Review,
                }
            ]
        }); 

        if(!finded) return res.status(200).json("The movie was not found");

            res.status(200).json(finded)
    } catch (error) {
        res.status(400).json(error);
    }
}
module.exports = { getDetail };