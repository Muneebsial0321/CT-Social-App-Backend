const dotenv = require('dotenv')
dotenv.config()
const { fromEnv } = require('@aws-sdk/credential-providers');
// decleartions
const express = require('express');
const app = express();
const db =require('./Config/Mongoose')
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { Readable } = require('stream');
db() 



// exp
console.log(fromEnv)

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: fromEnv(),
});

// // Set up multer and multer-s3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        },
    }),
});

// // Routes
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // const newFile = new File({
        //     filename: req.file.originalname,
        //     s3_key: req.file.key,
        // });
        // await newFile.save();
        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// app.get('/files/:key', async (req, res) => {
//     const key = req.params.key;

//     try {
//         const params = {
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: key,
//         };

//         const command = new GetObjectCommand(params);
//         const response = await s3.send(command);

//         // Stream the response body to the client
//         const stream = Readable.from(response.Body);
//         stream.pipe(res);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


// exp end







// // middlewares
app.use(express.json())
app.use(express.static('public'))
// app.use('/user', require('./Routes/UserRoutes')) 



app.listen(process.env.PORT,()=>{console.log(`SERVER at port`,process.env.PORT)})

