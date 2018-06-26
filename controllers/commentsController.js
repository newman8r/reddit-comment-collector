const Comment = require('../models').Comment

const saveComments = async function(comments){
if(comments.length > 0){
  console.log('saving comments')
  console.log(comments)
  Comment.collection.insertMany(comments, {upsert: true, ordered: false}, function(err, docs){
    if (err){console.log(err)}

  })

}else{
  console.log("no comments")
}

}


module.exports.saveComments = saveComments
