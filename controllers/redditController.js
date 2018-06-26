var request = require('request');

let postObject = {};

const grabPage = async function(permalink, callback){

  request(`https://www.reddit.com${permalink}.json`,
   { json: true }, (err, res, body) => {

  	if (err) { return console.log(err); }

  	console.log(body);
if(body && body[0].data){
  // extract all the comments into a flat json object
  postObject = body[0].data.children[0].data;
  let topLevelComments = body[1].data.children.filter(x => x.kind == "t1");
  let comments = [];

  //console.log(topLevelComments)

  while(topLevelComments.length > 0){ // process until empty
    if(typeof topLevelComments[0].data.replies == 'string'){ // if the comment has no replies, shift it to the comments array
      comments.push(topLevelComments.shift())
    }else{ // if the comment has replies
      if(!topLevelComments[0].data.replies){

      topLevelComments.shift();
      }else{

      topLevelComments.push(...topLevelComments[0].data.replies.data.children); // extract the replies and push them to the array for further processing
      topLevelComments[0].data.replies = ""; // empty the replies object
      }
    }
  }

  //console.log(comments.map(mapComments));
  callback(comments.map(mapComments))
}else{
  console.log('body error');
}


  	});

}

module.exports.grabPage = grabPage

const grabSubreddit = function(subreddit, callback){


  request(`https://www.reddit.com/r/${subreddit}/.json?limit=100`,
   { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    if(body && body.data){

      let topListings = body.data.children;
      callback(topListings.map(mapPost))
    }else{
      console.log(`subreddit crawl error for ${subreddit}`)
    }

    });

}

module.exports.grabSubreddit = grabSubreddit;

function mapComments(comment){// only return the useful parts of the comment in a new object
let returnComment = {};
returnComment.body = comment.data.body;
returnComment.author = comment.data.author;
returnComment.subreddit = comment.data.subreddit;
returnComment.permalink = comment.data.permalink;
returnComment.date = comment.data.created_utc;
returnComment.submissionLink = postObject.permalink;
returnComment.submissionTitle = postObject.title;
return returnComment
}

function mapPost(post){
let returnPost = {};
returnPost.permalink = post.data.permalink;
returnPost.title = post.data.title;
returnPost.text = post.data.selftext;
returnPost.url = post.data.url;
returnPost.subreddit = post.data.subreddit;
returnPost.created = post.data.created_utc;
returnPost.lastCrawl = new Date(new Date().getTime() - (3600*24*1000));
return returnPost
}
