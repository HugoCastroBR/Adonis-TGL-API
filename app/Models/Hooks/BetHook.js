'use strict'


const Kue = use('Kue')
const Job = use ('App/Jobs/NewBetMail')


const BetHook = exports = module.exports = {}

BetHook.sendNewBetEmail = async (BetInstance) => {
    if (!BetInstance.user_id && !BetInstance.dirty.user_id){
        console.log("deu ruim")
        return
    }
    const { email, username} = await BetInstance.user().fetch()
    const { type }  = await BetInstance.game().fetch()
    console.log(type)
    
    Kue.dispatch(Job.key, { email,username,type },{ })
}
