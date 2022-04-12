// Clock

var clock = document.getElementById('clock');

function updateClock() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  var noon = 'AM';
  if (h > 12) {
    noon = 'PM';
    h-=12;
  }
  clock.textContent = 
    ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2) + " " + noon;
}

function updateColor(color) {

}

updateClock()
setInterval(updateClock, 1000);

// Colour Picker

var colorInput;
var defaultColor = "#1979B3";

addEventListener("load", startup, false);

function startup() {
  colorInput = document.querySelector("#colorInput");
  colorInput.value = defaultColor;
  colorInput.addEventListener("input", colorInputChange, false);
  colorInput.select();
  updateColor(colorInput.value)
}

function colorInputChange(event){
  updateColor(event.target.value);
}
function updateColor(color) {
  var primary_color = color
  var primary_text_color  = getTextColor(primary_color, 80)
  var secondary_color = getComplimentColor(primary_color);
  var secondary_text_color  = getTextColor(secondary_color, 20)

  primary_elements = document.getElementsByClassName("primary")
  for (var i = 0; i < primary_elements.length; i++){
    primary_elements[i].style.backgroundColor = primary_color;
    primary_elements[i].style.color = primary_text_color;
  }

  secondary_elements = document.getElementsByClassName("secondary")
  for (var i = 0; i < secondary_elements.length; i++){
    secondary_elements[i].style.backgroundColor = secondary_color;
    secondary_elements[i].style.color = secondary_text_color;
  }

  
}

function getTextColor(hex, pivot){
  hsl = HEXtoHSL(hex);
  var h = 0;
  var s = 0;
  var l = pivot + (pivot - hsl.l);
  return HSLtoHEX(h,s,l);
}

function getComplimentColor(hex){
  hsl = HEXtoHSL(hex);
  if (hsl.h == 0){
    var h = 0;
  }
  else if (hsl.h >= 180){
    var h = hsl.h - 180;
  }
  else{
    var h = hsl.h + 180;
  }
  var s = 50 + (50 - hsl.s);
  var l = 50 + (50 - hsl.l);
  return HSLtoHEX(h,s,l);
}


// Conversion scripts copied from: https://www.html-code-generator.com/javascript/color-converter-script

function HEXtoHSL(hex) {
  hex = hex.replace(/#/g, '');
  if (hex.length === 3) {
      hex = hex.split('').map(function (hex) {
          return hex + hex;
      }).join('');
  }
  var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
  if (!result) {
      return null;
  }
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if (max == min) {
      h = s = 0;
  } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
      case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
      case g:
          h = (b - r) / d + 2;
          break;
      case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
  }
  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return {
      h: h,
      s: s,
      l: l
  };
}


function HSLtoHEX(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  var r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = function(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = function(x) {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#'+toHex(r)+toHex(g)+toHex(b);
}