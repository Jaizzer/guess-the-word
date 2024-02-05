// Run the game only after 0.2 seconds to ensure that HTML has fully rendered before prompting the user.
setTimeout(function () {
    runGame();
}, 200);

/**
 * Function to run the game logic.
 */
function runGame() {
    // Current word guess variable.
    let currentGuess;

    // Word-to-guess variable.
    const wordToGuess = getWordToGuess();

    // Save all input elements to an array.
    const inputs = [...document.querySelectorAll('input')];

    // Add input event listeners to move focus to the next input box.
    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1) {
                // Move focus to the next input box if a character is entered and it's not the last input box.
                const nextIndex = index < inputs.length - 1 ? index + 1 : null;
                if (nextIndex !== null) {
                    inputs[nextIndex].focus();
                }
            }
        });
    });
    
    // Add a submit event listener to the form for processing guesses.
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        // Prevent the form's default submit behavior.
        event.preventDefault();

        // Get all input elements' values and convert them to uppercase.
        currentGuess = inputs.map((input) => input.value.toUpperCase());

        // Get the match result of 'currentGuess' and 'wordToGuess'.
        const matchResult = compareLetters(currentGuess, wordToGuess);

        // Populate symbol indicator containers with corresponding symbols.
        populateSymbolIndicators(matchResult);
    });

    // Add a reset feature to the reset button.
    const resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', () => {
        // Clear all current input values.
        inputs.forEach(input => {
            input.value = '';
        });

        // Save all symbol indicator containers into an array.
        const symbolIndicator = [...document.querySelectorAll('.symbol-indicator')];
        
        // Remove icon inside symbol indicator and corresponding classes.
        symbolIndicator.forEach(symbolIndicator => {
            symbolIndicator.innerHTML = '';
            symbolIndicator.classList.remove('x');
            symbolIndicator.classList.remove('check');
        });

    });

    // Add 'reveal-answer' feature to the new button.
    const revealButton = document.querySelector('#reveal');
    revealButton.addEventListener('click', () => {
        // Input the correct answer to the input elements.
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = wordToGuess[i];
        }
        // Submit correct input by clicking submit button.
        document.querySelector('#submit').click();
    });
}

/**
 * Function to get the word to guess from the user.
 * Validates user input to ensure it's a 4-letter word.
 * @returns {Array} The word to guess split into an array of characters.
 */
function getWordToGuess() {
    // User input validator.
    let isInputValid = false;

    // Word to guess.
    let wordToGuess;

    // Keep prompting the user until input is valid.
    while (!isInputValid) {
        // Display a popup message to the user.
        wordToGuess = window.prompt('Enter a 4-letter word');

        // Validate user input; if it's a 4-letter word and not null then set 'isInputValid' to true, otherwise, alert the user.
        if (wordToGuess !== null && wordToGuess.length === 4) {
            isInputValid = true;
        } else {
            window.alert('Please enter a 4-letter word.');
        }
    }

    // Return the word to guess after converting it to uppercase and splitting it into an array of characters.
    return wordToGuess.toUpperCase().split('');
}

/**
 * Function to compare two arrays of characters and return an array of boolean values specifying where they match.
 * @param {Array} wordArray1 - The first array of characters.
 * @param {Array} wordArray2 - The second array of characters to compare with.
 * @returns {Array} An array of boolean values indicating where the characters matched.
 */
function compareLetters(wordArray1, wordArray2) {
    // Array containing boolean values specifying where wordArray1 and wordArray2 matched.
    const matchResult = [false, false, false, false];

    // Compare 'wordArray1' and 'wordArray2'.
    for (let i = 0; i < wordArray1.length; i++) {
        if (wordArray1[i] === wordArray2[i]) {
            matchResult[i] = wordArray1[i] === wordArray2[i];
        }
    }

    return matchResult;
}

/**
 * Function to populate symbol indicator containers based on boolean values.
 * @param {Array} booleanValues - An array of boolean values.
 */
function populateSymbolIndicators(booleanValues) {
    // Access all symbol indicator containers and save them into an array.
    const symbolIndicator = [...document.querySelectorAll('.symbol-indicator')];

    // Add "checkmark" and "x" svg icon based on matches inside 'booleanValues' array.
    for (let i = 0; i < booleanValues.length; i++) {
        if (booleanValues[i]) {
            symbolIndicator[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Matched!</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>';
            symbolIndicator[i].classList.add('check');
            symbolIndicator[i].classList.remove('x');
        } else {
            symbolIndicator[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Not Matched!</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>';
            symbolIndicator[i].classList.add('x');
            symbolIndicator[i].classList.remove('check');        
        }
    }
}
