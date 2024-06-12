const {DataTypes , UUIDV4} = require('sequelize')


module.exports = (sequelize) => {
    sequelize.define('Products', {
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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      categories:{
        type: DataTypes.ENUM,
        values:["limpieza","higiene","alimentos"]
      },
      visibility: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
},
    {timestamps:false}
    );
  };