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
            notNull: true
        },
        name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        contact: {
            type: DataTypes.STRING
        }
    });
    return Client;
};