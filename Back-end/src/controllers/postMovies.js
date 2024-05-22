//http://localhost:3001/Nonflix/movies
const { Movie, Genre } = require("../db")

const postMovies = async (req, res) => {
    try {
        const { title, duration, trailer, description, image, year, language, torrent, genre } = req.body;
        
        if (!title || !duration || !image || !year || !language || torrent.length === 0 || genre.length === 0) {
             throw new Error(("Incomplete information!"))
        }
        const checkExist = await Movie.findOne({where: {title,duration, image, year}})

        if(checkExist) {
            throw new Error("The movie already exists")
        }
        
        const newMovie = await Movie.create({
                title,
                duration,
                trailer: trailer ? trailer : "Has no trailer",
                description: description ? description : "Has no description",
                image,
                year,
                language,
                torrent
            })
            
        for(const gen of genre) {
            const newGenre = await Genre.findOrCreate({where:{
                id:gen,
                name:gen
            }})
            await newMovie.addGenre(newGenre[0].dataValues.id)
        } 
        
        const IncludeGenre = await Movie.findByPk(newMovie.dataValues.id,{
                    include: [
                        {
                            model: Genre,
                            through: { attributes: []},
                            attributes: ["id", "name"]
                        }
                    ]
                })
                
        res.status(200).json(IncludeGenre)

    } catch (error) {
        res.status(404).json(error.message)
    }
}

module.exports = { postMovies };