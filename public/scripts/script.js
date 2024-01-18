const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();

recognition.lang = "en-US";
recognition.interimResults = false;

// haha every time i see button, it reminds me of Jensen Button (F1 driver).
const jensenButton = document.querySelector("button").addEventListener("click", () => {
   recognition.start();
});

recognition.addEventListener("result", (event) => {
   let last = event.results.length - 1;
   let text = event.results[last][0].transcript;
   console.log("Confidence: " + event.results[0][0].confidence);
});
