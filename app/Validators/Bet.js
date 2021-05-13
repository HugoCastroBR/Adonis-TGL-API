'use strict'

const Antl = use('Antl')

class Bet {
  get validateAll () {
    return true 
  }
  get rules () {
    return {
      bets: "required"
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Bet
