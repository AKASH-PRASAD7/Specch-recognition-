(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
document.getElementById("Record").onclick = GetSpeech;
document.getElementById("genrate").onclick = Genrate;
const text = document.getElementById("text");
function GetSpeech() {
  console.log("clicked microphone");
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = new SpeechRecognition();
  recognition.onstart = () => {
    console.log("starting listening, speak in microphone");
  };
  recognition.onspeechend = () => {
    console.log("stopped listening");
    recognition.stop();
  };
  recognition.onresult = (result) => {
    document.getElementById("text").value = result.results[0][0].transcript;
    var speech = result.results[0][0].transcript;
  };

  recognition.start();
}

function Genrate() {
  const data = text.value;
  fetch("/", {
    method: "POST",
    body: JSON.stringify({
      data: data,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

},{}]},{},[1]);
