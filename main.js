const lowerCases = ['a', 'z', 'e', 'r', 't', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n']
const upperCases = lowerCases.map(letter => letter.toUpperCase());
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const specialCharacters = [',', '?', ';', '.', ':', '/', '!', '£', '@']

let isLowerCase = true;
let isUpperCase = true;
let isNumber = true;
let isSpecialCharacter = true;
let password = "";

document.getElementById('lowercase').onclick = function() {
    if (this.checked){isLowerCase = true;}
    else {isLowerCase = false;}
};
document.getElementById('uppercase').onclick = function() {
    if (this.checked){isUpperCase = true;}
    else {isUpperCase = false;}
};
document.getElementById('number').onclick = function() {
    if (this.checked){isNumber = true;}
    else {isNumber = false;}
};
document.getElementById('special').onclick = function() {
    if (this.checked){isSpecialCharacter = true;}
    else {isSpecialCharacter = false;}
};

const customAlert = (msg) =>{
    const myAlert = document.createElement("div");
    myAlert.className="alert";
    myAlert.innerHTML = msg;
    setTimeout(function(){myAlert.parentNode.removeChild(myAlert);}, 3000);
    document.getElementsByTagName('body')[0].appendChild(myAlert);
}

const shuffleArray = (arr) => {
    for (let i=0; i<arr.length; i++) {
        const j = Math.floor(Math.random()*(i+1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

const getCharacter = (elem) => {
    if (elem === 'l'){
        return lowerCases[Math.floor(Math.random()*lowerCases.length)];
    }
    else if (elem === 'u'){
        return upperCases[Math.floor(Math.random()*upperCases.length)]
    }
    else if (elem === 'n'){
        return numbers[Math.floor(Math.random()*numbers.length)];
    }
    else{
        return specialCharacters[Math.floor(Math.random()*specialCharacters.length)];
    }
}

const generatePassword = () =>{
    const pwLength = document.getElementById('length').valueAsNumber;
    let pwContent = [];
    let count = 0;
    password = '';
    if (isLowerCase === true){
        pwContent.push('l');
    }
    if (isUpperCase === true){
        pwContent.push('u');
    }
    if (isNumber === true){
        pwContent.push('n');
    }
    if (isSpecialCharacter === true){
        pwContent.push('s')
    }
    pwContent = shuffleArray(pwContent);
    if (typeof pwLength != 'number' || pwLength > 100 || pwLength < 1 || !pwLength){
        customAlert("The password length must be a number between 1 and 100.");
        return;
    }
    if (pwContent.length === 0){
        customAlert("At least one checkbox must be checked.");
        return;
    }
    while (count < pwContent.length && count < pwLength){
        password += getCharacter(pwContent[count]);
        console.log(password);
        count += 1;
    }
    if (count < pwLength) {
        for (let i=count; i<pwLength; i++){
            console.log(i);
            const elem = pwContent[Math.floor(Math.random()*pwContent.length)];
            password += getCharacter(elem);
        }
    }
    document.getElementsByClassName('pw')[0].value = password;
}

const showCopyMessage = () => {
    const copyMessage = document.createElement('div');
    copyMessage.innerHTML = 'Copied!';
    copyMessage.className = 'copy-message';
    document.querySelector('.copy-message-container').appendChild(copyMessage);
    setTimeout(()=>{
        document.querySelector('.copy-message-container').removeChild(copyMessage);
    },2000);
};


document.getElementsByClassName('fa-copy')[0].addEventListener('click', async function(){
    if (navigator.clipboard){
        let text = document.getElementsByClassName('pw')[0].value;
        await navigator.clipboard.writeText(text);
        showCopyMessage();
    }
})

document.addEventListener('keypress', function(event){
    if (event.which == 38 || event.which == 40){generatePassword();}
});

let comment = document.getElementById("comment");
