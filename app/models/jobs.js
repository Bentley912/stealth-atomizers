console.log("Jobs PASS");
module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("Job", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 55]
            }
        },
        description: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Job.belongsTo(models.Client);
            }
        }
    });
    return Job;
};