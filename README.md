# reddit-comment-collector
collect reddit comments and store them in a mongo database
Run npm install to install dependencies

Create a collection in mongo titled 'subreddits' and populate it with documents - one for each subreddit to crawl. The documents have a single property, 'name' and the value should be a subredd name (unprefixed, so if you want to crawl the news subreddit, use the name *news* and not */r/news*

use npm start command to begin crawling
