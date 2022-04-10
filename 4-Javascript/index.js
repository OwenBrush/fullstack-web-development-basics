var clock = document.getElementById('clock');

function updateClock() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  var noon = 'AM'
  if (h > 12) {
    noon = 'PM'
    h-=12
  }
  clock.textContent = 
    ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2) + " " + noon;
}

updateClock()
setInterval(updateClock, 1000);