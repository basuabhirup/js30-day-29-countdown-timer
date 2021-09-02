const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

let countdown;

function timer(seconds) {
  const now = (new Date()).getTime(); // Date.now() → mordern syntax to get current timestamp in miliseconds
  const then = now + 1000 * seconds; // As now is in miliseconds
  clearInterval(countdown);
  displayTime(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
        const secondsLeft = Math.floor((then - Date.now()) / 1000) + 1;
        if(secondsLeft <= 0){
          clearInterval(countdown)
        }
        displayTime(secondsLeft);
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
  const hrs = end.getHours();
  const mins = twoDigit(end.getMinutes());
  const amOrPm = hrs > 12 ? 'pm' : 'am';

  const endTimeString = `${hrs % 12}:${mins}${amOrPm}`;
  endTime.textContent = `Timer ends at ${endTimeString}`;
}
