const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  profilePicture: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
    // trim: true,
    lowercase: true
  },
  password: {
    type: String,
    // required: true
  },
  role: {
    type: String,
    enum: ['invester','viewer','enterpenur', 'admin'],
    default: 'viewer'
  },
  ratings: {
    type: [Number],
    default: []
  },
  notifications:[
    {
      title :String,
      message:String,
      
    },
  ]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
