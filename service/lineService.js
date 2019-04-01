const lineServer = require('../lineServer')
const {myId, data, userId, userObject } = require('../container')

function _getUserId(event) {
  return  event.source.userId
}

function checkUserIdExist(event) {
   if (usersId.indexOf( _getUserId(event) ) >= 0  ) return true
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
  userId = userId.filter(e => e!== id)
  delete userObject[id]
  return message(event,`Successfully Deleted!`)

}

function checkUsers(event) {
  return message(event,JSON.stringify(userObject))
}

function insertId(event,id) {
  userId.push(id)
  return message(event,`User Id Inserted!!`)
}

function checkUserObjExist(event) {
  if (userObject[_getUserId(event)] != undefined) {
    return true
  }
  return false
}

function changePassword(event,password) {
  if(userObject[_getUserId(event)].password == "") {
    return message(event,`Please FIll Password First!`)
  }
  userObject[_getUserId(event)].password == password
  return message(event,`Successfully Change Password!`)
}

function getUserId(event) {
  return message(event,_getUserId(event))
}




function message(event,message) {
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: message,
  });
}
//
//
// function help(event) {
//   const keyword = [
//     "/help",
//     "addUser",
//     "change password",
//     "get id",
//
//   ]
//   return lineServer.replyMessage(event.replyToken, {
//     type: 'text',
//     text: keyword.toString()
//   });
// }
//
// function insertUser(event) {
//   const user = event.message.text.split(',')
//   if (event.source.userId == 'U85303935ae66482dd859deea2d99b0ae') {
//     users[getUserId(event)] = {}
//     users[getUserId(event)].username = user[1]
//     users[getUserId(event)].password = user[2]
//     return lineServer.replyMessage(event.replyToken, {
//       type: 'text',
//       text: "succesfully registered!"
//     });
//   }
//   return lineServer.replyMessage(event.replyToken, {
//     type: 'text',
//     text: "sorry, youre not qualified!"
//   });
// }
//
//
//
// function changePassword(event) {
//   return lineServer.replyMessage(event.replyToken, {
//     type: 'text',
//     text: `input password
//       ex password,xxxxxxx`
//   });
// }
//
//
// function updatePassword(event) {
//   const newPassword = event.message.text.split(',')[1]
//   if (users[getUserId(event)] == undefined || users[getUserId(event)].password == "") {
//     return lineServer.replyMessage(event.replyToken, {
//       type: 'text',
//       text: `please fill in password first!`
//     });
//   }
//
//   users[getUserId(event)].password = newPassword
//   return lineServer.replyMessage(event.replyToken, {
//     type: 'text',
//     text: `successfully change password`
//   });
// }
//
// function addId(event) {
//   if (event.source.userId != 'U85303935ae66482dd859deea2d99b0ae' ) {
//     return lineServer.replyMessage(event.replyToken, {
//       type: 'text',
//       text: `not qualified!`
//     });
//   }
//   userId.push(event.source.userId)
//   return lineServer.replyMessage(event.replyToken, {
//     type: 'text',
//     text: `successfully add user ID`
//   });
// }
//
// function admin(event) {
//   const key = [
//     "check user",
//     "addid,xxx",
//     "deleteuser,xxx",
//     "check user id"
//   ]
//
//   if (event.source.userId != 'U85303935ae66482dd859deea2d99b0ae' ) {
//     return lineServer.replyMessage(event.replyToken, {
//       type: 'text',
//       text: `not qualified!`
//     });
//   }
//
//   return lineServer.replyMessage(event.replyToken, {
//     type: 'text',
//     text: key.toString()
//   });
// }
//
// function deleteUser(event) {
//   if (event.source.userId != 'U85303935ae66482dd859deea2d99b0ae' ) {
//     return lineServer.replyMessage(event.replyToken, {
//       type: 'text',
//       text: `not qualified!`
//     });
//   }
//   const id = event.message.text.split(',')[1]
//   if (userId.indexOf(id) != -1) {
//     userId = userId.filter(e => e !== id)
//     return lineServer.replyMessage(event.replyToken, {
//       type: 'text',
//       text: `user id deleted!`
//     });
//   }
//   return lineServer.replyMessage(event.replyToken, {
//     type: 'text',
//     text: `user not found`
//   });
// }
//
//
// function getId(event) {
//   return lineServer.replyMessage(event.replyToken, {
//     type: 'text',
//     text: getUserId(event)
//   });
// }
//
// function checkIds(event) {
//   if (event.source.userId != 'U85303935ae66482dd859deea2d99b0ae' ) {
//     return lineServer.replyMessage(event.replyToken, {
//       type: 'text',
//       text: `not qualified!`
//     });
//   }
//   return lineServer.replyMessage(event.replyToken, {
//     type: 'text',
//     text: userId.toString()
//   });
// }



module.exports.service = {
  checkUserIdExist,
  isAdmin,
  addUser,
  deleteUser,
  checkUsers,
  insertId,
  checkUserObjExist,
  changePassword,
  getUserId,


  message,

}
