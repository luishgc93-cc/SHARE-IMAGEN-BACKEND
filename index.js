const express = require('express');
const app = express();
const cors = require("cors")
var fs = require('fs');
require("dotenv").config();
const cloudinary = require('cloudinary').v2

app.use(express.json())

app.use(cors())

const whitelist = ['http://localhost:3000/', '*']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server corriendo en puerto : ${PORT}`)
})

app.get('/', (request, response) => {
  response.send('<h2>hola esto es inicio de backend share</h2>')
})

app.get('/subirImagen', (request, response) => {
  console.log('x')
  cloudinary.uploader
  .upload("a.jpg", 
  {resource_type: "image",}, 
  (error, result)=>{
    console.log(result, error);
    response.send('correcto')

  })

})


