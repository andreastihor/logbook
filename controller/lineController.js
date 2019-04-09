const service = require('../service/lineService')

function addUserGet(event) {
  return service.message(event,`Insert User start with insert keyword,
    ex : insert,username,password`)
}

function addUserPost(event,username,password) {
  if(!service.checkUserIdExist(event)) return service.message(event,`You're id is Not Registered yet!`)
  return service.addUser(event,username,password)
}

function updateUserGet(event) {
  return service.message(event, `Please insert Information start with update keyword,
    ex : update,username,password`)
}

function deleteUserGet(event) {
  return service.message(event,`Please input userId start with delete Keyword,
    ex : delete,userId`)
}

function _checkAdmin (event) {
  if (service.isAdmin(event)) return true
  return false
}

function deleteUserPost(event,id) {
  if (!_checkAdmin(event)) {
    return service.message(event,`Youre'not admin ask andreas for this!`)
  }
  return service.deleteUser(event,id)
}

function checkUsers(event) {
  if (!_checkAdmin(event)) {
    return service.message(event,`Youre'not admin ask andreas for this!`)
  }
  return service.checkUsers(event)
}

function inserUserIdGet(event) {
  if (!_checkAdmin(event)) {
    return service.message(event,`Youre'not admin ask andreas for this!`)
  }
  if(service.checkUserIdExist(event)) return service.message(event,`You're id has already been registered!`)
  return service.message(event,`Please insert userId start with insertid,
    ex : insertid,xxx `)
}

function insertUserIdPost(event,id) {
  if (!_checkAdmin(event)) {
    return service.message(event,`Youre'not admin ask andreas for this!`)
  }
  return service.insertId(event,id)
}

function changePasswordGet(event) {
  return service.message(event,`Please input password starting with password keyword,
    ex : password,xxxxx`)
}

function changePasswordPost(event,password) {
  if (!service.checkUserObjExist(event)) {
    return service.message(event,`Register your username and password first!`)
  }
  if(password == undefined || password == "") {
    return service.message(event,`Please Fill Password First!`)
  }
  return service.changePassword(event,password)
}

function getUserId(event) {
  return service.getUserId(event)
}

function getCommand(event) {
  const help = [
    '/insert user',
    '/update user',
    '/change password',
    '/get user id',
    '/admin' ,
    '/input data' ,
    '/send',
    '/sendoff'
  ]
  return service.message(event,help.toString().replace(/,/g,'\n'))
}

function getAdminCommand(event) {
  const help = [
    '/insert id',
    '/delete user',
    '/check user',
    '/check user id',
    '/check data'

  ]
  if (!_checkAdmin(event)) {
    return service.message(event,`Youre'not admin ask andreas for this!`)
  }
  return service.message(event,help.toString().replace(/,/g,'\n'))
}

function notFound(event) {
  return service.message(event,`Command not found, try /help`)
}

function inComplete(event,message) {
  return service.message(event,message)
}

function checkUserIds(event) {
  if (!_checkAdmin(event)) {
    return service.message(event,`Youre'not admin ask andreas for this!`)
  }
  return service.checkUserIds(event)
}

function inputData(event) {
  checkData(event)
  return service.message(event,`Please input in out activity and description separated with |,
    ex : in | out | activity | description`)

}

function checkData(event) {
  if (service.checkDataInUsed(event)) { return service.message(event,`Data is inused, comeback later!`) }
  return
}

function insertData(event,data) {
  checkData(event)
  return service.addData(event,data)
}
function getData(event) {
  return service.getData(event)
}

function sendData(event) {
  return service.sendData(event)
}

function sendOff(event) {
  checkData(event)
  const data = {
    in: "off",
    out : "off",
    activity: "off",
    description : "off"
  }
  service.addData(event,data)
  service.sendData(event)
}

module.exports = {
  addUserGet,
  addUserPost,
  updateUserGet,
  deleteUserGet,
  deleteUserPost,
  checkUsers,
  inserUserIdGet,
  insertUserIdPost,
  changePasswordGet,
  changePasswordPost,
  getUserId,
  getCommand,
  getAdminCommand,
  checkUserIds,
  inputData,
  insertData,
  getData,
  sendData,
  sendOff,

  notFound,
  inComplete,
}
