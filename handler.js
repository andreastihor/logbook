const lineServer = require('./lineServer')


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
    return lineServer.replyMessage(event.replyToken, {
      type: 'text',
      text: event.userId,
    });
  }

  function testing(event) {

    return lineServer.replyMessage(event.replyToken, {
      type: 'text',
      text: "apalo"
    });
  }





module.exports = handleEvent
