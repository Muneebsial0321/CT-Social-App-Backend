const express = require('express');
const app = express.Router()
const { uploadVideo, changeProfilePicture,
    deleteProfilePicture,
    viewProfilePicture,
    uploadProfilePicture,
    getUsers,
    getAUser,
    createUser,
    updateUser,
    deleteUser} = require('../Controller/User_Controller')
const upload = require("../functions/profileUpload")
const video= require('../functions/videoUpload')

app.get('/',getUsers)
app.get('/:id',getAUser)
app.post('/',createUser)
app.put('/:id',updateUser)
app.delete('/:id',deleteUser)

// profile picture routes
app.get('/profilepic/:id',viewProfilePicture)
app.post('/profilepic/:id',upload.single('profilepic'),uploadProfilePicture)
app.post('/video/:id',video.single('video'),uploadVideo)
app.put('/profilepic/:id',upload.single('profilepic'),changeProfilePicture)
app.delete('/profilepic/:id',deleteProfilePicture)


module.exports = app