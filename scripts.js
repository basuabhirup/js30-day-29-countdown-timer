const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('.timer__button');

let countdown;

function timer(seconds) {
  clearInterval(countdown); // clear any existing timers
  const now = (new Date()).getTime(); // Date.now() → mordern syntax to get current timestamp in miliseconds
  const then = now + 1000 * seconds; // As now is in miliseconds
  displayTime(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
        const secondsLeft = Math.floor((then - Date.now()) / 1000) + 1;
        if(secondsLeft >= 1){          
          displayTime(secondsLeft);
        } else {
          clearInterval(countdown);
          displayTime(0);
        }
  }, 1000)
}

function twoDigit(x) {
  return x >= 10 ? x : `0${x}`
}

function displayTime(seconds) {
  let secs  = seconds % 60;
  let mins = seconds >= 60 ? Math.floor(seconds / 60) % 60 : 00;
  let display;
  secs = twoDigit(secs);
  mins = twoDigit(mins);

  if(seconds >= 3600) {
    const hrs = Math.floor(seconds / 3600);
    display = (`${hrs}:${mins}:${secs}`);
  } else {
    display = (`${mins}:${secs}`);
  }
  timeLeft.textContent = display;
  document.title = display;
}

function displayEndTime(then) {
  const end = new Date(then);
  const hrs = end.getHours() > 12 ? twoDigit(end.getHours() - 12) : twoDigit(end.getHours());
  const mins = twoDigit(end.getMinutes());
  const amOrPm = end.getHours() >= 12 ? 'pm' : 'am';

  endTime.textContent = `Timer ends at ${hrs}:${mins}${amOrPm}`;
}


timerButtons.forEach(button => button.addEventListener('click', function() {
  timer(this.dataset.time);
}));

document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.reset();
});
