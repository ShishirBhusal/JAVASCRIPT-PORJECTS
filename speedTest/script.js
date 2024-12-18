/*
 * The animation at the start, made from my previous pen
 * https://codepen.io/EightArmsHQ/pen/HJsav
 */

// The base speed per character
time_setting = 30;
// How much to 'sway' (random * this-many-milliseconds)
random_setting = 100;
// The text to use NB use n not real life line breaks!
input_text = "How fast can you type?";
// Where to fill up
target_setting = document.querySelector("#output");
// Launch that function!
type(input_text, target_setting, 0, time_setting, random_setting);

function type(input, target, current, time, random) {
  // If the current count is larger than the length of the string, then for goodness sake, stop
  
  if (current > input.length) {
    // Write Complete
    console.log("Complete.");
  }
  else {
    // console.log(current)
    // Increment the marker
    current += 1;
    // fill the target with a substring, from the 0th character to the current one
    target.innerText = input.substring(0, current);
    // Wait ...
    setTimeout(function () {
      // do the function again, with the newly incremented marker
      type(input, target, current, time, random);
      // Time it the normal time, plus a random amount of sway
    }, time + Math.random() * random);
  }
}

/*
 * The typing test stuff
 */

var character_length = 31;
var index = 0;
var letters = document.querySelector("#input_text").value;
var started = false;
var current_string = letters.substring(index, index + character_length);

var wordcount = 0;

document.querySelector("html, body").onclick = () => {
  document.querySelector("textarea").focus();
};

document.querySelector("#target").innerText = (current_string);
(window).addEventListener('keypress',function (evt) {
  if (!started) {
    start();
    started = true;
  }
  evt = evt || window.event;
  var charCode = evt.which || evt.keyCode;
  var charTyped = String.fromCharCode(charCode);
  if (charTyped == letters.charAt(index)) {
    if (charTyped == " ") {
      wordcount++;
      document.querySelector("#wordcount").innerText = (wordcount);
    }
    index++;
    current_string = letters.substring(index, index + character_length);
    document.querySelector("#target").innerText = (current_string);
    document.querySelector("#your-attempt").insertAdjacentHTML("beforeend", charTyped);
    if (index == letters.length) {
      wordcount++;
      document.querySelector("#wordcount").innerText = (wordcount);
      document.querySelector("#timer").innerText = (timer);
      if (timer == 0) {
        timer = 1;
      }
      wpm = Math.round(wordcount / (timer / 60));
      document.querySelector("#wpm").innerText = (wpm);
      stop();
      finished();
    }
  } else {
    document.querySelector("#your-attempt").insertAdjacentHTML("beforeend", "<span class='wrong'>" + charTyped + "</span>");
    errors++;
    document.querySelector("#errors").innerText = (errors);
  }
});

var timer = 0;
var wpm = 0;
var errors = 0;
var interval_timer;

document.querySelector("#reset").onclick = () => {
  console.log("reset clicked!!")
  reset();
};

document.querySelector("#change").onclick = () => {
  document.querySelector("#input_text").focus()
  document.querySelector("#input_text").style.display = "block"
};

document.querySelector("#pause").onclick = () => {
  stop();
};

document.querySelector("#input_text").addEventListener("change",function () {
  reset();
  document.querySelector("#input_text").style.display = "none"

});

function start() {
  interval_timer = setInterval(function () {
    timer++;
    document.querySelector("#timer").innerText = (timer);
    wpm = Math.round(wordcount / (timer / 60));
    document.querySelector("#wpm").innerText = (wpm);
  }, 1000)
}

function stop() {
  clearInterval(interval_timer);
  started = false;
}

function reset() {
  document.querySelector("#input_text").blur();
  document.querySelector("#your-attempt").innerText = ("");
  index = 0;
  errors = 0;
  clearInterval(interval_timer);
  started = false;
  letters = document.querySelector("#input_text").value;
  document.querySelector("#wpm").innerText = ("0");
  document.querySelector("#timer").innerText = ("0");
  document.querySelector("#wordcount").innerText = ("0");
  timer = 0;
  wpm = 0;
  current_string = letters.substring(index, index + character_length);
  document.querySelector("#target").innerText = (current_string);
}

function finished() {
  alert("Congratulations\nWords per minute: " + wpm + "\nWordcount: " + wordcount + "\nErrors:" + errors);
}

var window_focus;

(window).onfocus = () => {
  window_focus = true;
}
window.blur(function () {
  window_focus = false;
});

// (document).readyState = () => {
//   if (window_focus) {
//     document.querySelector("#focus").hide()
//   }
//   (window).onfocus(function () {
//     document.querySelector("#focus").hide();
//   });
// };