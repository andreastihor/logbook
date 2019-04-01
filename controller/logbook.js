const logbookService = require('../service/logbook')

module.exports = async function send(data) {
  if (data.username == "") return "Username Not Found"
  if (data.password == "") return "Password Not Found"
  if (data.in == "") return "In Not Found"
  if (data.out == "") return "Out Not Found"
  if (data.activity == "") return "Activity Not Found"
  if (data.description == "") return "Description Not Found"
  return await logbookService(data)
}
