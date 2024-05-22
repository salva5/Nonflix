const { Review } = require("../db");


const postReview = async (req, res) =>{
    try {
        const { title, description, rating, movieId, userId } = req.body;
                
        if (!title || !description || !rating || !movieId || !userId ) {
            throw new Error("Something is missing");
          }

          const newReview = await Review.create({title, description, rating, movieId, userId })

          res.status(201).json(newReview);

        } catch (error) {
            res.status(400).json(error.message);
    }
};

module.exports = { postReview };
        
        