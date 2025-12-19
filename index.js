const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
""/""];

const symbols = characters.filter(char => !(/[a-zA-Z0-9]/).test(char));
const nuymbers = characters.filter(char => (/[0-9]/).test(char));
const letters = characters.filter(char => (/[a-zA-Z]/).test(char));


// Store the dom elements in variables
const generateBtn = document.getElementById("btn-generate-password");
const passwordOneEl = document.querySelector(".password.one");
const passwordTwoEl = document.querySelector(".password.two");
const passwordLengthEl = document.getElementById("password-length");
const symbolToggleEl = document.getElementById("toggle-symbols");
const numberToggleEl = document.getElementById("toggle-numbers");

let typingTimer;                // Timer identifier
const doneTypingInterval = 500;  // Time in ms (0.5 seconds)

// Function to construct charecter set based on symbol toggle and number toggle checkbox values
function constructCharacterSet() {
    let charSet = [...letters]; // Start with letters
    if (symbolToggleEl.checked) {
        charSet = [...charSet, ...symbols]; // Add symbols if checked
    }
    if (numberToggleEl.checked) {
        charSet = [...charSet, ...nuymbers]; // Add numbers if checked
    }
    return charSet;
}
// Function to generate a random password
function generatePassword() {
    let passwordOne = "";
    let passwordTwo = "";
    const charSet = constructCharacterSet();
    const passwordLength = document.getElementById("password-length").value || 15;
    for (let i = 0; i < passwordLength; i++) {
        let randomIndexOne = Math.floor(Math.random() * charSet.length);
        let randomIndexTwo = Math.floor(Math.random() * charSet.length);
        passwordOne += charSet[randomIndexOne];
        passwordTwo += charSet[randomIndexTwo];
    }
    return { passwordOne, passwordTwo };
}

// Validate password length input. 
passwordLengthEl.addEventListener("keyup", () => {
    clearTimeout(typingTimer); // Why ? Because we want to reset the timer on each keyup event
    typingTimer = setTimeout(() => {
        const value = parseInt(passwordLengthEl.value);    
        if (value < 10) {
            alert("Password length cannot be less than 10. Setting to minimum value of 10.");
            passwordLengthEl.value = 10;
        } else if (value > 20) {
            passwordLengthEl.value = 20;
            alert("Password length cannot be more than 20. Setting to maximum value of 20.");
        }
    }, doneTypingInterval);
});

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

// Event listeners
// Add click listeners for copying passwords
passwordOneEl.addEventListener("click", () => {
    if (passwordOneEl.textContent) {
        copyToClipboard(passwordOneEl.textContent);
        alert("Password copied to clipboard!");
    }
});

passwordTwoEl.addEventListener("click", () => {
    if (passwordTwoEl.textContent) {
        copyToClipboard(passwordTwoEl.textContent);
        alert("Password copied to clipboard!");
    }
});

// Generate passwords on button click
generateBtn.addEventListener("click", () => {
    console.log("clicked");
    const passwordData = generatePassword();
    passwordOneEl.textContent = passwordData.passwordOne;
    passwordTwoEl.textContent = passwordData.passwordTwo;
});

