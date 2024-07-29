const User = require('../Schemas/User'); // Adjust the path to your User model if necessary
const transporter = require('../functions/NodeMailer')
const Picture_ = require('../Schemas/Pictures')
const path = require('path');
const fs = require('fs');
const e = require('express');
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
  const userId = req.params.id
  const pictureUrl = `http://localhost:5000/images/profilepic/${req.file.filename}`
  const pictureName = req.file.filename
  try {
    const pic = new Picture_({ userId,pictureName,pictureUrl})
    await pic.save()
    res.send('File uploaded successfully');
  } catch (error) {
    res.send("error occured")
    
  }

}
const changeProfilePicture = async(req,res) =>{
  if (!req.file) {
    return res.status(400).send('Error: No file uploaded');
  }
  const userId = req.params.id
  const pictureUrl = `http://localhost:5000/images/profilepic/${req.file.filename}`
  const pictureName = req.file.filename
  try {
    const pic = new Picture_({ userId,pictureName,pictureUrl})
    await pic.save()
    res.send('File uploaded successfully');
  } catch (error) {
    res.send("error occured")
    
  }

}
const viewProfilePicture = async(req,res) =>{
  try {
    const userId = req.params.id
    const pic = await Picture_.findOne({userId:userId})
    res.json({link:pic.pictureUrl});
  } catch (error) {
    res.send("error occured")
    
  }

}
const deleteProfilePicture = async (req, res) => {


try {
  

  const { id } = req.params;
  const pic = await Picture_.findOne({userId:id})
  const { pictureName } = pic;
  const filePath = path.join(__dirname, '..','public', 'images', 'profilepic', pictureName);

  // Log the file path to ensure it is correct
  console.log(`Attempting to delete file: ${filePath}`);

  fs.unlink(filePath, async(err) => {
    if (err) {
      console.error('File deletion error:', err); // Log the full error for debugging
      return res.status(500).json({ error: 'File not found or could not be deleted', details: err.message });
    }

    await Picture_.findOneAndDelete({userId:id})
    res.json({ message: 'File deleted successfully' });
  });
} catch (error) {
  console.log(error)
}
};


module.exports = {
  changeProfilePicture,
  deleteProfilePicture,
  viewProfilePicture,
  uploadProfilePicture,
  getUsers,
  getAUser,
  createUser,
  updateUser,
  deleteUser
};
