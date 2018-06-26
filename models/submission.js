const mongoose = require('mongoose');

let SubmissionSchema = mongoose.Schema({
  permalink:      {type: String, lowercase: true, unique: true},
  title:          {type: String},
  text:           {type: String},
  url:            {type: String},
  subreddit:      {type: String},
  created:        {type: Date},
  lastCrawl:      {type: Date}
}, {timestamps: true})

let Submission = module.exports = mongoose.model('posts', SubmissionSchema)
