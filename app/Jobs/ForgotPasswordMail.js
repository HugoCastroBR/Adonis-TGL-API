'use strict'

const Mail = use('Mail')


class ForgotPasswordMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'ForgotPasswordMail-job'
  }

  // This is where the work is done.
  async handle ({email, user}) {

    await Mail.send(
      ['emails.forgot_password'],
      { email, token: user.token, link: `http://localhost:3000/update-password/${user.token}` },
      message => {
          message
              .to(user.email)
              .from('hugoecastro2008@hotmail.com', 'Hugo')
              .subject('Recuperação de senha')
      }
    )

  }

}

module.exports = ForgotPasswordMail

