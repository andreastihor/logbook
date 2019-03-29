const lineServer = require('./lineServer')

const userId = [
  'U85303935ae66482dd859deea2d99b0ae'
]


function getUserId(event) {
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: event.source.userId,
  });
}

function testing(event) {

  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: "apalo"
  });
}

function ditto(event) {
  return lineServer.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

module.exports = {
  testing,
  getUserId,
  ditto,
}
