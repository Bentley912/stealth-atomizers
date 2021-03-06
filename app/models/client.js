module.exports = function(sequelize, DataTypes) {
    var Client = sequelize.define("Client", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 25],
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        info: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        zip: {
            type: DataTypes.STRING
        },
        contact: {
            type: DataTypes.STRING
        },
        isContractor: {
            type: DataTypes.BOOLEAN
        }
    }, {

        classMethods: {
            associate: function(models) {


                Client.hasMany(models.Job, {
                    onDelete: "cascade"
                });
            }
        }
    }, {

        classMethods: {
            associate: function(models) {


                Client.hasMany(models.Rating, {
                    onDelete: "cascade"
                });
                Client.hasMany(models.Message, {
                    onDelete: "cascade"
                });
                Client.hasMany(models.Bid, {
                    onDelete: "cascade"
                });
            }
        }
    });
    return Client;
};