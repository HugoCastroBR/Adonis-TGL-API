'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with bets
 */

const Bet = use('App/Models/Bet')

class BetController {
  
  async index ({ request, response, view }) {
    const bets = await Bet.query().with('game').fetch()
    return bets
  }


  async store ({ request, response, auth }) {
    let data = request.only([
      'bets',
    ])
    data = data.bets.map(e => {return {...e, user_id: auth.user.id}}) 
    // const SaveBet = await Bet.createMany({...data,user_id: auth.user.id})
    const SaveBet = await Bet.createMany([...data])
    return SaveBet
  }

  
  async show ({ params }) {
    const bet = await Bet.findOrFail(params.id)
    await bet.load('game')
    return bet
    
  }

  async update ({ params, request, response }) {
    const bet = await Bet.findOrFail(params.id)
    if(auth.user.isAdmin){
      const data = request.only([
        'numbers',
        'game_id',
      ])
      bet.merge(data)
      await bet.save()
      return bet
    }else{
      return response.status(401).send("Only admins can do that")
    }
    
  }

  
  async destroy ({ params, request, response }) {
    if(auth.user.isAdmin){
      const bet = await Bet.findOrFail(params.id)
      await bet.delete()
    }else{
      return response.status(401).send("Only admins can do that")
    }
    
  }


  async getUserBets ({request,params, auth}) {
    let data = request.only([
      'game_id',
    ])
    const GameId = data['game_id']
    if(GameId <= 0){
      const bets = await Bet.query()
                        .where("user_id",auth.user.id)
                        .orderBy('game_id','asc')
                        .orderBy('id','asc')
                        .paginate(params.id,10)
      return bets

    }else{
      const bets = await Bet.query()
                        .where("user_id",auth.user.id)
                        .where("game_id",GameId)
                        .orderBy('game_id','asc')
                        .orderBy('id','asc')
                        .paginate(params.id,10)
      return bets
    }
    
    
  }

  
}

module.exports = BetController
