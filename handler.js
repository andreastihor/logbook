
const lineService = require('./lineService')


  function handleEvent (event) {
    if (event.message.text == "test") {
      return lineService.testing(event)
    }
    if (event.message.text == "addUser") {
      return lineService.addUser(event)
    }
    if (event.message.text.split(',')[0] == "adduser") {
      return lineService.insertUser(event)
    }
    if (event.message.text == "/help") {
      return lineService.help(event)
    }
    if (event.message.text == "check admin") {
      return lineService.checkUsers(event)
    }

    if (event.message.text == "change password") {
      return lineService.changePassword(event)
    }
    if (event.message.text.split(',')[0] == "password") {
      return lineService.updatePassword(event)
    }
    if(event.message.text == "adduser --admin") {
      return lineService.addId(event)
    }
    if(event.message.text == "--admin") {
      return lineService.admin(event)
    }
    return lineService.notFound(event)
  }

  function handleAddUser(event) {

  }







module.exports = handleEvent
