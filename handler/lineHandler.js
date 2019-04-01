const lineController = require('../controller/lineController')


  function handleEvent (event) {
    if ((event.message.text).toLowerCase() == "/insert user") {
      return lineController.addUserGet(event)
    }

    if ((event.message.text).toLowerCase().split(',')[0] == "insert" || (event.message.text).toLowerCase().split(',')[0] == "update" ) {
      const data = event.message.text.split(',')
      if ( data.length < 3 || data[1] == "" || data[2] == "") {
        return lineController.inComplete(event,"Please fill username or password")
      }
      return lineController.addUserPost(event,data[1],data[2])
    }

    if ((event.message.text).toLowerCase() == "/check user") {
      return lineController.checkUsers(event)
    }

    if ((event.message.text).toLowerCase() == "/change password") {
      return lineController.changePasswordGet(event)
    }

    if ((event.message.text).toLowerCase().split(',')[0] == "password") {
      const password = event.message.text.split(',')[1]
      if (password == undefined ||password == "") {
        return lineController.inComplete(event,`Please FIll Password!`)
      }
      return lineController.changePasswordPost(event,password)
    }

    if ((event.message.text).toLowerCase() == "/update user") {
      return lineController.updateUserGet(event)
    }

    if ((event.message.text).toLowerCase() == "/delete user") {
      return lineController.deleteUserGet(event)
    }

    if ((event.message.text).toLowerCase().split(',')[0] =="delete") {
      const id = event.message.text.split(',')[1]
      if (id == undefined || id == "") {
        return lineController.inComplete(event,`Please fill in id!`)
      }
      return lineController.deleteUserPost(event,id)
    }

    if ((event.message.text).toLowerCase() == "/insert id") {
      return lineController.inserUserIdGet(event)
    }

    if ((event.message.text).toLowerCase().split(',')[0] == "insertid") {
      const id = event.message.text.split(',')[1]
      if (id == undefined || id == "") {
        return lineController.inComplete(event,"Please insert id!")
      }
      return lineController.insertUserIdPost(event,id)
    }

    if ((event.message.text).toLowerCase() == "/get user id") {
      return lineController.getUserId(event)
    }

    if ((event.message.text).toLowerCase() == "/help") {
      return lineController.getCommand(event)
    }

    if((event.message.text).toLowerCase() == "/admin") {
      return lineController.getAdminCommand(event)
    }
    if((event.message.text).toLowerCase() == "/check user id") {
      return lineController.checkUserIds(event)
    }


    return lineController.notFound(event)
  }


module.exports = handleEvent
