"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Sale_Details extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Sale_Details.belongsTo(models.Lead, {
				foreignKey: "leadId",
			});
		}

		static async getAllSales() {
			const soldLeads = await Sale_Details.findAll({
				include: [
					{
						model: sequelize.models.Lead,
						attributes: ["setterId", "closerId"],
						where: { id: sequelize.col("Sale_Details.leadId") },
						include: [
							{
								model: sequelize.models.User,
								as: "Setter",
								attributes: ["firstName", "lastName"],
								// where: { id: sequelize.col("Lead.setterId") },
							},
							{
								model: sequelize.models.User,
								as: "Closer",
								attributes: ["firstName", "lastName"],
								// where: { id: sequelize.col("Lead.closerId") },
								required: false,
							},
						],
					},
				],
			});

			return soldLeads;
		}
	}
	Sale_Details.init(
		{
			leadId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			accountNumber: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			agreementLength: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			planType: {
				type: DataTypes.ENUM("Basic", "Pro", "Premium"),
				allowNull: false,
			},
			initialPrice: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			recurringPrice: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			autopay: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			ach: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			initialDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			serviced: {
				type: DataTypes.ENUM("Yes", "No", "Pending"),

			},
		},
		{
			sequelize,
			modelName: "Sale_Details",
		}
	);
	return Sale_Details;
};
