const displayPassword = document.querySelector("[password_display]");
const copyBtn = document.querySelector("#copyButton");
const copyMessage = document.querySelector(".copy-message");
const displayLength = document.querySelector("#count");
const slider = document.querySelector(".range");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const symbol = document.querySelector("#symbol");
const number = document.querySelector("#number");
const indicator = document.querySelector("#round");
const generatePass = document.querySelector("#btn2");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const specialCharacters = "!@#$%^&*()-=+|}\]{[/*~`.,<>?";

let password = "";
let passwordLength = 10;
let checkCount = 0;

// Set indicator color initially grey
displayLength.innerText = 10;

// Set password length
function handleSlider() {
    displayLength.innerText=passwordLength;
}

function getRandomNumber(min, max) {
    console.log(min);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(randomNumber);
    return randomNumber;
}

function getRandomUppercase() {
    const password = String.fromCharCode(getRandomNumber(65, 90));
    console.log(`Upper is ${password}`);
    return password;
}

function getRandomLowercase() {
    return String.fromCharCode(getRandomNumber(97, 122));
}

function getRandomSymbol() {
    let randomIndex = getRandomNumber(0, specialCharacters.length - 1);
    return specialCharacters.charAt(randomIndex);
}

function generatePasswordBox(strength) {
    var passwordBox = document.getElementById('passwordBox');
    var text, color;

    switch (strength) {
        case 'strong':
            text = 'Strong Password';
            color = 'green';
            break;
        case 'medium':
            text = 'Medium Password';
            color = 'orange';
            break;
        case 'low':
            text = 'Weak Password';
            color = 'red';
            break;
        default:
            text = '';
            color = 'transparent';
    }

    passwordBox.innerText = text;
    passwordBox.style.backgroundColor = color;
}
function calcStrength() {
    let hasUpper = uppercase.checked;
    let hasLower = lowercase.checked;
    let hasNumber = number.checked;
    let hasSymbol = symbol.checked;

    if (hasUpper && hasLower && hasSymbol && hasNumber && passwordLength >= 8) {
        indicatorColor("#0f0");
    } else if ((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >= 6 && passwordLength < 8) {
        indicatorColor("#ff0");
    } else {
        indicatorColor("#f00");
    }
}

function checkPasswordStrength() {
    var password = document.getElementById('passwordInput').value;
    console.log(password);
    var strength = calculatePasswordStrength(password);
    console.log(strength);
    generatePasswordBox(strength);
}

function calculatePasswordStrength(password) {
    // Your password strength calculation logic here
    // For simplicity, let's assume three categories: strong, medium, and low

    if (password.length >= 8 && /\d/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password)) {
        return 'strong';
    } else if (password.length >= 6 && /\d/.test(password) && /[a-z]/.test(password)) {
        return 'medium';
    } else {
        return 'low';
    }
}

async function copyContent() {
    var displayPassword = document.getElementById('passwordInput');
    var copyMessage = document.getElementById('copyMessage');

    try {
        await navigator.clipboard.writeText(displayPassword.value);
        copyMessage.innerText = "Copied";
    } catch (e) {
        copyMessage.innerText = "Failed";
    }

    // Make copy message span visible
    copyMessage.classList.add("active");

    setTimeout(() => {
        copyMessage.classList.remove("active");
    }, 2000);
}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


slider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

function countTickCheckAgain() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });

    // Special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', countTickCheckAgain);
});

copyBtn.addEventListener('click', () => {
    if (passwordLength > 0) {
        copyContent();
    }
});
console.log("109")
generatePass.addEventListener('click', () => {
    // None of the checkboxes are selected
    if (checkCount === 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    console.log("118")

    // Let's start the journey to find a new password
    console.log("Starting the Journey");

    // Remove old password
    password = "";

    let funcArr = [];

    if (uppercase.checked) funcArr.push(getRandomUppercase());
    if (lowercase.checked) funcArr.push(getRandomLowercase());
    if (number.checked) funcArr.push(getRandomNumber(1,9));
    if (symbol.checked) funcArr.push(getRandomSymbol());
    console.log(`this is password ${funcArr}`);
    // Compulsory addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i];
    }
    console.log(`Compulsory addition done ${password}`);

    // Remaining addition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRandomNumber(0, funcArr.length - 1);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex];
    }
    console.log("Remaining addition done");

    // Shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    console.log(password);
    // Show in UI
    displayPassword.value = password;
    console.log("UI addition done");

    // Calculate strength
    checkPasswordStrength();
});
