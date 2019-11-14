'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn( "images", "w", {
        type : Sequelize.DOUBLE,
        allowNull : false,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('images', 'w');
  }
};