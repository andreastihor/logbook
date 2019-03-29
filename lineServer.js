const Line = require('@line/bot-sdk');
const config = {
  channelAccessToken: `WZXPuKFxqktJHc3CcRZ6m8nPVqkOdxaTnlVS7S1RveTEei65SBrpMvXQZTc99Lbh6SKCSV26VeaTIh26J0qMDej9rqjQ2/wtQGCGYJ7KC8ClBz94B8HF5V+QVVVQzI7onJoXD+2icSK1MZMZQqi16QdB04t89/1O/w1cDnyilFU=`,
  channelSecret: `4d7ba1230d745d64c4ac2f19de9a2011`
}

const lineServer = new Line.Client(config)
module.exports = lineServer
