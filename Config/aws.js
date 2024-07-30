const dotenv = require('dotenv')
dotenv.config()
const { fromEnv } = require('@aws-sdk/credential-providers');
const { S3Client} = require('@aws-sdk/client-s3');
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: fromEnv(),
});

module.exports = s3

// // Routes

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


