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

app.get('/a', (request, response) => {
  console.log('recibiendo imagen...')
  cloudinary.uploader
  .upload("b.jpg", {
    resource_type: "image",
  })
  .then((result) => {
    console.log(result);
    console.log(result.secure_url)
    response.status(202);
    response.send(JSON.stringify(result));

  })
  .catch((error) => {
    console.log(error);
    response.status(404).send('error');
  });

})
