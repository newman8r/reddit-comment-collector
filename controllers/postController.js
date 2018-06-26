const Submission = require('../models').Submission;

const savePosts = async function(posts){
console.log('saving posts');
Submission.collection.insertMany(posts, {upsert: true, ordered: false}, function(err, docs){
  if(err){console.log(err)}

})

}

module.exports.savePosts = savePosts

const getPosts = async function(callback){
console.log('getting posts')
// TODO: figure out how far back to look for posts.. maybe 24 hours?
Submission.find(function(err, posts){
  if(err){console.log(err)}
  let now = new Date().getTime();
  Submission.updateMany({},{"lastCrawl" : now})
  callback(posts);
})

}

module.exports.getPosts = getPosts
