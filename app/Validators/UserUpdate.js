'use strict'

const Antl = use('Antl')

const Validator = use('Validator')






class UserUpdate {

  get validateAll () {
    return true 
  }

  get rules () {
    const ctx = this.ctx
    const userId = ctx.auth.user.id


    return {
      username: `unique:users,username,id,${userId}`,
      email: `email|unique:users,email,id,${userId}`,
      about: `unique:users,username,id,${userId}`,
      phone_number: `unique:users,username,id,${userId}`,
      password: `confirmed`
    }
  } 

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UserUpdate
  