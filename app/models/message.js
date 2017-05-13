module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
        // Giving the Author model a name of type STRING
        message: {
            type: DataTypes.STRING
        },
        // Here we'll pass a second "classMethods" object into the define method
        // This is for any additional configuration we want to give our models
    }, {
        // We're saying that we want our Author to have Posts
        classMethods: {
            associate: function(models) {
                // An Author (foreignKey) is required or a Post can't be made
                Message.belongsTo(models.Job, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    }, {
        // We're saying that we want our Author to have Posts
        classMethods: {
            associate: function(models) {
                // An Author (foreignKey) is required or a Post can't be made
                Message.belongsTo(models.Client, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    }, {
        // We're saying that we want our Author to have Posts
        classMethods: {
            associate: function(models) {
                // An Author (foreignKey) is required or a Post can't be made
                Message.belongsTo(models.Contractor, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Message;
};