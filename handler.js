const lineServer = require('./lineServer')
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'https://miami.viewen.com:2083',
  user : 'andreast_logbook',
  password : 'andre151098',
  database : 'andreast_logbook'
})


  function handleEvent (event) {
    if (event.message.text == "test") {
      return testing(event)
    }
    if (event.message.text == "user") {
      return user(event)
    }
    return lineServer.replyMessage(event.replyToken, {
      type: 'text',
      text: event.message.text
    });
  }

  function user(event) {
    let user = []
    connection.query('SELECT * from user',(err,row,fields) => {
      if (!err) {
      }
      console.log(err);
    })
    connection.close()
    return lineServer.replyMessage(event.replyToken, {
      type: 'text',
      text: user.toString()
    });
  }

  function testing(event) {

    return lineServer.replyMessage(event.replyToken, {
      type: 'text',
      text: "apalo"
    });
  }





module.exports = handleEvent
