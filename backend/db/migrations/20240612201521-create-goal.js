"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Goals", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			value: {
				type: Sequelize.FLOAT,
			},
			type: {
				type: Sequelize.ENUM("Close Rate", "ACV", "Autopay", "ACH", "Multi-Year"),
			},
			targetDate: {
				type: Sequelize.DATE,
			},
			status: {
				type: Sequelize.ENUM("Not Started", "In Progress", "Completed"),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
			},
		}, options);
	},
	async down(queryInterface, Sequelize) {
    options.tableName = "Goals";
		await queryInterface.dropTable(options);
	},
};
