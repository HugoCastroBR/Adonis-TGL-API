'use strict'


const User = use('App/Models/User')


class UserController {
    async store ({ request }) {
        const data = request.only(['username','password','email'])
        const user = await User.create(data)
        return user
    }
    async update ({request,auth}) {
        const user = await User.findOrFail(auth.user.id)
        const data = request.only(['username','about','number','number2','twitter','facebook'])
        user.merge(data)
        await user.save()
        return user
    }

    async show ({ auth }) {
        let user = await User.query()
                        .where('id',auth.user.id)
                        .with('bets')
                        .fetch()
        return user
        
    }


    async destroy ({ auth }) {
        // Confirm email to delete
        if(auth.user.isAdmin){
            const user = await User.findOrFail(auth.user.id)
            await user.delete()
        }else{
            return response.status(401).send("Only admins can do that")
        }
        
    }

    
}

module.exports = UserController
