const ready = function(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    // DOMContentLoaded already fired
    callback();
  }
};

const removeChildren = function(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
};

const setAttributes = function(el, attributesObj) {
  if (!attributesObj) return;
  Object.entries(attributesObj).forEach((attr) => {
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    el.setAttribute(...attr);
  });
};

const setTextOrValue = function(el, textOrValue) {
  if (typeof textOrValue === 'undefined') return;
  if (el.hasAttribute('value')) {
    el.value = textOrValue;
  } else {
    el.innerText = textOrValue;
  }
};

const createElement = function(tagName) {
  // 注意：この関数("createElement")は無名関数を返す
  return function(content = '', attributesObj = {}) {
    // 無名関数が後ほど呼ばれる時点では"tagName"という変数はまだアクセスできます
    // 参照：https://developer.mozilla.org/ja/docs/Web/JavaScript/Closures
    const el = document.createElement(tagName);
    setTextOrValue(el, content);
    setAttributes(el, attributesObj);
    return el;
  };
};

const createDiv = createElement('DIV');
const createH3 = createElement('H3');
const createInput = createElement('INPUT');
const createLabel = createElement('LABEL');

export {
  createDiv,
  createH3,
  createInput,
  createLabel,
  ready,
  removeChildren,
};
