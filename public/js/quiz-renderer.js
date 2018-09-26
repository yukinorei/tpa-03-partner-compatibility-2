import {
  createDiv,
  createH3,
  createInput,
  createLabel,
  ready,
  removeChildren,
} from './dom-utils.js';
import { QUIZ_MODES } from './constants.js';

class QuizRenderer {
  constructor() {
    this.formEl = null;
    this.fieldSetEl = null;
    this.resultsBoxEl = null;
    this.submitCallback = null;

    this.questionTypeRenderers = {
      'text': this.renderTextQuestionType.bind(this),
      'email': this.renderTextQuestionType.bind(this),
      'stack-rank': this.renderStackRankQuestionType.bind(this)
    };

    this.modePanes = {};
  }

  initDOMReferencesAndListeners() {
    this.formEl = document.querySelector('.form-quiz');
    this.fieldSetEl = this.formEl.querySelector('fieldset');
    this.resultsBoxEl = document.querySelector('.results');

    this.modePanes[QUIZ_MODES.QUIZZING] = document.querySelector('.mode-pane-quizzing');
    this.modePanes[QUIZ_MODES.REPORTING] = document.querySelector('.mode-pane-reporting');

    document.querySelector('.form-quiz')
      .addEventListener('submit', this.handleQuizFormSubmit.bind(this));
  }

  clearFormFields() {
    removeChildren(this.fieldSetEl);
  }

  renderQuizModePane(quizMode) {
    if (quizMode === QUIZ_MODES.QUIZZING) {
      this.modePanes[QUIZ_MODES.QUIZZING].style.display = 'block';
      this.modePanes[QUIZ_MODES.REPORTING].style.display = 'none';
    } else {
      this.modePanes[QUIZ_MODES.QUIZZING].style.display = 'none';
      this.modePanes[QUIZ_MODES.REPORTING].style.display = 'block';
    }
  }

  renderCompatibilityReport(bestMatch) {
    // this data shape is ugly! refactor it :) 
    const matchName = bestMatch[0][0].value;
    const h3 = createH3(matchName);
    this.resultsBoxEl.appendChild(h3);
  }

  /*
    E.g.,
    <fieldset>
      <h3 class="prompt">Your name (in romaji)</h3>
    </fieldset>
  */
  renderPrompt(prompt) {
    const promptEl = createH3(prompt);
    this.fieldSetEl.appendChild(promptEl);
  }

  /*
    E.g.,
    <input type="text"
           required="required"
           pattern="[a-zA-Z -]+"
           title="ローマ字でお名前を入力してください">
  */
  createSingleInput(inputData) {
    const {
      customAttrs,
      id,
      required,
      text,
      type,
      validationType,
      validationHint,
      validationPattern,
    } = inputData;

    const attrs = {
      'name': id,
      'type': type,
      'required': required,
    };

    if (customAttrs) {
      Object.assign(attrs, customAttrs);
    }

    if (validationType === 'regex') {
      attrs.pattern = validationPattern;
      attrs.title = validationHint;
    }

    return createInput(text, attrs);
  }

  /*
    E.g.,
    <div>
      <input type="number" required="required" min="1" max="4">
      <label>お笑いコメディアン</label>
    </div>
  */
  renderLabelledInput(inputData) {
    const dividerEl = createDiv();
    const inputEl = this.createSingleInput(inputData);
    const labelEl = createLabel(inputData.text);
    dividerEl.appendChild(inputEl);
    dividerEl.appendChild(labelEl);
    this.fieldSetEl.appendChild(dividerEl);
  }

  renderQuestion(questionData) {
    this.clearFormFields();
    this.questionTypeRenderers[questionData.type](questionData);
    this.fieldSetEl.querySelector('INPUT').focus();
  }

  renderTextQuestionType(questionData) {
    this.renderPrompt(questionData.prompt);
    const inputEl = this.createSingleInput(questionData);
    this.fieldSetEl.appendChild(inputEl);
  }

  renderStackRankQuestionType(questionData) {
    this.renderPrompt(questionData.prompt);

    questionData.answers.forEach((answerText, answerIndex) => {
      const answerId = `${questionData.id}-answer${answerIndex}`;
      this.renderLabelledInput({
        id: answerId,
        required: true,
        text: answerText,
        type: 'number',
        customAttrs: {
          // https://developer.mozilla.org/ja/docs/Web/HTML/Element/input/number#Specifying_minimum_and_maximum_values
          min: 1,
          max: 4,
        },
      });
    });
  }

  getFormInputValues() {
    // Element の querySelectorAll() メソッドは、与えられた CSS セレクターに一致する文書中
    // の要素のリストを示す静的な (生きていない) NodeList を返します。
    // 参照：https://developer.mozilla.org/ja/docs/Web/API/NodeList
    const inputEls = this.fieldSetEl.querySelectorAll('INPUT');
    return Array.from(inputEls).map(input => (
      {
        name: input.name,
        value: input.value,
      }
    ));
  }

  handleQuizFormSubmit(evt) {
    evt.preventDefault();
    const formValues = this.getFormInputValues();
    this.submitCallback(formValues);
  }

  init(submitCallback) {
    this.submitCallback = submitCallback;
    ready(this.initDOMReferencesAndListeners.bind(this));
  }
}

export default QuizRenderer;
