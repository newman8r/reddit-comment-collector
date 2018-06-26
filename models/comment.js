const mongoose = require('mongoose');

let CommentSchema = mongoose.Schema({
  body:           {type: String},
  author:         {type: String},
  subreddit:      {type: String},
  permalink:      {type: String, lowercase: true, index: true, unique: true},
  date:           {type: Date},
  submissionLink:  {type: String},
  submissionTitle: {type: String}
}, {timestamps: true})

let Comment = module.exports = mongoose.model('comments', CommentSchema);
