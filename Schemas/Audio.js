const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audioSchema = new Schema({
audioName:String,
userId:String,
audioUrl:string,
}, {
  timestamps: true
});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;
