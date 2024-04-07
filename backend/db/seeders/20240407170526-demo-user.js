'use strict';
/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'manager@goaptive.com',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Manager',
        lastName: 'Aptive',
        role: 'manager'
      },
      {
        email: 'closer@goaptive.com',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Closer',
        lastName: 'Aptive',
        role: 'closer'
      },
      {
        email: 'setter@goaptive.com',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Setter',
        lastName: 'Aptive',
        role: 'setter'
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      firstName: { [Op.in]: ['Manager', 'Closer', 'Setter'] }
    }, {});
  }
};
