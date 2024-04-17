"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Sale_Details",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				leadId: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				accountNumber: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				agreementLength: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				planType: {
					type: Sequelize.ENUM("Basic", "Pro", "Premium"),
					allowNull: false,
				},
				initialPrice: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				recurringPrice: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				autopay: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
				},
				ach: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
				},
				initialDate: {
					type: Sequelize.DATE,
					allowNull: false,
				},
				serviced: {
					type: Sequelize.ENUM("Yes", "No", "Pending"),
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "Sale_Details";
		await queryInterface.dropTable(options);
	},
};
