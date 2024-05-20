//const { Pool } = require('pg')
const {Sequelize} = require('sequelize')
const fs = require('fs');
const {pg} = require('pg')
const path = require('path');

const sequelize = new Sequelize(`postgresql://postgres:.37273194@localhost:5432/tasks`,{
    logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectModule: pg,
})

async function verify () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 
}
verify();

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname,'/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file)=>{
    modelDefiners.push(require(path.join(__dirname,'/models',file)));
  });

modelDefiners.forEach(model => model(sequelize))


let entries = Object.entries(sequelize.models)
//console.log("entries",entries)
let capsEntries = entries.map((entry)=> [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]])
//console.log("cpas",capsEntries)

sequelize.models = Object.fromEntries(capsEntries)

const { Tasks , Users} = sequelize.models

//relaciones

module.exports = {
  ...sequelize.models,
  conn: sequelize
}