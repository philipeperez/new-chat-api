import {Server} from 'socket.io'

const PORT = 4000

const io = new Server(PORT)

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

