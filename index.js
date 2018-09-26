const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const { quizData } = require('./data/quiz-data');
const { calculateBestMatch } = require('./compatibility-calculator');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

app.get('/quiz-data', (req, res) => {
  res.json(quizData);
});

app.post('/best-match', (req, res) => {
  const bestMatch = calculateBestMatch(req.body.quizSubmissions);
  res.json(bestMatch);
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}...`);
});
