const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartChangeBodyColorClick);

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timeId);
  startBtnDisabled(false);
  stopBtnDisabled(true);
});

function onStartChangeBodyColorClick() {
  startBtnDisabled(true);
  timeId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  stopBtnDisabled(false);
}

function startBtnDisabled(boolean) {
  refs.startBtn.disabled = boolean;
}

function stopBtnDisabled(boolean) {
  refs.stopBtn.disabled = boolean;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
