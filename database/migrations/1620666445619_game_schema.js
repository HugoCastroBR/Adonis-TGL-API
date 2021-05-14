'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.increments()
      table.string('type').notNullable().unique()
      table.text('description').notNullable()
      table.integer('range').notNullable()
      table.decimal('price',6,2).notNullable()
      table.integer('max-number').notNullable()
      table.string('color').notNullable()
      table.integer('min-cart-value').defaultTo(30)
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GameSchema
