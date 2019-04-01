const service = require('../service/lineService')

function addUserGet(event) {
  return service.message(event,`Insert User start with insert keyword,
    ex : insert,username,password`)
}

function addUserPost(event,username,password) {
  if(! service.checkUserIdExist(event)) return service.message(event,`You're id is Not Registered yet!`)
  return service.addUser(event,username,password)
}

function updateUserGet(event) {
  return service.message(event, `Please insert Information start with update keyword,
    ex : update,username,password`)
}

function deleteUserGet(event) {
  return service.message(`Please input userId start with delete Keyword,
    ex : delete,userId`)
}

function _checkAdmin(event) {
  if (!service.isAdmin(event)) return service.message(`You're not admin!!!`)
  return
}

function deleteUserPost(event,id) {
  _checkAdmin(event)
  return service.deleteUser(event,id)
}

function checkUsers(event) {
  _checkAdmin(event)
  return service.checkUsers(event)
}

function inserUserIdGet(event) {
  _checkAdmin(event)
  if(checkUserIdExist) return service.message(`You're id has already been registered!`)
  return service.message(`Please insert userId start with insertid,
    ex : insertid,xxx `)
}

function insertUserIdPost(event,id) {
  _checkAdmin(event)
  return service.insertId(event,id)
}

function changePasswordGet(event) {
  return service.message(event,`Please input password starting with password keyword,
    ex : password,xxxxx`)
}

function changePasswordPost(event,password) {
  if (service.checkUserObjExist(event)) {
    return service.message(event,`Register your username and password first!`)
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
  ]
  return service.message(event,help.toString())
}

function getAdminCommand(event) {
  const help = [
    '/insert id',
    '/delete user',
    '/check user'
  ]
  if (!service.isAdmin(event)) {
    return service.message(event,`Youre not an admin!!`)
  }
  return service.message(event,help.toString())
}

function notFound(event) {
  return service.message(event,`Command not found, try /help`)
}

function inComplete(event,message) {
  return service.message(event,message)
}

module.exports.lineController = {
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



  notFound,
  inComplete,
}