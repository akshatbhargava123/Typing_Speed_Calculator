const possibleChars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.!?'" ()`;
const timer = new Timer(50);

function toggleSpanHighlight(index = 0) {
  document.querySelectorAll('span').forEach((span, i) => {
    if (i == index) span.classList.add('highlight');
    else span.classList.remove('highlight');
  });
}

function addText(text) {
  const textNode = document.querySelector('#root-text-node');
  // const charAr = text.split(' ');

  const spans = text.reduce((prevVal, curVal) => {
    return prevVal + `<span>${curVal}</span> `;
  }, '');

  textNode.innerHTML = spans;
}

let textToType = `Hi friend How are you Wanna meet someday`.split(' ');
addText(textToType);
toggleSpanHighlight();

const inputElem = document.querySelector('input');
let currentIndex = 0;
let totalWords = 0;
let stopTimeout;

function timeStartedListener(){
  console.log('timer started');
  timer.start();
  stopTimeout = setTimeout(stop, 60 * 1000);
  inputElem.removeEventListener('input', timeStartedListener);
};

function stop() {
  const totalTime = timer.stop();
  clearTimeout(stopTimeout);
  console.log(totalWords)
}

inputElem.addEventListener('input', timeStartedListener);

inputElem.onkeyup = (e) => {
  let { value } = e.target;
  const targetedWord = textToType[currentIndex];
  if (!value || !targetedWord) return;
  value = value.slice(0, value.length - 1);
  if (e.key == ' ') {
    totalWords++;
    if (value == targetedWord) {
      document.querySelectorAll('span')[currentIndex].classList.add('correct');
    } else {
      document.querySelectorAll('span')[currentIndex].classList.add('wrong');
    }

    toggleSpanHighlight(++currentIndex);
    
    if (currentIndex == textToType.length - 2) {
      textToType = textToType.concat(textToType);
      addText(textToType)
    }
    inputElem.placeholder = '';
    return inputElem.value = '';
  } else if (value.length >= targetedWord.length) {
    document.querySelectorAll('span')[currentIndex].classList.add('wrong');
  }
}