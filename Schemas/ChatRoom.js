const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
  users: {
    type: [String],
    // validate: [arrayLimit, '{PATH} exceeds the limit of 2'],
    required: true
  },
  messages: [{
    sender:String,
    message:String,
   timestamp: {
    type: Date,
    default: Date.now
  } 
  },
  ]
}, {
  timestamps: true
});

// function arrayLimit(val) {
//   return val.length === 2;
// }

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;