const startBtn = document.getElementById("start-recording");
const transcription = document.getElementById("transcription");
const output = document.getElementById("output");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("⚠️ Tu navegador no soporta Web Speech API. Usa Google Chrome en escritorio.");
  startBtn.disabled = true;
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "es-MX";
  recognition.interimResults = false;

  startBtn.onclick = () => {
    output.textContent = "";
    transcription.value = "";
    recognition.start();
  };

  recognition.onstart = () => {
    startBtn.textContent = "🎙️ Escuchando...";
  };

  recognition.onend = () => {
    startBtn.textContent = "🎙️ Dictar requerimiento";
  };

  recognition.onerror = (event) => {
    alert("❌ Error al capturar voz: " + event.error);
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    transcription.value = text;
  };

  document.getElementById("generate").onclick = () => {
    const text = transcription.value.trim();

    if (!text) {
      output.textContent = "⚠️ No hay texto transcrito.";
      return;
    }

    let como = "Usuario del sistema";
    let quiero = text;
    let para = "Mejorar el proceso actual";

    const comoMatch = text.match(/como (.*?)(?= quiero| para|$)/i);
    const quieroMatch = text.match(/quiero (.*?)(?= para| como|$)/i);
    const paraMatch = text.match(/para (.*?)(?= como| quiero|$)/i);

    if (comoMatch) como = comoMatch[1].trim();
    if (quieroMatch) quiero = quieroMatch[1].trim();
    if (paraMatch) para = paraMatch[1].trim();

    const plantilla = `COMO\n${como}\n\nQUIERO\n${quiero}\n\nPARA\n${para}`;
    output.textContent = plantilla;
  };
}