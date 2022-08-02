const express = require('express');
const bodyParser = require('body-parser')
const cors  = require('cors');
const fileUpload = require('express-fileupload')
const app = express();
require('dotenv').config(); 
const cloudinary = require('cloudinary').v2
var fs = require('fs');

// Other Settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use(express.static('files'))

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server corriendo en puerto : ${PORT}`)
})

app.get('/', (request, response) => {
  response.send('<h2>home</h2>')
})

app.post('/a', (request, response, next) => {
  console.log('recibiendo imagen...');
  const newPath = __dirname + '/public/files/';
  const file = request.files.file;
  const filename = file.name;
  const ficheroFinal = (`${newPath}${filename}`);
  file.mv(`${newPath}${filename}`);

  cloudinary.uploader
  .upload(ficheroFinal, {
    resource_type: "image",
  })
  .then((result) => {
    console.log(result);
    console.log(result.secure_url)
    BorrarFotoTemporalmente(ficheroFinal);
    response.status(200);
    response.send(JSON.stringify(result));

  })
  .catch((error) => {
    console.log(error);
    BorrarFotoTemporalmente(ficheroFinal);
    response.status(404).send('error');
  });


})

function BorrarFotoTemporalmente (foto){
  try {
    fs.unlinkSync(foto);
    console.log('Foto temporal borrada');
  } catch(foto) {
    console.error('Something wrong happened removing the file');
  }
}