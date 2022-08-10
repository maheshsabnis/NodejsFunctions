const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Employee', {
    EmpNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    EmpName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Designation: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DeptNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Department',
        key: 'DeptNo'
      }
    }
  }, {
    sequelize,
    tableName: 'Employee',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Employee__AF2D66D3EB3B45E4",
        unique: true,
        fields: [
          { name: "EmpNo" },
        ]
      },
    ]
  });
};
