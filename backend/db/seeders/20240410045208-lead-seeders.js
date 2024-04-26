"use strict";
/** @type {import('sequelize-cli').Migration} */

const { Lead } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = "Leads";
		options.validate = true;
		await Lead.bulkCreate(
			[
				{
					setterId: 3,
					closerId: 2,
					name: "Jaden Adams",
					address: "123 Fake St",
					zipCode: "92084",
					phoneNumber: "6196267403",
					email: "",
					notes: "Ants, Spiders",
					disposition: "Sold",
				},
				{
					setterId: 3,
					closerId: 2,
					name: "Eric",
					address: "123 Fake St",
					zipCode: "92084",
					phoneNumber: "6196267403",
					email: "",
					notes: "Ants, Spiders",
					disposition: "Sold",
				},
				{
					setterId: 3,
					closerId: 2,
					name: "John Bee",
					address: "132 Fake St",
					zipCode: "92081",
					phoneNumber: "6196267404",
					email: "",
					notes: "Ants, Spiders",
					disposition: "Sold",
				},
			],
			options
		);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		options.tableName = "Leads";
		return queryInterface.bulkDelete(options, {
			setterId: { [Op.in]: [3] },
		});
	},
};
