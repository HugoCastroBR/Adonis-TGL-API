'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with games
 */

const Game = use('App/Models/Game')

class GameController {

  async index ({ request, response, view }) {
    const games = await  Game.query().fetch()
    return games
  }
  
  async store ({ request, response,auth }) {
    const data = request.only([
      'type',
      'description',
      'range',
      'price',
      'max-number',
      'color',
      'min-cart-value',
    ])
    if(auth.user.isAdmin){
        const CreateGame = await Game.create({...data})
        return CreateGame
    }
    else{
      return response.status(401).send("Only admins can do that")
    }
  }

  async show ({ params, request, response, view }) {
    const game = await Game.findOrFail(params.id)
    return game
  }

  async update ({ params, request, response,auth }) {
    if(auth.user.isAdmin){
      const game = await Game.findOrFail(params.id)
      const data = request.only([
        'type',
        'description',
        'range',
        'price',
        'max-number',
        'color',
        'min-cart-value',
      ])
      game.merge(data)
      await game.save()
      return game
    }else{
      return response.status(401).send("Only admins can do that")
    }
    
  }

  async destroy ({ params, request, response,auth }) {
    if(auth.user.isAdmin){
      const game = await Game.findOrFail(params.id)
      await game.delete()
      return response.status(200).send("Game deleted")
    }else{
      return response.status(401).send("Only admins can do that")
    }
    
  }
}

module.exports = GameController
