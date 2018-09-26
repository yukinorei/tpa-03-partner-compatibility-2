const post = function(url, data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  };
  return fetch(url, options);
};

const fetchQuizData = function() {
  return fetch('/quiz-data')
    .then(response => response.json());
};

const fetchBestMatch = function(quizSubmissions) {
  return post('/best-match', { quizSubmissions })
    .then(response => response.json());
};

export {
  fetchQuizData,
  fetchBestMatch,
};
