const service = require('./service')
const Hapi = require('hapi')
const Promise = require('bluebird')
const handleLineEvent = require('./handler')

// Create a server with a host and port
const server=Hapi.server({
    host:'0.0.0.0',
    port:8132
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
    return await service(req.payload)
  }
})

const start =  async function() {

    try {
        await server.start();

    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start()
