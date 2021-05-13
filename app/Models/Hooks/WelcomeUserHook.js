'use strict'

const WelcomeUserHook = exports = module.exports = {}

const Kue = use('Kue')
const Job = use ('App/Jobs/WelcomeUserMail')


WelcomeUserHook.sendWelcomeEmail = async (UserInstance) => {
    console.log("Ok")
    if (!UserInstance.id && !UserInstance.dirty.id){
        return
    }
    // const { email, username } = await UserInstance.fetch()
    const username = await UserInstance.username
    const email = await UserInstance.email
    

    Kue.dispatch(Job.key, { username,email },{ })

}
