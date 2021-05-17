'use strict'

const Mail = use('Mail')


class NewBetMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 2
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewBetMail-job'
  }

  // This is where the work is done.
  async handle ({ email,username }) {
    console.log("Job executando")
    await Mail.send(['emails.new_bet'],
    {
        username
    },
    message => {
        message.to(email)
        .from("TGL@TGL.com","hugo")
        .subject("New Bet")
    }
    )
  }
}

module.exports = NewBetMail

