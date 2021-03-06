'use strict'

const Antl = use('Antl')

class Bet {
  get validateAll () {
    return true 
  }
  get rules () {
    return {
      bets: "required|array",
      'bets.numbers':"required",
      'bets.game_id': "required"
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Bet
