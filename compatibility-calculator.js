const { candidates } = require('./data/candidates-data.js');

const calculateBestMatch = function(quizSubmissions) {

  // TODO: replace this...
  return candidates[0];

  // TODO: implement the following algorithm for
  // calculating the candidate who is the best match for you

  // set closest match to 1st candidate

  // for each candidate
  //  for each question
  //    if question values are exactly the same
  //      add 2 points
  //    if question values are one score away
  //      add 1 point
  //  update the closest match

  // for ties, the last person who has the highest score is returned

  // return closest match
};

module.exports = {
  calculateBestMatch,
};
