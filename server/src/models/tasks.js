const {DataTypes , UUIDV4} = require('sequelize')


module.exports = (sequelize) => {
    sequelize.define('Tasks', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4 // algoritmo que me genera UUid
      },
      title:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      }

},
    {timestamps:false}
    );
  };