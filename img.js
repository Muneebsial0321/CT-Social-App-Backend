const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('profilepic');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Public folder
app.use(express.static('./public'));

// Route to handle image upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send({
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.send({
          msg: 'Error: No File Selected!'
        });
      } else {
        res.send({
          msg: 'File Uploaded!',
          file: `public/${req.file.profilepic}`
        });
      }
    }
  });
});

// Start server
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
