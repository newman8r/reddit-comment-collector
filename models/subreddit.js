const mongoose = require('mongoose');

let SubredditSchema = mongoose.Schema({
  name:           {type: String}
})

let Subreddit = module.exports = mongoose.model('subreddits', SubredditSchema)
