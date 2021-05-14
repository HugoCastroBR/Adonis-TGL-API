'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BetSchema extends Schema {
  up () {
    this.create('bets', (table) => {
      table.increments()
      table.string('numbers').notNullable()
      table.decimal('price',8,2).notNullable()
      table.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
      table.integer('game_id')
            .references('id')
            .inTable('games')
            .onUpdate('CASCADE')
            .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('bets')
  }
}

module.exports = BetSchema
