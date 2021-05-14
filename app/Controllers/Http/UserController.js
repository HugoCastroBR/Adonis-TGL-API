'use strict'


const User = use('App/Models/User')


class UserController {
    async index({ request, auth }) {
        if(auth.user.isAdmin){
            const Users = await User.query().with('bets').fetch()
            return Users
        }else{
            return response.status(401).send("Only admins can do that")
        }
    }
    async store ({ request,response }) {
        const data = request.only(['username','password','email'])
        if(data.password.length <= 5 || data.password.length > 14){
            return response.status(406).send("The password needs to be 6 up to 14 characters")
        }
        if(data.username.length <= 3 || data.username.length > 30){
            return response.status(406).send("The username needs to be 4 up to 30 characters")
        }
        const user = await User.create(data)
        return user
    }
    async update ({request,auth,response}) {
        const user = await User.findOrFail(auth.user.id)
        const data = request.only(['username','about','phone_number'])
        if(data['phone_number']?.length > 0){
            if(data['phone_number'].length <= 7 || data['phone_number'].length > 12){
                return response.status(406).send("The phone number needs to be 8 to 12 characters")
            }
        }
        if(data?.username?.length <= 3 || data?.username?.length > 30){
            return response.status(406).send("The username needs to be 4 up to 30 characters")
        }
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
    async destroy ({ auth, response }) {
        if(auth.user.isAdmin){
            const user = await User.findOrFail(auth.user.id)
            await user.delete()
        }else{
            return response.status(401).send("Only admins can do that")
        }
        
    }
    
}

module.exports = UserController
