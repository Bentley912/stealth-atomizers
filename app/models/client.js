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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20]
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        address: {
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
        },
        img_file: {
            type: DataTypes.STRING
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