'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Selang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Selang.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Selang.init({
    unit: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : "Unit is required"
        },
        notEmpty : {
          msg : "Unit is required"
        }
      }
    },
    component: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : "Component is required"
        },
        notEmpty : {
          msg : "Component is required"
        }
      }
    },
    pn: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : "PN is required"
        },
        notEmpty : {
          msg : "PN is required"
        }
      }
    },
    hmPenggantian: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notNull : {
          msg : "HM Penggantian is required"
        },
        notEmpty : {
          msg : "HM Penggantian is required"
        }
      }
    },
    tanggalPenggantian: {
      type : DataTypes.DATE,
      allowNull: false,
      validate : {
        notNull : {
          msg : "Tanggal Penggantian is required"
        },
        notEmpty : {
          msg : "HM Penggantian is required"
        }
      }
    },
    quantity: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notNull : {
          msg : "Quantity is required"
        },
        notEmpty : {
          msg : "Quantity is required"
        }
      }
    },
    lifetime: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notNull : {
          msg : "Lifetime is required"
        },
        notEmpty : {
          msg : "Lifetime is required"
        }
      }
    },
    target: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notNull : {
          msg : "Target is required"
        },
        notEmpty : {
          msg : "Target is required"
        }
      }
    },
    remark: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : "Remark is required"
        },
        notEmpty : {
          msg : "Remark is required"
        }
      }
    },
    status: {
      type : DataTypes.BOOLEAN,
    },
    userId: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notNull : {
          msg : "userId is required"
        },
        notEmpty : {
          msg : "userId is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Selang',
  });
  return Selang;
};