const {User, Shop, Review, FavoriteMovie } = require("../db")

const getOrders = async (req, res) => {
    try {

        const user = await Shop.findAll({
            attributes: ['articlesQt', 'total', 'status', 'mercadoPagoId'],
            include: [
                {
                    model: User,
                    attributes: ['email'] // Reemplaza 'name' por el nombre de la columna de User que deseas incluir
                }
            ]
        })
        

        if(!user) throw new Error('No orders found')
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({error: error.message})
        
    }
}

module.exports = {getOrders}