'use strict'

const { route } = require("@adonisjs/framework/src/Route/Manager")


const Route = use('Route')

Route.post('register','UserController.store').validator('User')

Route.post('auth','SessionController.store').validator('Session')

Route.post('reset-password','PasswordController.store').validator('ForgotPassword')
Route.put('reset-password/:token','PasswordController.update').validator('ResetPassword')


Route.group(() => {

  Route.get('/user-bets/:id','BetController.getUserBets')

  Route.delete('user','UserController.destroy')
  Route.get('user','UserController.show')
  Route.put('/update-user',"UserController.update")

  Route.resource('/games','GameController').apiOnly()
  .validator(new Map(
    [
      [
        ['games.store'],
        ['Game']
      ]
    ]
  ))
  Route.resource('/bets','BetController').apiOnly()
  .validator(new Map(
    [
      [
        ['bets.store'],
        ['Bet']
      ]
    ]
  ))

}).middleware(['auth'])