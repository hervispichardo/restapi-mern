import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express(apiRoot, api)
const server = http.createServer(app)

const io = require('socket.io').listen(server);

io.on('connection', client => {
  console.log("a client connected")

  client.on('new-vote', data => {
    console.log("new-vote: ", data);
  });
  client.on('disconnect', () =>{
    console.log("disconnect");
  });
});

mongoose.connect(mongo.uri, { useMongoClient: true })
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
