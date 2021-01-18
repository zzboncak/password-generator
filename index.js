// Form Elements
const generateBtn = document.getElementById("generate");
generateBtn.setAttribute("disabled", true); // Initially disable the generate button until the desired criteria are met
const passwordForm = document.getElementById("password-form");
const passwordLengthInput = document.getElementById("password-length");
const passwordField = document.getElementById("password");
const checkboxes = document.querySelectorAll(".checkbox");

// Character object
const characters = {
    "upper-case": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "lower-case": "abcdefghijklmnopqrstuvwxyx",
    "numbers": "1234567890",
    "symbols": `!@#$%^&*()_-~+={}[]<>,./?:;'"`
};

// Function to randomly generate a password
function generatePassword(passwordLength, passwordCriteria) {
    let password = "";
    let passwordCriteriaIndex = 0;
    for (let i = 0; i < passwordLength; i++) {
        // Access the set of characters to add
        const characterSet = characters[passwordCriteria[passwordCriteriaIndex]];
        // Choose a random index for the characterSet, based on its length
        const randomIndex = Math.ceil(Math.random()*characterSet.length);
        // Grab the random character with the selected characterSet and random index
        const characterToAdd = characterSet[randomIndex];
        // Add it to the password
        password += characterToAdd;

        // This if / else statement just cycles through which password criteria so it's even
        if(passwordCriteriaIndex === passwordCriteria.length - 1) {
            passwordCriteriaIndex = 0;
        } else {
            passwordCriteriaIndex += 1;
        }
    }

    // after adding, randomize the characters of the password
    let passwordArray = password.split("");
    let randomizedArray = [];
    while (passwordArray.length !== 0) { // this loop will run while there are elements in the passwordArray
        // Choose a random character of the password
        let randomIndex = Math.floor(Math.random()*passwordArray.length);
        // Add that character to the new array
        randomizedArray.push(passwordArray[randomIndex]);
        // remove it from the original array
        passwordArray.splice(randomIndex, 1);
    }

    // Finally, return the randomized password by joining the randomized array with no separators
    return randomizedArray.join("");
}

function validateForm() {
    // Turn the NodeList of checkboxes into an array, and return just their checked values
    let checkboxesArray = Array.from(checkboxes).map(checkbox => checkbox.checked);

    // If at least one checkbox is checked and the passwordLength input has value, remove the disabled attribute from the submit button
    if(checkboxesArray.includes(true) && passwordLengthInput.value) {
        generateBtn.removeAttribute("disabled");
    } else { // if not, keep it disabled
        generateBtn.setAttribute("disabled", true);
    }
}

// Function to put password in the document
function writePassword(event) {
    // event is the submit event, and contains all the info on the current value of the form inputs
    event.preventDefault();
    // extract form input values
    const passwordLength = passwordLengthInput.value;
    const passwordCriteria = Array.from(checkboxes) // Make an array from the checkbox inputs
        .filter(checkbox => checkbox.checked) // filter out the ones that aren't checked
        .map(input => input.name); // only include tha name of the input
    const password = generatePassword(passwordLength, passwordCriteria);

    passwordField.value = password;
}

// Add the event listeners
passwordForm.addEventListener("submit", writePassword);

// Each time an input changes, run the validateForm function to see if it's good to submit
passwordLengthInput.addEventListener("change", validateForm);
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", validateForm);
});