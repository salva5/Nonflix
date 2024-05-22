const {User, Shop, Review, FavoriteMovie } = require("../db")

const getAllUsers = async (req, res) => {
    try {

        const user = await User.findAll({
          include: [
            {
                model: Shop, Review, FavoriteMovie,
                attributes: { attributes: []},
            }
         ]
        })
        

        if(!user) throw new Error('The User does not exist')
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({error: error.message})
        
    }
}

module.exports = {getAllUsers}