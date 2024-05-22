const mercadopago = require("mercadopago");
const {sendEmailNotification} = require("../utils/sendEmailNotification");
const {purchaseHtml} = require("../utils/htmlPurchaseNotification");
require('dotenv').config()

const { Shop, Movie, User } = require("../db")

const { ACCESS_TOKEN } = process.env

mercadopago.configure({
    access_token: ACCESS_TOKEN,
})


const createOrder = (req, res) => {
    
    const { movies} = req.body
   
    
    const items = movies.map(movie => {
        return {
            id:movie.id,
            title: movie.title,
            quantity: 1,
            unit_price: movie.price,
            currency_id:"USD",
            description: movie.email,
            category_id: movie.user
        }
        
    });

    let preference = {
        items,
        back_urls:{
            success:'http://localhost:3001/Nonflix/shopping/success',
            failure: 'http://localhost:3001/Nonflix/shopping/failure',
            pending: "" //cuando el usuario no ha pagado
        },
        /* notification_url: "'http://localhost:3001/Nonflix/shopping/failure" , */
        auto_return: "approved"
    }

    mercadopago.preferences.create(preference)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json(console.log(error)))
}

const success = async (req, res) => {
    const {status, payment_id} = req.query
    
    let { response } = await mercadopago.payment.findById(Number(payment_id))
    const { additional_info, transaction_details } = response
    
    const repetido = await Shop.findAll({where:{mercadoPagoId: payment_id}})
    if(!repetido.length) {
        const id = additional_info.items.find(movie => movie.category_id)
        const shopDB =  await Shop.create({
            
            total: transaction_details.total_paid_amount, 
            articlesQt: additional_info.items.length,
            status: status,
            mercadoPagoId: payment_id,

            
        });
        const findUser = await User.findByPk(id.category_id)
        await shopDB.setUser(findUser)
        additional_info.items.forEach(async (movie) => {
            const moviesDB = await Movie.findAll({where:{id: movie.id}})
            await shopDB.addMovie(moviesDB);
            moviesDB.forEach( async (mov) => {
                const subject = "Succesful Purchase"
                await sendEmailNotification(movie.description, subject, purchaseHtml(mov.torrent[0].url))
            })
        });
        
    };
    res.redirect(`http://localhost:5173/Home?status=${status}`)
    
}
const failure = (req, res) => {
    const {status} = req.query
    res.redirect(`http://localhost:5173/Home?status=${status}`)
}

const purchasedMovies = async (req, res) => {
    const { userId } = req.query 
    try {

        
        const shopsDB = await Shop.findAll({where:{UserId: userId}, 
            include: [
                {
                    model: Movie,
                    attributes : ["id", "title", "image"],
                    through: {
                        attributes: []
                    },
                   
                },
            ]
        })
        if(shopsDB.length) {
            return res.json(shopsDB)
        }
        return res.send([{message:"You have not made any purchases"}])
    } catch (error) {
        return res.status(400).json({error:error.message}) 
    }
}




module.exports ={ 
    createOrder,
    success,
    failure,
    purchasedMovies
}
