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
