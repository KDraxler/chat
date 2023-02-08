require("dotenv").config();
const express = require('express')
const app = express()
const http =require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const PORT = process.env.PORT
const URL = process.env.URL_FE
const MONGO_URL = process.env.MONGO_URL
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')

app.use(cors())
app.use(express.json())
app.use('/api/auth',userRoute)

mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    UseUnifiedTopology: true
}).then(()=>{
    console.log('DB successfully connect!')
}).catch((err)=>{
    console.log(err.message)
})

app.get('/', (req, res) => {
    res.send('Welcome dude!')
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
    console.log(`server running on port: ${PORT}`)
    
})