'use strict';


const modal = document.querySelector(".modal");
const span = document.getElementsByClassName("close")[0];

///////// close modal ////////////
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//////////////////////////////////

const hangmanWord = document.getElementById('hangman-word');
const possibleLetter = ['Helicopter', 'Airplane', 'Boat', 'Ship', 'Sheep', 'Cow'];
let generateRandomWord = () => possibleLetter[Math.floor(Math.random()*possibleLetter.length)];


let word, set, lettersToGuess, correctlyGuessedLetters, rightLetter, mistakes;


function showLevel(){
    word = generateRandomWord();
    set = new Set(word.slice(1, word.length-1));
    lettersToGuess = set.size;
    correctlyGuessedLetters = 0;
    rightLetter = [];
    mistakes = 0;


    for (let i=0; i<word.length; i++){

        let letter = document.createElement('p');
        letter.classList.add('letter');
        
        if (i==0)letter.textContent = word[i]; // show first letter
        else if (i==word.length-1) letter.textContent = word[i]; // show last letter
        else letter.innerHTML = "&nbsp"; // hides the other letters

        hangmanWord.append(letter);
    };
}
showLevel();

addEventListener('keypress', (event) => {
    if (!word.includes(event.key)){ // wrong guess
        document.body.style.backgroundColor = 'red';
        setTimeout(()=>{
            document.body.style.backgroundColor = '#332C39'
        }, 100);
        document.querySelectorAll('.mistakes')[mistakes].classList.add('made-mistakes')
        mistakes++;
        if (mistakes==5){
            
            setTimeout(()=>{
                
                modal.style.display = "block";
                document.getElementById('modal-img').src = 'img/lose.jpeg';

                // clear previous game settings and start a new game
                document.querySelectorAll('.letter').forEach(function(elmt){
                    elmt.remove();
                })
                document.querySelectorAll('.mistakes').forEach(function(elmt){elmt.classList.remove('made-mistakes')})

                showLevel();
            }, 300)
        }

    } else { // right guess
        rightLetter.push(event.key)
        document.body.style.backgroundColor = 'green';
        setTimeout(()=>{
            document.body.style.backgroundColor = '#332C39'
        }, 100)

        document.querySelectorAll('.letter').forEach(function(elmt){
            elmt.remove();
        })

        for (let i=0; i<word.length; i++){

            let letter = document.createElement('p');
            letter.classList.add('letter');
            
            let wordTextContent = "";
            if (i==0) wordTextContent += word[i]; // show first letter
            else if (i==word.length-1) wordTextContent += word[i]; // show last letter
            else { // hides the rest letters
                if (rightLetter.includes(word[i])){
                    wordTextContent += word[i] // shows the right letter that the user has choiced
                } else {
                    wordTextContent += "&nbsp"; // the rest letters remain hidden
                }
             } 
            letter.innerHTML = wordTextContent;
        
            hangmanWord.append(letter);
        };

        correctlyGuessedLetters++;

        if (lettersToGuess == correctlyGuessedLetters){ // if the user has correcly guessed all the letters > win

            setTimeout(()=>{
                
                modal.style.display = "block";
                document.getElementById('modal-img').src = 'img/win.png';

                // clear previous game settings and start a new game
                document.querySelectorAll('.letter').forEach(function(elmt){
                    elmt.remove();
                })
                document.querySelectorAll('.mistakes').forEach(function(elmt){elmt.classList.remove('made-mistakes')})

                showLevel();
            }, 300)
            

        }


    }
});
