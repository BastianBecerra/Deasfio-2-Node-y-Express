const express = require('express')
const fs = require("fs")

const app = express()
app.use(express.json())

app.listen(3000, ()=> {
    console.log('Servidor iniciado')
})

app.get("/", (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

app.get("/canciones", (req, res) =>{
    const canciones = JSON.parse(fs.readFileSync("repertorios.json"))
    res.json(canciones)
})

app.post("/canciones", (req, res) =>{
    const cancion =  req.body
    const canciones = JSON.parse(fs.readFileSync("repertorios.json"))
    canciones.push(cancion)
    fs.writeFileSync("repertorios.json", JSON.stringify(canciones))
    res.send("Canicion añadida")
})

app.put("/canciones/:id", (req, res) => {
    const {id} = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("repertorios.json"))
    const index = canciones.findIndex(cancion => cancion.id == id)
    canciones[index] = cancion
    fs.writeFileSync("repertorios.json", JSON.stringify(canciones))
    res.send("Cancion modificada con exito")
})

app.delete( "/canciones/:id", (req, res) =>{
    const {id} = req.params
    const canciones = JSON.parse(fs.readFileSync("repertorios.json"))
    const index = canciones.findIndex(cancion => cancion.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync("repertorios.json", JSON.stringify(canciones))
    res.send("Cancion borrada con exito")
})