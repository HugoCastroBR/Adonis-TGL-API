'use strict'

const Model = use('Model')

class Bet extends Model {

    static boot () {
        super.boot()
        this.addHook('afterCreate','BetHook.sendNewBetEmail')
        this.addHook('beforeUpdate','BetHook.sendNewBetEmail')
        
    }

    user () {
        return this.belongsTo('App/Models/User')
    }

    game () {
        return this.belongsTo('App/Models/Game')
    }

}

module.exports = Bet
