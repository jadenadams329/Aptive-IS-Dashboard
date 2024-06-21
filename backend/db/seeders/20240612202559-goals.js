'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Goal } = require("../models")

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    (options.tableName = "Goals"), (options.validate = true);
    await Goal.bulkCreate(
      [
        {
          userId: 2,
          name: "ACV",
          value: 850,
          type: "ACV",
          targetDate: "06/30/2024",
          status: "In Progress"
        },
        {
          userId: 2,
          name: "Multi-Year",
          value: 70,
          type: "Multi-Year",
          targetDate: "06/30/2024",
          status: "In Progress"
        }
      ], options)
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    options.tableName = "Goals"
    return queryInterface.bulkDelete(options, {
      userId: {[Op.in]: [2]}
    })
  }
};
