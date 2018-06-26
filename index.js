const { Observable, Subject, interval, ReplaySubject, from, of, range } = require('rxjs');
var redditController = require('./controllers/redditController');
require('./config/config');
var commentsController = require('./controllers/commentsController');
var postController = require('./controllers/postController');
var subredditController = require('./controllers/subredditController')

console.log(`environment: ${CONFIG.app}`);


const handleComments = function(comments){
//console.log(comments);
commentsController.saveComments(comments)
}

const handlePosts = function(posts){
  console.log('handling posts');
postController.savePosts(posts)
}

const processSubreddits = function(subreddits){
  const source = interval(2000);
  const sub = source.subscribe(x => {
    if(subreddits.length > 0){
      console.log('requesting...');
    redditController.grabSubreddit(subreddits.pop().name, handlePosts)
  }else{
    console.log('done, unsubscribing')
    sub.unsubscribe();
    // trigger the comment processing
    phase2()
  }
  });
}

const logItems = function(items){
  console.log(items)
}

function processPosts(posts){

  // get a list of the posts

  const source = interval(2000);
  const sub = source.subscribe(x => {
    if(posts.length > 0){
      console.log(`crawling a page for comments, page ${x}`);
    redditController.grabPage(posts.pop().permalink, handleComments)
  }else{
    console.log('done crawling comments')
    sub.unsubscribe();
  }

  })
}

function phase1(){ // get the posts from the subreddits
subredditController.getSubreddits(processSubreddits)
}

function phase2(){// get the comments from the posts
console.log('starting phase 2');
// get a list of posts to crawl

postController.getPosts(processPosts)
}


// start the crawler
phase1()



//redditController.grabPage('/r/Entrepreneur/comments/8tpi04/how_to_focus/',handleComments);

//redditController.grabSubreddit('the_donald', handlePosts)
