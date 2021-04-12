const express = require("express")
const routes = require("./routes")
const server = express()
const path = require("path")

server.set('view engine', 'ejs')

server.set('views', path.join(__dirname, 'views'))

// usar - habilitar o req.body
server.use(express.urlencoded({ extended: true }))

//habilitar aquivos estáticos
server.use(express.static("public"))

server.use(routes)

server.listen(3000)