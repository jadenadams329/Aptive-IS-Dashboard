"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.Lead, {foreignKey: "setterId"})
			User.hasMany(models.Lead, {foreignKey: "closerId"})
			User.hasMany(models.Goal, {foreignKey: "userId"})
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: true,
				unique: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [3, 256],
					isEmail: true,
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 30]
				}
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 30]
				}
			},
			role: {
				type: DataTypes.ENUM('manager', 'closer', 'setter'),
				allowNull: false
			},
		},
		{
			sequelize,
			modelName: "User",
			defaultScope: {
				attributes: {
					exclude: ["hashedPassword", "createdAt", "updatedAt"]
				}
			}
		}
	);
	return User;
};
