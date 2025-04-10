import express from 'express'
import { Server } from "socket.io"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500
const ADMIN = "Admin"

const app = express()

app.use(express.static(path.join(__dirname, "public")))

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})


const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    // Upon connection - only to user 
    socket.emit('message', buildMsg(ADMIN, "Welcome to Chat App!"))

    socket.on('enterRoom', ({ name }) => {

        const user = activateUser(socket.id, name)

        // To user who joined 
        socket.emit('message', buildMsg(ADMIN, `You have joined the chat room!`))

        // To everyone else 
        const usersAlreadyHere = getUsersAlreadyHere(socket.id)
        socket.broadcast.to(usersAlreadyHere).emit('message', buildMsg(ADMIN, `${user.name} has joined the room`))

    })

    // When user disconnects - to all others 
    socket.on('disconnect', () => {
        const user = getUser(socket.id)
        userLeavesApp(socket.id)

        if (user) {
            io.emit('message', buildMsg(ADMIN, `${user.name} has left the room`))
        }

        console.log(`User ${socket.id} disconnected`)
    })

    // Listening for a message event 
    socket.on('message', ({ name, text }) => {
        const room = getUser(socket.id)
        if (room) {
            io.emit('message', buildMsg(name, text))
        }
    })

    // Listen for activity 
    socket.on('activity', (name) => {
        const room = getUser(socket.id)?.room
        if (room) {
            socket.broadcast.to(room).emit('activity', name)
        }
    })
})

function buildMsg(name, text) {
    return {
        name,
        text,
        time: new Intl.DateTimeFormat('default', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(new Date())
    }
}

// User functions 
// state 
const UsersState = {
    users: [],
    setUsers: function (newUsersArray) {
        this.users = newUsersArray
    }
}

function activateUser(id, name) {
    const user = { id, name }
    UsersState.setUsers([
        ...UsersState.users.filter(user => user.id !== id),
        user
    ])
    return user
}

function userLeavesApp(id) {
    UsersState.setUsers(
        UsersState.users.filter(user => user.id !== id)
    )
}

function getUser(id) {
    return UsersState.users.find(user => user.id === id)
}

function getUsersAlreadyHere(id) {
    return UsersState.users.filter(user => user.id !== id)
}
