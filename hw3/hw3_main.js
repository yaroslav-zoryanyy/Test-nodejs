const express = require('express')
const app = express()
const dotenv = require('dotenv')
let db = require('./db/users.json')
const {json} = require("express");

app.use(express.json())
dotenv.config({ path: '../.env' })

const fn = async () =>{
    //GRUD
    app.get('/users', (req, res) => {
        res.json(db)
    })
    app.get('/users/:userId', (req, res) => {
        const user =  db.find(user => user.id === Number(req.params.userId))
        res.json(user)
    })
    app.post('/users', (req, res) => {
        db.push(req.body)
        res.json(db)
    })
    app.delete('/users/:userId', (req, res) => {
        db =  db.filter(user => user.id !== Number(req.params.userId))
        res.json(db)
    })
    app.put('/users/:userId', (req, res) => {
        const userId = req.params.userId
        const userIndex =  db.findIndex(user => user.id === Number(userId))
        db[userIndex] = {id: Number(userId), ...req.body };
    })
    app.patch('/users/:userId', (req, res) => {
        const userId = req.params.userId
        const userIndex =  db.findIndex(user => user.id === Number(userId))
        db[userIndex] = {...db[userIndex], ...req.body };
    })

    //Server
    const port = process.env.PORT;
    await app.listen(port,() =>{
        console.log(
            `Server has been started on port ${port}`
        )
    })
}
fn().catch(err => console.log(err))