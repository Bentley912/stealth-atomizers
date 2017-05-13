module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define("Job", {
    // Giving the Author model a name of type STRING
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    file: {
      type: DataTypes.STRING
    },
    taken: {
      type: DataTypes.BOOLEAN
    },
    complete: {
      type: DataTypes.BOOLEAN
    }
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          Job.belongsTo(models.Client, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          Job.belongsTo(models.Contractor, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          Job.hasMany(models.Message, {
            onDelete: "cascade"
          });
        }
      }
    },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          Job.hasMany(models.JobCategorie, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Job;
};
