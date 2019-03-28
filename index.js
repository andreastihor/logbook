const service = require('./service')
const Hapi = require('hapi')

// Create a server with a host and port
const server=Hapi.server({
    host:'0.0.0.0',
    port:8132
});

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
