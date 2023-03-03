const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const dotenv =require('dotenv')
dotenv.config()

app.use(express())
app.use(bodyParser.json())

const Users = require('./api/user/user.router')
app.use('/api/users', Users)

const Todo = require('./api/todolist/todo.router')
app.use('/api/todo', Todo)

app.listen(8080, ()=> console.log("server run at port 8080"))