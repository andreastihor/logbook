
const lineService = require('./lineService')


  function handleEvent (event) {
    if (event.message.text == "test") {
      return lineService.testing(event)
    }
    if (event.message.text == "user") {
      return lineService.getUserId(event)
    }
    return lineService.ditto(event)
  }







module.exports = handleEvent
