const Hapi = require('hapi')
const Promise = require('bluebird')
const logbook = require('./controller/logbook')
const handleLineEvent = require('./handler/lineHandler')

const server=Hapi.server({
    host:'0.0.0.0',
    port:8213
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  return handleLineEvent(event)
}


server.route({
  path : "/",
  method : "POST",
  handler : (req,res) => {
    return req.payload.events.map(event => {
       return handleEvent(event);
     });
  }
})

server.route({
  method : 'GET',
  path : '/',
  handler : (req,h) => {
    return "test Completed"
  }
})

server.route({
  method : 'POST',
  path : '/insert',
  handler : async (req,h) => {
    return logbook(req.payload)
  }
})

const start = async function() {
    try {
      console.log("Starting Server ... ");
      await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
};
start()
