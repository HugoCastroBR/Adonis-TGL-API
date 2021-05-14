'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with bets
 */

const Bet = use('App/Models/Bet')
const Game = use('App/Models/Game')

class BetController {
  
  async index ({ request, response, view }) {
    const bets = await Bet.query().with('game').fetch()
    return bets
  }


  async store ({ request, response, auth }) {
    let data = request.only([
      'bets',
    ])

    const getAboutGameType = async (game_id) => {
      const game = await Game.findOrFail(game_id)
      return game
    }

    let isError = false
    let error;

    const hasDuplicates = arr => {
      return (new Set(arr)).size !== arr.length;
    }


    data = data.bets.map(e => {return { ...e, user_id: auth.user.id }}) 
    data = await Promise.all(data.map(async (e) => {


      const GameTypeInfos = await getAboutGameType(e.game_id)
      const numbersArr = e.numbers.split(',').map(e => Number(e))
      const maxNumber = numbersArr.reduce((a, b)  => Math.max(a, b));
      const minNumber = numbersArr.reduce((a, b)  => Math.min(a, b));

      if(maxNumber > GameTypeInfos.range){
        error = response.status(406).send(`The biggest number acceptable is ${GameTypeInfos.range}`)
        isError = true
      }
      
      if(minNumber <= 0 ){
        error = response.status(406).send(`The smallest number acceptable is 1`)
        isError = true
      }

      if(numbersArr.length !== GameTypeInfos['max-number']){
        error = response.status(406).send(`The min and max count of number of this type is ${GameTypeInfos['max-number']}`)
        isError = true
      }
      if(hasDuplicates(numbersArr)){
        error = response.status(406).send(`Don't send duplicates numbers`)
        isError = true
      }
      
      const Item = {...e, price:Number(GameTypeInfos.price)}
      return Item
    })) 

    // const SaveBet = await Bet.createMany({...data,user_id: auth.user.id})
    if(!isError){
      const SaveBet = await Bet.createMany([...data])
      return SaveBet
    }
    
    return error
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
