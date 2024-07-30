const User = require('../Schemas/User'); // Adjust the path to your User model if necessary
const transporter = require('../functions/NodeMailer')
const Picture_ = require('../Schemas/Pictures')
const Video = require('../Schemas/Videos')
const path = require('path');
const { GetObjectCommand,DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { Readable } = require('stream');
const fs = require('fs');
const s3 = require("../Config/aws")

// Get Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get a User

const getAUser = async (req, res) => {
  try {
    const {id} = req.params
    const users = await User.findById(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Create User
const createUser = async (req, res) => {

    const check = await User.find({email:req.body.email})
    console.log(check.length)
    if(check.length>0){
        res.json({"messge":"already exists"})
    }
    else{
    try {
      const user = new User(req.body);
      await user.save();
      console.log("USer is", user.email)

         console.log(process.env.ADMIN_EMAIL)
         const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to:  user.email,
            subject: 'WElCOME USER',
            text: `welcome ${user.name}`
          };
          
      // Send email  

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            console.log(info)
          console.log('Email sent: ' + info.response);
        }
      });
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
}
  };
// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error });
  }
};


const uploadProfilePicture = async(req,res) =>{
  if (!req.file) {
    return res.status(400).send('Error: No file uploaded');
  }
  console.log(req.file)
  const userId = req.params.id
  const pictureUrl = req.file.location
  const pictureName = req.file.key
  try {
    const pic = new Picture_({ userId,pictureName,pictureUrl})
    await pic.save()
    res.send('File uploaded successfully');
  } catch (error) {
    res.send("error occured")
    
  }

}
const uploadVideo = async(req,res) =>{
  if (!req.file) {
    return res.status(400).send('Error: No file uploaded');
  }
  const userId = req.params.id
  const videoUrl = req.file.location
  const videoName = req.file.key
  try {
    const vid = new Video({ userId,videoName,videoUrl})
    await vid.save()
    res.send('File uploaded successfully');
  } catch (error) {
    console.log("error occured",error)
    
  }

}
const viewVideo = async(req,res) =>{
  try {
    const userId = req.params.id
    const vid = await Video.findOne({userId:userId})
    const key = vid.videoName;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        };
        const command = new GetObjectCommand(params);
        const response = await s3.send(command);
        // Stream the response body to the client
        const stream = Readable.from(response.Body);
        stream.pipe(res);
  } catch (error) {
    res.send("error occured")
    
  }

}
const viewProfilePicture = async(req,res) =>{
  try {
    const userId = req.params.id
    const pic = await Picture_.findOne({userId:userId})
    const key = pic.pictureName;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        };
        const command = new GetObjectCommand(params);
        const response = await s3.send(command);
        // Stream the response body to the client
        const stream = Readable.from(response.Body);
        stream.pipe(res);
  } catch (error) {
    res.send("error occured")
    
  }

}

const deleteVideo = async (req, res) => {
  const userId = req.params.id
  const pic = await Video.findOne({userId:userId})
  const key = pic.videoName;
  try {
      const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
      };

      const command = new DeleteObjectCommand(params);
      await s3.send(command);

      // Optionally, remove the file reference from the database
      await Video.deleteOne({ videoName: key });

      res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}
const deleteProfilePicture = async (req, res) => {
  const userId = req.params.id
  const pic = await Picture_.findOne({userId:userId})
  const key = pic.pictureName;
  try {
      const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
      };

      const command = new DeleteObjectCommand(params);
      await s3.send(command);

      // Optionally, remove the file reference from the database
      await Video.deleteOne({ videoName: key });

      res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}

module.exports = {
  uploadVideo,
  viewVideo,
  deleteVideo,
  deleteProfilePicture,
  viewProfilePicture,
  uploadProfilePicture,
  getUsers,
  getAUser,
  createUser,
  updateUser,
  deleteUser
};
