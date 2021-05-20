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
      username: `unique:users,username,id,${userId}|min:4|max:30`,
      email: `email|unique:users,email,id,${userId}`,
      about: `unique:users,username,id,${userId}`,
      phone_number: `unique:users,username,id,${userId}|min:8 |max:12`,
      password: `confirmed|min:6|max:20`
    }
  } 

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UserUpdate
  