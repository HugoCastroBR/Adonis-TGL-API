'use strict'

const Antl = use('Antl')


class UserDelete {

  get validateAll () {
    return true 
  }

  get rules () {
    return {
      id: "required"
    }
  }

  get messages () {
    return Antl.list('validation')
  }

}

module.exports = UserDelete
