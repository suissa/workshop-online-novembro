
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Workshop Be MEAN', professor: 'Suissa' });
};