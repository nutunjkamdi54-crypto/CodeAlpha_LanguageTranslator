const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const swapBtn = document.getElementById("swapBtn");
const micBtn = document.getElementById("micBtn");

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

/* =========================
   Translation
========================= */

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    const src =
    document.getElementById("sourceLang").value;

    const dest =
    document.getElementById("targetLang").value;

    if(text === ""){
        showToast("Please enter text!");
        return;
    }

    /* Loading State */
    translateBtn.innerHTML = "Translating...";

    try{

        const response = await fetch("/translate", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                text,
                src,
                dest
            })
        });

        const data = await response.json();

        outputText.value =
        data.translated_text;

    }catch(error){

        showToast("Translation Failed!");

        console.log(error);
    }

    translateBtn.innerHTML = "Translate";
});

/* =========================
   Copy Text
========================= */

copyBtn.addEventListener("click", () => {

    if(outputText.value.trim() === ""){
        showToast("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(outputText.value);

    showToast("Copied Successfully!");
});

/* =========================
   Clear Text
========================= */

clearBtn.addEventListener("click", () => {

    inputText.value = "";
    outputText.value = "";

    showToast("Cleared!");
});

/* =========================
   Swap Languages
========================= */

swapBtn.addEventListener("click", () => {

    const src =
    document.getElementById("sourceLang");

    const dest =
    document.getElementById("targetLang");

    let temp = src.value;

    src.value = dest.value;

    dest.value = temp;

    /* Swap Text */

    let tempText = inputText.value;

    inputText.value = outputText.value;

    outputText.value = tempText;
});

/* =========================
   Voice Input
========================= */

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = false;

recognition.lang = "en-US";

recognition.interimResults = false;

micBtn.addEventListener("click", () => {

    recognition.start();

    micBtn.classList.add("listening");

    showToast("Listening...");
});

recognition.onresult = (event) => {

    const transcript =
    event.results[0][0].transcript;

    inputText.value = transcript;
};

recognition.onend = () => {

    micBtn.classList.remove("listening");
};

/* =========================
   Text To Speech
========================= */

outputText.addEventListener("dblclick", () => {

    if(outputText.value.trim() === ""){
        return;
    }

    const speech =
    new SpeechSynthesisUtterance(outputText.value);

    speech.lang =
    document.getElementById("targetLang").value;

    window.speechSynthesis.speak(speech);

    showToast("Speaking...");
});

/* =========================
   Auto Resize Textareas
========================= */

[inputText, outputText].forEach((textarea) => {

    textarea.addEventListener("input", () => {

        textarea.style.height = "auto";

        textarea.style.height =
        textarea.scrollHeight + "px";
    });
});

/* =========================
   Toast Notification
========================= */

function showToast(message){

    const toast =
    document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";

    toast.style.bottom = "30px";

    toast.style.right = "30px";

    toast.style.background =
    "rgba(0,0,0,0.8)";

    toast.style.color = "white";

    toast.style.padding = "14px 20px";

    toast.style.borderRadius = "12px";

    toast.style.zIndex = "999";

    toast.style.boxShadow =
    "0 0 10px #00ffff";

    toast.style.backdropFilter =
    "blur(10px)";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}