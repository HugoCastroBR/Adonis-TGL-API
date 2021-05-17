
const Bet = use("App/Models/Bet");
const Game = use("App/Models/Game");
const Kue = use('Kue')
const Job = use ('App/Jobs/NewBetMail')


class BetServices {
    static async hasDuplicates(arr){
        return (new Set(arr)).size !== arr.length;
    }
    
    static async getAboutGameType(game_id){
        const game = await Game.findOrFail(game_id)
        return game
    }

    static async sendNewBetEmail( {email, username} ){
        Kue.dispatch(Job.key, { email,username },{ })
    }
}

module.exports = BetServices;

