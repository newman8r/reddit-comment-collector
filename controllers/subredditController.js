const Subreddit = require('../models').Subreddit;


const getSubreddits = async function(callback){

Subreddit.find(function(err, subs){
  if(err){console.log(err)}

  callback(subs)

})

}

module.exports.getSubreddits = getSubreddits
