// Number of Lives
var lives = 5;

// Get element div from html
var messageDiv = document.getElementById("message");
var badGuessDiv = document.getElementById("badguess");

// Set words array
var words = ["alpha", "beta", "gamma"];

// Select random word from array
var word = words[Math.floor(Math.random()*words.length)].toUpperCase();


// Array for All Letters Picked
var pickedLetters =[];

// Array for Good Guess
var goodGuess =[];

// Selected Letters
var badGuess =[];


// for loop to count characters and create spots for each letter
for (i=0; i < word.length; i++) {

    // Create new element <span>
    var letter = document.createElement("span");

    // Add _ to its HTML
    letter.innerHTML += "_ ";

    // Set the position of the letter in the word
    letter.setAttribute("id", i);

    // Get element div from html
    var wordDiv = document.getElementById("word");

    // Add span for each letter in the div
    wordDiv.appendChild(letter);
}

console.log(wordDiv);

// When User presses a key
document.onkeyup = function(event) {

    // Check if user entered a letter (A - Z)
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        
        // Capture key pressed and make it Uppercase
        var userGuess = event.key.toUpperCase();
        
        // Check if picked letter was already guessed
        var alreadyPicked = checkAlreadyPicked(userGuess);
        
        // If already guessed, then notify user and stop.
        if (!alreadyPicked) {
            messageDiv.textContent = "Letter already picked!";
            return;
        } 

        // Check if letter guessed is in the word
        if (word.indexOf(userGuess) < 0) {

            // CODE FOR BAD GUESS

            // Notify user they picked a wrong letter
            messageDiv.textContent = "Bad Guess!";

            // Update picked letters array
            pickedLetters.push(userGuess);

            // Update bad guesses array
            badGuess.push(userGuess);

            // Append letter to Bad Guess Div
            badGuessDiv.innerHTML += userGuess + " ";

            // Reduce life
            lives--;

            // Check if user has used all lives and has lost
            if (lives == 0) {
                // Notify user they lost and reset
                messageDiv.textContent = "YOU LOSE!";
            }

        } else {

            // CODE FOR GOOD GUESS

            // Notify User they picked a correct letter
            messageDiv.textContent = "GOOD PICK!";

            // Update picked letters array
            pickedLetters.push(userGuess);

            // For loop to check the position of the correctly guessed letter
            for(i=0; i < word.length; i++) {
                if (word[i] == userGuess) {

                    // Get element in HTML for the letter position
                    var letterLocation = this.getElementById(i);

                    // Update element with the letter
                    letterLocation.innerHTML = userGuess + " ";

                    // Update picked letters array
                    pickedLetters.push(userGuess);

                    // Update good guesses array
                    goodGuess.push(userGuess);

                    // Notify user they won and reset
                    if (goodGuess.length == word.length) {
                        messageDiv.textContent = "YOU WON!";
                    } 

                }

            }  
        }


    } else {
        // Notify user they did not select a letter
        messageDiv.textContent = "Invalid Selection. Pick a Letter!";
    }

}

// Checks if letter has already been picked
function checkAlreadyPicked(letter) {
    if (pickedLetters.indexOf(letter) < 0) {
        // Returns true if picked
        return true;
    } else
    {
        // Returns false if not picked
        return false
    }
}

