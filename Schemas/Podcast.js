const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const podcastSchema = new Schema({
    publisher: {
        type: String,
        // required: true,
        // trim: true
    },
    audio: {
        type: String,
        // required: true
    },
    customizeCover: {
        type: String,
        // required: true
    },
    episodeTitle: {
        type: String,
        // required: true
    },

    episodeDescription: {
        type: String,
        required: true
    },

    podcastType: {
        type: String,
        required: true
    },
    seasonNumber: {
        type: Number,
        required: true
    },
    episodeNumber: {
        type: Number,
        required: true
    },
    speakers: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;