'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn( "users", "test", {
        type : Sequelize.TEXT
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'test');
  }
};