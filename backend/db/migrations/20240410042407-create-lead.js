"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Leads",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				setterId: {
					type: Sequelize.INTEGER,
					allowNull: true,
				},
				closerId: {
					type: Sequelize.INTEGER,
					allowNull: true,
				},
				name: {
					type: Sequelize.STRING(60),
					allowNull: false,
				},
				address: {
					type: Sequelize.STRING(255),
					allowNull: true,
				},
				zipCode: {
					type: Sequelize.STRING(5),
					allowNull: false,
				},
				phoneNumber: {
					type: Sequelize.STRING(11),
					allowNull: false,
				},
				email: {
					type: Sequelize.STRING(100),
					allowNull: true,
				},
				notes: {
					type: Sequelize.STRING(1000),
					allowNull: false,
				},
				disposition: {
					type: Sequelize.ENUM(
						"Transferred - Closer",
						"Sold",
						"Not Interested",
						"One Time Wasp",
						"Scheduled Callback",
						"Unqualified"
					),
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
		options.tableName = "Leads";
		await queryInterface.dropTable(options);
	},
};
