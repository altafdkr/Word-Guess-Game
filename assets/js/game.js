// Initialize lives array with 5 lives
var lives = 5;

// Array for All Letters Picked
var pickedLetters =[];

// Array for Good Guess
var goodGuess =[];

// Selected Letters
var badGuess =[];


// Get element div from html
var wordDiv = document.getElementById("word");
var messageDiv = document.getElementById("message");
var submessageDiv = document.getElementById("submessage");
var livesDiv = document.getElementById("lives");
var badGuessDiv = document.getElementById("badguess");
var audiobtnsDiv = document.getElementById("audiobtns");



// Set words array
var words = ["MORPHEUS", "NEO", "TRINITY", "APOC", "ORACLE", "TANK", "CYPHER", "DOZER", "MOUSE"];

// Select random word from array
var word = words[Math.floor(Math.random()*words.length)].toUpperCase();


// Get Audio Element
var playaudio = document.getElementById("playAudioFile");


// Initialize Game On Variable to make game active
var gameOn = false;

// Play Audio - On(default) and Off
var playaudiotoggle = true;




function startGame() {

    // Make Game Active
    gameOn = true;
    
    if (playaudiotoggle) {
        playAudio(); 
    }

    // Reset Word Div
    wordDiv.innerHTML = "";

    // Reset Message and submessage div
    messageDiv.innerHTML = "PICK AN ALPHABET TO START";
    submessageDiv.innerHTML = "USE YOUR KEYBOARD";

    // Number of Lives
    lives = 5;
    livesDiv.innerHTML = lives;

    // Array for All Letters Picked
    pickedLetters =[];

    // Array for Good Guess
    goodGuess =[];

    // Selected Letters
    badGuess =[];
    badGuessDiv.innerHTML = "";

    // Select random word from array
    word = words[Math.floor(Math.random()*words.length)].toUpperCase();

    // for loop to count characters and create spots for each letter
    for (i=0; i < word.length; i++) {

    // Create new element <span>
    var letter = document.createElement("span");

    // Add _ to its HTML
    letter.innerHTML += "_";

    // Set the position of the letter in the word
    letter.setAttribute("id", i);

    // Set class for the letter
    letter.setAttribute("class", "letter");

    // Get element div from html
    wordDiv = document.getElementById("word");

    // Add span for each letter in the div
    wordDiv.appendChild(letter);
    }
}


// When User presses a key
document.onkeyup = function(event) {

    if (gameOn) {

    // Check if user entered a letter (A - Z)
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        
        // Capture key pressed and make it Uppercase
        var userGuess = event.key.toUpperCase();
        
        // Check if picked letter was already guessed
        var alreadyPicked = checkAlreadyPicked(userGuess);
        
        // If already guessed, then notify user and stop.
        if (!alreadyPicked) {
            messageDiv.textContent = "Letter already picked!";
            submessageDiv.textContent = "AGENT SMITH: Never send a human to do a machine's job.";
            return;
        } 

        // Check if letter guessed is in the word
        if (word.indexOf(userGuess) < 0) {

            // CODE FOR BAD GUESS

            // Notify user they picked a wrong letter
            messageDiv.textContent = "Bad Guess!";
            submessageDiv.textContent = "AGENT SMITH: I'm going to enjoy watching you die, Mr. Anderson.";

            // Update picked letters array
            pickedLetters.push(userGuess);

            // Update bad guesses array
            badGuess.push(userGuess);

            // Append letter to Bad Guess Div
            badGuessDiv.innerHTML += userGuess;

            // Reduce life
            lives--;

            // Display updated lives
            livesDiv.innerHTML = lives;

            // Check if user has used all lives and has lost
            if (lives == 0) {
                // Notify user they lost and reset
                messageDiv.textContent = "YOU LOSE!";
                submessageDiv.innerHTML = "Correct Answer: " + word + "<br><br>MORPHEUS: Do you believe that my being stronger or faster has anything to do with my muscles in this place?<br><br><p><button class=\"btn btn-success\" onclick=\"startGame()\">Restart Game</button></p>";
                gameOn = false;
            }

        } else {

            // CODE FOR GOOD GUESS

            // Notify User they picked a correct letter
            messageDiv.textContent = "GOOD PICK!";
            submessageDiv.textContent = "Neo: What are you trying to tell me? That I can dodge bullets?";

            // Update picked letters array
            pickedLetters.push(userGuess);

            // For loop to check the position of the correctly guessed letter
            for(i=0; i < word.length; i++) {
                if (word[i] == userGuess) {

                    // Get element in HTML for the letter position
                    var letterLocation = this.getElementById(i);

                    // Update element with the letter
                    letterLocation.innerHTML = userGuess;

                    // Update picked letters array
                    pickedLetters.push(userGuess);

                    // Update good guesses array
                    goodGuess.push(userGuess);

                    // Notify user they won and reset
                    if (goodGuess.length == word.length) {
                        messageDiv.textContent = "YOU WON!";
                        submessageDiv.innerHTML = "NEO: I know you're out there. I can feel you now.<br><br><p><button class=\"btn btn-success\" onclick=\"startGame()\">Restart Game</button></p>";
                        gameOn = false;
                    } 

                }

            }  
        }


        } else {
        // Notify user they did not select a letter
        messageDiv.textContent = "Invalid Selection. Pick a Letter!";
        } 
    }
    else {
        startGame();
    }

}

// Checks if letter has already been picked
function checkAlreadyPicked(letter) {
    if (pickedLetters.indexOf(letter) < 0) {
        // Returns true if picked
        return true;
    } else {
        // Returns false if not picked
        return false
    }
}

// Functions to Play and Pause Audio
function playAudio() { 
    playaudio.play();
    playaudiotoggle = true;

    // Display pause audio button
    audiobtnsDiv.innerHTML = "<button onclick=\"pauseAudio()\" type=\"button\" class=\"btn btn-sm btn-danger\">Pause Audio</button>";  
} 

function pauseAudio() { 
    playaudio.pause();
    playaudiotoggle = false;
    
    // Display play audio button
    audiobtnsDiv.innerHTML = "<button onclick=\"playAudio()\" type=\"button\" class=\"btn btn-sm btn-success\">Play Audio</button>"; 
} 

