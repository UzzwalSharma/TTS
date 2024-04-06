const speakButton = document.getElementById('speakButton');
const textInput = document.getElementById('textInput');
const msg = new SpeechSynthesisUtterance();

msg.rate = 0.85; // Speed of speech
msg.pitch = 1;

// Store retrieved voices
let voices = [];

// Get reference to the select element
const voiceSelect = document.getElementById('voiceSelect');

// Function to populate the select element with available voices
function populateVoiceList() {
    // Retrieve list of available voices
    voices = speechSynthesis.getVoices();

    // Clear existing options
    voiceSelect.innerHTML = '';

    // Loop through each voice and create an option element for it
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = voice.name;
        option.setAttribute('value', index);
        voiceSelect.appendChild(option);
    });
}

// Populate voice list when the voices are loaded initially
populateVoiceList();

// Listen for voiceschanged event to repopulate the list if voices change
if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Event listener for voice selection change
voiceSelect.addEventListener('change', () => {
    // Set the selected voice
    msg.voice = voices[voiceSelect.value];
});

// Event listener for speak button click
speakButton.addEventListener('click', () => {
    msg.text = textInput.value;
    speechSynthesis.speak(msg);
});
