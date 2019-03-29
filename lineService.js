const lineServer = require('./lineServer')

const userId = [
  'U85303935ae66482dd859deea2d99b0ae'
]
const users = {
  'U85303935ae66482dd859deea2d99b0ae' : {
    username: '',
    password : ''
  }
}

function getUserId(event) {
  return  event.source.userId
}

function testing(event) {

  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: "apalo"
  });
}

function notFound(event) {
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: "no reply found for that, try /help"
  });
}


function addUser(event) {
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: `please Input username and password
      ex : adduser,20xxxxx,password`
  });

}

function help(event) {
  const keyword = [
    "/help",
    "addUser",
    "test",
    "change password",

  ]
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: keyword.toString()
  });
}

function insertUser(event) {
  const user = event.message.text.split(',')
  if (event.source.userId.indexOf(userId) == 0) {
    users[getUserId(event)].username = user[1]
    users[getUserId(event)].password = user[2]
    return lineServer.replyMessage(event.replyToken, {
      type: 'text',
      text: "succesfully registered!"
    });
  }
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: "sorry, youre not qualified!"
  });
}

function checkUsers(event) {
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: JSON.stringify(users)
  });
}

function changePassword(event) {
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: `input password
      ex password,xxxxxxx`
  });
}


function updatePassword(event) {
  const newPassword = event.message.text.split(',')[1]
  if (users[getUserId(event)].password == "") {
    return lineServer.replyMessage(event.replyToken, {
      type: 'text',
      text: `please fill in password first!`
    });
  }

  users[getUserId(event)].password = newPassword
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: `successfully change password`
  });
}

function addId(event) {
  userId.push(event.source.userId)
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: `successfully add user ID`
  });
}

function admin(event) {
  const key = [
    "check admin",
    "adduser --admin"
  ]
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: key.toString()
  });
}

module.exports = {
  testing,
  notFound,
  addUser,
  help,
  checkUsers,
  insertUser,
  updatePassword,
  addId,
  admin,
}
