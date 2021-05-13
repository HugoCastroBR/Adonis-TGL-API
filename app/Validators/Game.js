'use strict'

const Antl = use('Antl')

class Game {
  get validateAll () {
    return true 
  }

  get rules () {
    return {
      type: 'required|unique:games',
      description:'required',
      range:'required',
      price:'required',
      'max-Number':'required',
      color:'required',
      'min-cart-value':'',
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Game
