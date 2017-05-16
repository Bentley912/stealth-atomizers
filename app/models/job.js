module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("Job", {
            
            name: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            category: {
                type: DataTypes.STRING
            },
            taken: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            complete: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            categorie: {
                type: DataTypes.STRING
            }
        },
        
        
        {
            
            classMethods: {
                associate: function(models) {
                    
                    Job.belongsTo(models.Client, {
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            }
        }
    );
    return Job;
};