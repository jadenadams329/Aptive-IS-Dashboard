"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Lead extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Lead.belongsTo(models.User, {
				foreignKey: "setterId",
				as: "Setter",
			});
			Lead.belongsTo(models.User, {
				foreignKey: "closerId",
				as: "Closer",
			});
			Lead.hasMany(models.Sale_Details, {
				foreignKey: "leadId",
			});
		}

		static async getAllLeads() {
			const leads = await Lead.findAll({
				include: [
					{
						model: sequelize.models.User,
						as: "Setter",
						attributes: ["firstName", "lastName"],
						where: { id: sequelize.col("Lead.setterId") },
					},
					{
						model: sequelize.models.User,
						as: "Closer",
						attributes: ["firstName", "lastName"],
						where: { id: sequelize.col("Lead.closerId") },
						required: false,
					},
				],
			});
			return leads;
		}

		static async getLeadById(leadId) {
			const lead = await Lead.findByPk(leadId, {
				include: [
					{
						model: sequelize.models.User,
						as: "Setter",
						attributes: ["firstName", "lastName"],
						where: { id: sequelize.col("Lead.setterId") },
						required: false,
					},
					{
						model: sequelize.models.User,
						as: "Closer",
						attributes: ["firstName", "lastName"],
						where: { id: sequelize.col("Lead.closerId") },
						required: false,
					},
				],
			});
			return lead;
		}
	}

	Lead.init(
		{
			setterId: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			closerId: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			zipCode: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			notes: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			disposition: {
				type: DataTypes.ENUM(
					"Transferred - Closer",
					"Sold",
					"Not Interested",
					"One Time Wasp",
					"Scheduled Callback",
					"Unqualified"
				),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Lead",
		}
	);
	return Lead;
};
