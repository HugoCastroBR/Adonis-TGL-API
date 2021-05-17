'use strict'

const Antl = use('Antl')

class UserUpdate {

  

  get validateAll () {
    return true 
  }

  get rules () {
    const ctx = this.ctx
    // console.log(ctx.auth.user)
    console.log(ctx.request.body)
    return {
      username: 'unique:users',
      email: 'email|unique:users',
      password: 'confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UserUpdate
