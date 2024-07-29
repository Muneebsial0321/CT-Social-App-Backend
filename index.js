require('dotenv').config()
// decleartions
const express = require('express');
const app = express();
const db =require('./Config/Mongoose')
const upload = require('./functions/profileUpload');
db()


// // middlewares
app.use(express.json())
app.use(express.static('public'))
app.use('/user', require('./Routes/UserRoutes')) 



// exp

// app.post('/upload', upload.single('profilepic'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('Error: No file uploaded');
//   }
//   console.log("file is")
//   console.log(req.file.filename)
//   res.send('File uploaded successfully');
// });

// exp end


app.listen(process.env.PORT,()=>{console.log(`SERVER at port`,process.env.PORT)})

