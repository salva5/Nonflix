// http://localhost:3001/Nonflix/login/update
const bcrypt = require("bcryptjs");

const {User} = require("../db")

const putUser = async (req, res) => {
    try{
    const { id, password, name, image, active, admin } = req.body;

       const hashedPassword = await bcrypt.hash(password, 8);
    
    // if(!id||!password||!name) {
        //     throw new Error("Information is missing")
        // }
        
        const user = await User.findByPk(id);
        if(name)user.name = name;
        if(hashedPassword) user.password = hashedPassword;
        if(image) user.image = image;
        if(active === true || active ===false) user.active = active;
        if(admin === true || admin ===false) user.admin = admin;
        
    
        const userUpdate = await user.save()

    res.status(200).json(userUpdate)
    } catch(error) {
        res.status(404).json(error.message)
    }
}

module.exports = {putUser}