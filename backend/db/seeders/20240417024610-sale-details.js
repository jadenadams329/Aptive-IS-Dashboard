"use strict";
/** @type {import('sequelize-cli').Migration} */

const { Sale_Details } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		(options.tableName = "Sale_Details"), (options.validate = true);
		await Sale_Details.bulkCreate(
			[
				{
					leadId: 1,
					accountNumber: "3170152",
					agreementLength: 24,
					planType: "Premium",
					initialPrice: 149,
					recurringPrice: 149,
					autopay: true,
					ach: false,
					initialDate: "04/18/2025",
					serviced: "Pending",
				},
				{
					leadId: 2,
					accountNumber: "3170153",
					agreementLength: 12,
					planType: "Pro",
					initialPrice: 99,
					recurringPrice: 129,
					autopay: true,
					ach: true,
					initialDate: "04/17/2024",
					serviced: "Yes",
				},
				{
					leadId: 3,
					accountNumber: "3170154",
					agreementLength: 24,
					planType: "Basic",
					initialPrice: 149,
					recurringPrice: 109,
					autopay: false,
					ach: false,
					initialDate: "04/11/2024",
					serviced: "No",
				},
			],
			options
		);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		options.tableName = "Sale_Details";
		return queryInterface.bulkDelete(options, {
			leadId: { [Op.in]: [1, 2, 3] },
		});
	},
};
