const btn = document.querySelector('.talk')
const content = document.querySelector('.content')


function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good Morning Boss...")
    }

    else if(hour>12 && hour<17){
        speak("Good Afternoon Master...")
    }

    else{
        speak("Good Evenining Sir...")
    }

}

window.addEventListener('load', ()=>{
    speak("Initializing JARVIS..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition =  new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...."
    recognition.start();
})

function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Sir, How May I Help You?");
    }
    
    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...")
    }
    else if(message.includes("who is your boss")){
        speak("my boss is mister shivam shukla");
    }
    
    else if(message.includes("open youtube")){
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...")
    }
    else if(message.includes("open facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...")
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
	    speak(finalText);
  
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }

    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
   
}




document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const assistantOutput = document.getElementById("assistant-output");
  
    // Respond to user commands
const respond = (command) => {
    command = command.toLowerCase();
    let response = "";
  
    if (command.includes("hello") || command.includes("hi")) {
        response = "Hello! How can I assist you today?";
    } else if (command.includes("time")) {
        const now = new Date();
        response = `The current time is ${now.toLocaleTimeString()}.`;
    } else if (command.includes("date")) {
        const today = new Date();
        response = `Today's date is ${today.toLocaleDateString()}.`;
    } else if (command.includes("google")) {
        const searchQuery = command.replace("google", "").trim();
        window.open(`https://www.google.com/search?q=${searchQuery}`);
        response = "Opening Google...";
    }else if (command.includes("youtube")) {
        const searchQuery = command.replace("google", "").trim();
        window.open(`https://youtube.com/search?q=${searchQuery}`);
        response = "Opening youtube...";
    }else if (command.includes("open facebook")) {
        window.open("https://www.facebook.com", "_blank");
        response = "Opening Facebook...";
      } else if (command.includes("open twitter")) {
        window.open("https://www.twitter.com", "_blank");
        response = "Opening Twitter...";
      } else if (command.includes("open instagram")) {
        window.open("https://www.instagram.com", "_blank");
        response = "Opening Instagram...";
      } else if (command.includes("open youtube")) {
        window.open("https://www.youtube.com", "_blank");
        response = "Opening YouTube...";
      } else if (command.includes("open email") || command.includes("open gmail")) {
        window.open("https://mail.google.com", "_blank");
        response = "Opening Email...";
      }else if (command.includes("calculate")) {
        try {
          const expression = command.replace("calculate", "").trim();
        response = `The result is ${eval(expression)}.`;
    } catch {
        response = "I couldn't calculate that. Please try again.";
    }
    } else if (command.includes("weather")) {
        response = "Fetching weather details... (Integrate an API for this!)";
    } else {
    response = "Sorry, I don't understand that command.";
    }
  
    return response;
};
  
// Handle user input
const handleInput = () => {
    const command = userInput.value.trim();
    if (command) {
    const response = respond(command);
    assistantOutput.innerHTML = `<p>User: ${command}</p><p>Jarvis: ${response}</p>`;
    userInput.value = "";
    }
};
  
// Add event listeners
sendBtn.addEventListener("click", handleInput);
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleInput();
    }
});
});
  