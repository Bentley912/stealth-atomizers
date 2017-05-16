module.exports = function(sequelize, DataTypes) {
  var Rating = sequelize.define("Rating", {
    // 
    rating: {
      type: DataTypes.INTEGER
    },
    comment : {
      type: DataTypes.STRING
    },
    //
    },
    {
      //
      classMethods: {
        associate: function(models) {
          //
          Rating.belongsTo(models.Client, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Rating;
};
