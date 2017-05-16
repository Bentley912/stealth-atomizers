module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        
        message: {
            type: DataTypes.STRING
        },
        
    }, {
        
        classMethods: {
            associate: function(models) {
                
                Message.belongsTo(models.Job, {
                    foreignKey: {
                        allowNull: false
                    }
                });
                Message.belongsTo(models.Client, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Message;
};