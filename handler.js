
const lineService = require('./lineService')


  function handleEvent (event) {
    if ((event.message.text).toLowerCase() == "add user") {
      return lineService.addUser(event)
    }
    if ((event.message.text).toLowerCase().split(',')[0] == "adduser") {
      return lineService.insertUser(event)
    }
    if ((event.message.text).toLowerCase() == "/help") {
      return lineService.help(event)
    }
    if ((event.message.text).toLowerCase() == "check user") {
      return lineService.checkUsers(event)
    }
    if ((event.message.text).toLowerCase() == "change password") {
      return lineService.changePassword(event)
    }
    if ((event.message.text).toLowerCase().split(',')[0] == "password") {
      return lineService.updatePassword(event)
    }
    if((event.message.text).toLowerCase().split(',')[0] == "addid") {
      return lineService.addId(event)
    }
    if((event.message.text).toLowerCase() == "admin") {
      return lineService.admin(event)
    }
    if((event.message.text).toLowerCase().split(',')[0] == "deleteuser" ) {
      return lineService.deleteUser(event)
    }
    if((event.message.text).toLowerCase() == "get id" ) {
      return lineService.getId(event)
    }
    if((event.message.text).toLowerCase() == "check user id" ) {
      return lineService.checkIds(event)
    }
    return lineService.notFound(event)
  }


module.exports = handleEvent
