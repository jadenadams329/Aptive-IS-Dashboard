"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Goal extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Goal.belongsTo(models.User, {
				foreignKey: "userId",
			});
		}

		static async getUserGoals(userId) {
			const userGoals = await Goal.findAll({
				where: {
					userId: userId,
				},
			});

			console.log(userGoals, "akljsdfja;slkfj;alskjf;laskjdf;lajsd;flkja;sldjkf;laskjdfl;kjasd;lfkj")

			return userGoals;
		}
	}
	Goal.init(
		{
			userId: DataTypes.INTEGER,
			name: DataTypes.STRING,
			value: DataTypes.FLOAT,
			type: DataTypes.ENUM("Close Rate", "ACV", "Autopay", "ACH", "Multi-Year"),
			targetDate: DataTypes.DATE,
			status: DataTypes.ENUM("Not Started", "In Progress", "Completed"),
		},
		{
			sequelize,
			modelName: "Goal",
		}
	);
	return Goal;
};
