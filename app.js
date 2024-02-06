// Run the game only after 0.2 seconds to ensure that HTML has fully rendered before prompting the user.
setTimeout(function () {
    runGame();
}, 200);

// Word-to-guess variable.
let wordToGuess;

/**
 * Function to run the game logic.
 */
function runGame() {

    // List of random words to be used
    const fourLetterWords = [
        'able', 'acid', 'aged', 'also', 'area', 'army', 'away', 'baby', 'back', 'ball',
        'band', 'bank', 'base', 'bath', 'bear', 'beat', 'been', 'beer', 'bell', 'belt',
        'best', 'bill', 'bird', 'blow', 'blue', 'boat', 'body', 'bomb', 'bond', 'bone',
        'book', 'boom', 'born', 'boss', 'both', 'bowl', 'bulk', 'burn', 'bush', 'busy',
        'call', 'calm', 'came', 'camp', 'card', 'care', 'case', 'cash', 'cast', 'cell',
        'chat', 'chip', 'city', 'club', 'coal', 'coat', 'code', 'cold', 'come', 'cook',
        'cool', 'cope', 'copy', 'CORE', 'cost', 'crew', 'crop', 'dark', 'data', 'date',
        'dawn', 'days', 'dead', 'deal', 'dean', 'dear', 'debt', 'deep', 'deny', 'desk',
        'dial', 'dice', 'diet', 'disc', 'disk', 'does', 'done', 'door', 'dose', 'down',
        'draw', 'drew', 'drop', 'drug', 'dual', 'duke', 'dust', 'duty', 'each', 'earn',
        'ease', 'east', 'easy', 'edge', 'else', 'even', 'ever', 'evil', 'exit', 'face',
        'fact', 'fail', 'fair', 'fall', 'farm', 'fast', 'fate', 'fear', 'feed', 'feel',
        'feet', 'fell', 'felt', 'file', 'fill', 'film', 'find', 'fine', 'fire', 'firm',
        'fish', 'five', 'flat', 'flow', 'food', 'foot', 'ford', 'form', 'fort', 'four',
        'free', 'from', 'fuel', 'full', 'fund', 'gain', 'game', 'gate', 'gave', 'gear',
        'gene', 'gift', 'girl', 'give', 'glad', 'goal', 'goes', 'gold', 'Golf', 'gone',
        'good', 'gray', 'grew', 'grey', 'grow', 'gulf', 'hair', 'half', 'hall', 'hand',
        'hang', 'hard', 'harm', 'hate', 'have', 'head', 'hear', 'heat', 'held', 'hell',
        'help', 'here', 'hero', 'high', 'hill', 'hire', 'hold', 'hole', 'holy', 'home',
        'hope', 'host', 'hour', 'huge', 'hung', 'hunt', 'hurt', 'idea', 'inch', 'into',
        'iron', 'item', 'jack', 'jane', 'jean', 'john', 'join', 'jump', 'jury', 'just',
        'keen', 'keep', 'kent', 'kept', 'kick', 'kill', 'kind', 'king', 'knee', 'knew',
        'know', 'lack', 'lady', 'laid', 'lake', 'land', 'lane', 'last', 'late', 'lead',
        'left', 'less', 'life', 'lift', 'like', 'line', 'link', 'list', 'live', 'load',
        'loan', 'lock', 'logo', 'long', 'look', 'lord', 'lose', 'loss', 'lost', 'love',
        'luck', 'made', 'mail', 'main', 'make', 'male', 'many', 'Mark', 'mass', 'matt',
        'meal', 'mean', 'meat', 'meet', 'menu', 'mere', 'mike', 'mile', 'milk', 'mill',
        'mind', 'mine', 'miss', 'mode', 'mood', 'moon', 'more', 'most', 'move', 'much',
        'must', 'name', 'navy', 'near', 'neck', 'need', 'news', 'next', 'nice', 'nick',
        'nine', 'none', 'nose', 'note', 'okay', 'once', 'only', 'onto', 'open', 'oral',
        'over', 'pace', 'pack', 'page', 'paid', 'pain', 'pair', 'palm', 'park', 'part',
        'pass', 'past', 'path', 'peak', 'pick', 'pink', 'pipe', 'plan', 'play', 'plot',
        'plug', 'plus', 'poll', 'pool', 'poor', 'port', 'post', 'pull', 'pure', 'push',
        'race', 'rail', 'rain', 'rank', 'rare', 'rate', 'read', 'real', 'rear', 'rely',
        'rent', 'rest', 'rice', 'rich', 'ride', 'ring', 'rise', 'risk', 'road', 'rock',
        'role', 'roll', 'roof', 'room', 'root', 'rose', 'rule', 'rush', 'ruth', 'safe',
        'said', 'sake', 'sale', 'salt', 'same', 'sand', 'save', 'seat', 'seed', 'seek',
        'seem', 'seen', 'self', 'sell', 'send', 'sent', 'sept', 'ship', 'shop', 'shot',
        'show', 'shut', 'sick', 'side', 'sign', 'site', 'size', 'skin', 'slip', 'slow',
        'snow', 'soft', 'soil', 'sold', 'sole', 'some', 'song', 'soon', 'sort', 'soul',
        'spot', 'star', 'stay', 'step', 'stop', 'such', 'suit', 'sure', 'take', 'tale',
        'talk', 'tall', 'tank', 'tape', 'task', 'team', 'tech', 'tell', 'tend', 'term',
        'test', 'text', 'than', 'that', 'them', 'then', 'they', 'thin', 'this', 'thus',
        'till', 'time', 'tiny', 'told', 'toll', 'tone', 'tony', 'took', 'tool', 'tour',
        'town', 'tree', 'trip', 'true', 'tune', 'turn', 'twin', 'type', 'unit', 'upon',
        'used', 'user', 'vary', 'vast', 'very', 'vice', 'view', 'vote', 'wage', 'wait',
        'wake', 'walk', 'wall', 'want', 'ward', 'vent', 'vary', 'view'];

    // Current word guess variable.
    let currentGuess;

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

    // Add a event listener to the form for picking a random word
    document.getElementById("random").addEventListener("click", function() {
        
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

        // Set wordToGuess to a random word from fourLetterWords
        wordToGuess = (fourLetterWords[Math.floor(Math.random() * fourLetterWords.length)]).toUpperCase().split('');;
      });

    document.getElementById("enter").addEventListener("click", function() {
        
        wordToGuess = getWordToGuess();

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

        if (compareLetters && wordToGuess != undefined) {
            alert("You guessed the word! Let someone else guess, enter a new word, or select a random word!")
        }
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
    if (wordToGuess == undefined) {
        alert("Please select a word before submitting a word!");
    } else {
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
