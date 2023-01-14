//IMPORT CONSULTS

const { getPosts, postPosts, modificarLikes, eliminarPosts } = require("./consultas")

//IMPORT EXPRESS
const express = require('express')
const app = express()

//IMPORT CORS
const cors = require('cors')

//CREATE SERVER

app.listen(3000, console.log("SERVER UP!!"))


//DIFERENT USES
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

//RETURN FILE FROM DB

app.get("/", (req, res) => {
    try {
        res.sendFile(__dirname + "public/index.html")
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get("/posts", async (req, res) => {
    try {
        const posts = await getPosts()
        res.json(posts)
    } catch (e) {
        res.status(500).send(e)
    }
})


app.post("/posts", async (req, res) => {
    try {
        const { titulo, img, descripcion, likes } = req.body
        await postPosts(titulo, img, descripcion, likes)
        res.send("Registros Agregados")

    } catch (e) {
        res.status(500).send(e)
    }
})

app.put("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { likes } = req.query
        await modificarLikes(likes, id)
        res.send("Likes Modificado")
    } catch (e) {
        res.status(500).send(e)
    }

})

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params
        await eliminarPosts(id)
        res.send("Posts Eliminado")
    } catch (e) {
        res.status(500).send(e)
    }
})
