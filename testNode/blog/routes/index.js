
/*
 * GET home page.
 */
var ArticleProvider = require('../articleprovider-memory.js').ArticleProvider;
exports.index = function(req, res){
  //res.render('index', { title: 'Express' });
  var articleProvider = new ArticleProvider();
  articleProvider.findAll(function(error,docs){
      console.log(docs)
      res.render('index.jade',
      {
          title: 'Blog',
          articles:docs
      }
      );
  });
}