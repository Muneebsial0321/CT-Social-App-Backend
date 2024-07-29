const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
videoName:String,
userId:String,
videoUrl:string,
}, {
  timestamps: true
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;