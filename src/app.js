import {Server} from 'socket.io'
import express from 'express'
import * as http from 'http'

const PORT = 4000

const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', socket => {
    console.log('Client connected', socket.id)

    socket.on('joinRoom', roomName => {
        socket.join(roomName)
        socket.on('message', msg => {
            io.to(roomName).emit('message', msg)
        })
    })
    socket.on('leaveRoom', roomName => {
        socket.leave(roomName)
    })
})

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
