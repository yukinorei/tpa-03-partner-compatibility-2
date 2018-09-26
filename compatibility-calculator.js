const { candidates } = require('./data/candidates-data.js');

const calculateScore = (candidateValue, submissionValue) => {
  if (candidateValue === submissionValue) {
    return 2;
  } else if ((candidateValue + 1 === submissionValue) || (candidateValue - 1 === submissionValue)) {
    return 1;
  }
  return 0;
};

const calculateBestMatch = function(quizSubmissions) {
  let bestMatch = candidates[0];
  let bestMatchScore = 0;

  candidates.forEach((candidate) => {
    let candidateScore = 0;

    candidate.forEach((questionGroup, g) => {
      questionGroup.forEach((question, q) => {
        console.log(question);
        if (question.name.startsWith('question')) {
          const submission = quizSubmissions[g][q];
          const candidateValue = parseInt(question.value);
          const submissionValue = parseInt(submission.value);

          candidateScore += calculateScore(candidateValue, submissionValue);
        }
      });
    });

    if (candidateScore >= bestMatchScore) {
      bestMatch = candidate;
      bestMatchScore = candidateScore;
    }
  });

  return bestMatch;
};
module.exports = {
  calculateBestMatch,
  calculateScore,
};
