import {
  fetchQuizData,
  fetchBestMatch,
} from './api-client.js';
import { QUIZ_MODES } from './constants.js';
import QuizRenderer from './quiz-renderer.js';

class QuizManager {
  constructor() {
    this.currentMode = null;
    this.questionList = null;
    this.submissions = [];
    this.quizRenderer = new QuizRenderer();
  }

  generateCompatibilityReport() {
    this.currentMode = QUIZ_MODES.REPORTING;
    fetchBestMatch(this.submissions)
      .then((bestMatch) => {
        this.quizRenderer.renderQuizModePane(this.currentMode);
        this.quizRenderer.renderCompatibilityReport(bestMatch);
      });
  }

  transitionNextStep() {
    this.currentQuestionIndex += 1;
    const questionData = this.questionList[this.currentQuestionIndex];

    if (!questionData) {
      this.generateCompatibilityReport();
    } else {
      this.quizRenderer.renderQuestion(questionData);
    }
  }

  handleQuestionSubmission(submission) {
    this.submissions.push(submission);
    this.transitionNextStep();
  }

  resetQuiz() {
    this.currentMode = QUIZ_MODES.QUIZZING;
    this.currentQuestionIndex = -1;
    this.transitionNextStep();
    this.quizRenderer.renderQuizModePane(this.currentMode);
  }

  init() {
    fetchQuizData()
      .then((responsePayload) => {
        this.questionList = responsePayload.questionList;
      })
      .then(() => {
        this.quizRenderer.init(this.handleQuestionSubmission.bind(this));
        this.resetQuiz();
      });
  }
}

export default QuizManager;
