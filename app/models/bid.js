module.exports = function(sequelize, DataTypes) {
    var Bid = sequelize.define("Bid", {
        
        bid: {
            type: DataTypes.FLOAT
        },
        
    }, {
        
        classMethods: {
            associate: function(models) {
                
                Bid.belongsTo(models.Job, {
                    foreignKey: {
                        allowNull: false
                    }
                });
                Bid.belongsTo(models.Client, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Bid;
};