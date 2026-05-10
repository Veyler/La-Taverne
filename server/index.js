const { db } = require("./firestore.js")
const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config() // Import du module dotenv, gestion du .env
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY
const app = express() // Creer une instance de express
const http = require('http').createServer(app) // Creer le serveur http 
const io = require("socket.io")(http, {
    cors: { origin: "*"} // Autorise toute les requetes
})
const cors = require("cors")
const PORT = process.env.PORT || 3000;
const path = require("path")

app.use(cors({
    origin: ["https://la-taverne.onrender.com", "http://127.0.0.1:5500"] // Middlewares de protection qui autorise 
}))                                                                      // uniquement les requetes du frontend 

app.use(express.json()) // Indispensable pour req.body


app.post("/login", async (req, res) => {
    const data = req.body // Récupere le contenu de la requete 
    const email = data.id // L'email est envoyé dans le champ 'id'
    const password = data.password

    try {
        // Récupère l'utilisateur de Firestore
        const userSnapshot = await db.collection('users').where('email', '==', email).limit(1).get()
        
        if (userSnapshot.empty) {
            res.status(401).send("Identifiant incorrect !")
            return
        }
        
        const userDoc = userSnapshot.docs[0]
        const user = userDoc.data()
        
        if (user.password !== password) { // Vérifie le mot de passe
            res.status(401).send("Identifiant incorrect !")
            return
        }
        
        const payload = { id : user.id, email : user.email, nickname : user.nickname} // Créer le payload
        const token = jwt.sign(payload, SECRET_JWT_KEY, {expiresIn : "1h"}) // Signe le payload 
        console.log("Token created : ", token)
        res.json({token}) // Renvoie le token 
        
    } catch (error) {
        console.error("Erreur lors de la connexion :", error)
        res.status(500).send("Erreur serveur")
    }
})

io.use((socket, next) => { // Middleware qui s'execute avant chaque connexion socket.io
    const token = socket.handshake.auth.token // récupère le token
    
    if (!token) {
        return next(new Error("Token not provided"))
    }
    
    jwt.verify(token, SECRET_JWT_KEY, (err, decoded) => { // vérifie le token
        if (err) {
            return next(new Error("Invalid Token"))
        }
        socket.user = decoded // stocke le token
        next() // Autorise la connexion
    })
})

io.on("connection", (socket) => {

    socket.on("message", (message) => {
        console.log(message)
        io.emit("message", `${socket.user.nickname} : ${message}`)
    })
})

http.listen(PORT, () => console.log("listening on http://localhost:8000"))