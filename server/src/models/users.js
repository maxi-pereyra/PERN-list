const {DataTypes , UUIDV4} = require('sequelize')


module.exports = (sequelize) => {
    sequelize.define('Users', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4 // algoritmo que me genera UUid
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }

},
    {timestamps:false}
    );
  };