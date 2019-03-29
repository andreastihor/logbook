const lineServer = require('./lineServer')



  function handleEvent (event) {
    if (event.message.text == "test") {
      return testing(event)
    }
    return lineServer.replyMessage(event.replyToken, {
      type: 'text',
      text: event.message.text
    });
  }

  function username(message) {

  }

  function testing(event) {
    return lineServer.replyMessage(event.replyToken, {
      type: 'text',
      text: "apalo"
    });
  }





module.exports = handleEvent
