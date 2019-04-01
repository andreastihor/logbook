const lineServer = require('../lineServer')
const {myId, data, userIds, userObject } = require('../container')

function _getUserId(event) {
  return  (event.source.userId).toString()
}

function checkUserIdExist(event) {
   if (userIds.indexOf( _getUserId(event) ) >= 0  ) return true
   return false
}

function isAdmin(event) {
  if (_getUserId(event) == myId) return true
  return false
}

function addUser(event,username,password) {
  userObject[event.source.userId] = {
    username,
    password,
  }
  return message(event,'Successfully Registered!')
}

function deleteUser(event,id) {
  userIds = userIds.filter(e => e!== id)
  delete userObject[id]
  return message(event,`Successfully Deleted!`)

}

function checkUsers(event) {
  return message(event,JSON.stringify(userObject))
}

function insertId(event,id) {
  userIds.push(id)
  return message(event,`User Id Inserted!!`)
}

function checkUserObjExist(event) {
  if (userObject[_getUserId(event)] != undefined) {
    return true
  }
  return false
}

function changePassword(event,password) {
  if(userObject[_getUserId(event)].password == undefined || userObject[_getUserId(event)].password == ""  ) {
    return message(event,`Please Fill Password First!`)
  }
  userObject[_getUserId(event)].password = password
  return message(event,`Successfully Change Password!`)
}

function getUserId(event) {
  return message(event,_getUserId(event))
}

function checkUserIds(event) {
  if (userIds.length == "") {
    return message(event,"[]")
  }
  return message(event,userIds.toString())
}


function message(event,message) {
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: message,
  });
}

module.exports = {
  checkUserIdExist,
  isAdmin,
  addUser,
  deleteUser,
  checkUsers,
  insertId,
  checkUserObjExist,
  changePassword,
  getUserId,
  checkUserIds,


  message,

}
