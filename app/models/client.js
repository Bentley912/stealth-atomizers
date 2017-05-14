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
    }, {
        // We're saying that we want our Author to have Posts
        classMethods: {
            associate: function(models) {
                // Associating Author with Posts
                // When an Author is deleted, also delete any associated Posts
                Client.hasMany(models.Job, {
                    onDelete: "cascade"
                });
            }
        }
    }, {
        // We're saying that we want our Author to have Posts
        classMethods: {
            associate: function(models) {
                // Associating Author with Posts
                // When an Author is deleted, also delete any associated Posts
                Client.hasMany(models.Rating, {
                    onDelete: "cascade"
                });
            }
        }
    }, {
        // We're saying that we want our Author to have Posts
        classMethods: {
            associate: function(models) {
                // Associating Author with Posts
                // When an Author is deleted, also delete any associated Posts
                Client.hasMany(models.Message, {
                    onDelete: "cascade"
                });
            }
        }
    }, {
        // We're saying that we want our Author to have Posts
        classMethods: {
            associate: function(models) {
                // Associating Author with Posts
                // When an Author is deleted, also delete any associated Posts
                Client.hasMany(models.JobCategorie, {
                    onDelete: "cascade"
                });
            }
        }
    });
    return Client;
};