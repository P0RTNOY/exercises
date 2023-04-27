var totalCount = 0;
var currentLetter = null;
const existedLetters = [];
function createSquares() {
    for (let i = 0; i < 3; i++) {
        const size = 80 + 20 * totalCount++;
        const gameZone = document.getElementById('game-zone');
        const blackBox = document.createElement('div');
        blackBox.className = 'black-box';
        blackBox.style.width = size + 'px';
        blackBox.style.height = size + 'px';
        blackBox.style.fontSize = size / 2 + 'px';
        let letter = assignLetterToBox();
        blackBox.innerText = letter;
        blackBox.onclick = clickOnBox;
        gameZone.appendChild(blackBox);
    }
}
function assignLetterToBox() {

    let letter = String.fromCharCode(Math.floor(Math.random() * totalCount) + 97);
    let lettersCount = existedLetters.filter(l => l === letter).length;
    while (lettersCount == 2 && existedLetters.length <= 26) {
        letter = String.fromCharCode(Math.floor(Math.random() * totalCount) + 97);
        lettersCount = existedLetters.filter(l => l === letter).length;
    }
    existedLetters.push(letter);
    return letter;

}

const selectedBoxes = [];

function clickOnBox(event) {
    const currentBox = event.target;
    if(selectedBoxes.length == 0)
    {
        selectedBoxes.push(currentBox);
        currentBox.classList.add('selected');
    }
    

   else if (selectedBoxes.length == 1) {
        selectedBoxes.push(currentBox);    
        currentBox.classList.add('selected');
        const firstBox = selectedBoxes[0];
        const secondBox = selectedBoxes[1];
        const firstBoxLetter = firstBox.innerText;
        const secondBoxLetter = secondBox.innerText;
        
        let matched = false;
        for (let i = 0; i < selectedBoxes.length; i++) {
            if (firstBoxLetter === secondBoxLetter && firstBox != secondBox) {
                matched = true;
            } 
            
        }
        if(matched === true){
            firstBox.classList.remove('selected');
            secondBox.classList.remove('selected');
            firstBox.classList.add('matched');
            secondBox.classList.add('matched');
            selectedBoxes.length = 0;
        }
        else{ setTimeout(() => {
            firstBox.classList.remove('selected');
            secondBox.classList.remove('selected');
            selectedBoxes.length = 0;
        }, 500);}
       
      
    }

}

function resetGame() {
    // var gameZone = document.getElementById("game-zone");
    // gameZone.innerHTML = "";
    // totalCount = 0;
    location.reload();
}

var resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);
