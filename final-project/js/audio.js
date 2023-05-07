var audio = document.getElementById("myAudio");
var progressBar = document.getElementById("progressBar");
var currentTime = document.getElementById("currentTime");
var duration = document.getElementById("duration");

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

audio.addEventListener("timeupdate", function() {
  var progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progress + "%";
  currentTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", function() {
  duration.textContent = formatTime(audio.duration);
});

function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
