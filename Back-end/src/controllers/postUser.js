// http://localhost:3001/Nonflix/login
const bcrypt = require("bcryptjs");
const { User } = require("../db");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const { sendEmailNotification } = require("../utils/sendEmailNotification");
const { messageHtml } = require("../utils/htmlEmailNotification");

const postUser = async (req, res) => {
  try {

    const profileImages = [
      'https://res.cloudinary.com/dy8pp1s5f/image/upload/v1696821514/Nonfilx_admins/ohgpvljyko1g0uv5g0cb.png',
      'https://res.cloudinary.com/dy8pp1s5f/image/upload/v1696821514/Nonfilx_admins/twsoycbwls7vit0zvbff.png',
      'https://res.cloudinary.com/dy8pp1s5f/image/upload/v1696821513/Nonfilx_admins/egoounn8npw2atmv1kiu.png',
      'https://res.cloudinary.com/dy8pp1s5f/image/upload/v1696821513/Nonfilx_admins/whypbm5xyjpvevkdfec6.png',
      'https://res.cloudinary.com/dy8pp1s5f/image/upload/v1696821513/Nonfilx_admins/dhb7y05lwbz1envn1qwm.png'
    ]

    const { email, password, name, provider, admin } = req.body;

    let image = req.body.image; 

    if (!image) {
      function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * profileImages.length);
        return profileImages[randomIndex];
      }
      image = getRandomImage();
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    if (!email || !hashedPassword || !name) {
      throw new Error("Insufficient parameters");
    }

    const userAlreadyExists = await User.findOne({ where: { email: email } });

    if (userAlreadyExists) {
      throw new Error("Existing user");
    } else {
      const user = await User.create({
        email,
        password: hashedPassword,
        name,
        provider: provider ? provider : "local",
        image: image,
        admin: admin ? admin : false,
        active: true
      });

      const subject = "Nonflix Registration";
      await sendEmailNotification(email, subject, messageHtml(name));

      const { id } = user.dataValues;
      const token = jwt.sign({ id }, JWT_SECRET);

      if (token) {
        res
          .status(200)
          .json({ id: user.id, name: user.name, email: user.email, image: image, admin: user.admin, active: user.active, provider: user.provider ,token });
      }
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { postUser };
