const express = require('express')
const app = express()
const http =require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const PORT = 3001
const URL = 'http://localhost:3000'

app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin : URL,
        methods : ['GET', 'POST']
    } 
})

io.on('connection', (socket)=>{
    console.log("user connection id: ",socket.id)
    socket.on('send_messagesss', (data)=>{
        console.log(data)
        
        socket.broadcast.emit('receive_messagesss', data)
    })
})

server.listen(PORT, ()=>{
    console.log("server running")
    
})