require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');


const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
   //DB_DEPLOY,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Review , Movie, Shop , User, FavoriteMovie , Genre } = sequelize.models;

Shop.belongsToMany(Movie, {through: "moviesShops"});
Movie.belongsToMany(Shop, {through: "moviesShops"});

User.hasMany(Shop);
Shop.belongsTo(User)

User.hasMany(Review, {foreignKey: "userId"});
Movie.hasMany(Review, {foreignKey: "movieId"});
Review.belongsTo(Movie, {foreignKey: "movieId"});
Review.belongsTo(User, {foreignKey: "userId"});


User.hasMany(FavoriteMovie, {foreignKey: 'userId'});
FavoriteMovie.belongsTo(Movie, {foreignKey: 'movieId'});

Movie.hasMany(FavoriteMovie, {foreignKey: 'movieId'});

Movie.belongsToMany(Genre, {through: 'movieGenre'});
Genre.belongsToMany(Movie, {through: 'movieGenre'});



module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
