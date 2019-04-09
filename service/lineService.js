const lineServer = require('../lineServer')
let {myId, data, userIds, userObject } = require('../container')
const logbook = require('./logbook')

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
  userObject[_getUserId(event)] = {
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
  return message(event,JSON.stringify(userObject).replace(/,/,'\n'))
}

function insertId(event,id) {
  if (userIds.indexOf(id) == -1) {
    userIds.push(id)
    return message(event,`User Id Inserted!!`)
  }
  return message(event,'User has Already been Registered!')
}

function checkUserObjExist(event) {
  if (userObject[_getUserId(event)] != undefined) {
    return true
  }
  return false
}

function changePassword(event,password) {
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
  return message(event,userIds.toString().replace(/,/g,'\n'))
}

function checkDataInUsed(event) {
  if (data.status == "USED") {
    if (data.id  == _getUserId(event)) {
        return false
    }
    return true
  }
  return false
}



function getData(event) {
  return message(event,JSON.stringify(data))
}

function addData(event,x) {
  data.status = "USED"
  data.id = _getUserId(event)
  data.in = x[0]
  data.out = x[1]
  data.activity = x[2]
  data.description = x[3]

  setTimeout(() => {
    data.id = ''
    data.status = "IDLE"
    data.in = ""
    data.out = ""
    data.activity = ""
    data.description = ""
    delete data.username
    delete data.password
  },180000)
  return message(event,"Successfully Inserted data!")
}

async function sendData(event) {
  if (data.status == "IDLE") {
    return message(event,"Please fill data first!")
  }

  if (data.id != _getUserId(event)) {
    return  message(event,`Cant send data, this is not your data`)
  }

  const userData = userObject[_getUserId(event)]
  console.log(userData);
  if (userData == undefined) {
    return message(event,`Please register your id first!`)
  }

  const {username, password} = userData
  data.username = username
  data.password = password

  const pesan = await logbook(data)
  return message(event,`${pesan} with ||  in :${data.in} ||  out: ${data.out} ||  activity: ${data.activity} ||  description: ${data.description}`)
}

function message(event,message) {
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: message,
  });
}

function sendOff(event) {
  data.status = "USED"
  data.id = _getUserId(event)
  data.in = "Off"
  data.out = "Off"
  data.activity = "Off"
  data.description = "Off"

  setTimeout(() => {
    data.id = ''
    data.status = "IDLE"
    data.in = ""
    data.out = ""
    data.activity = ""
    data.description = ""
    delete data.username
    delete data.password
  },180000)

  return sendData(event)
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
  addData,
  checkDataInUsed,
  getData,
  sendData,
  message,
  sendOff,

}
