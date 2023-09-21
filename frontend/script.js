const question = document.querySelector(".question p")
const answer1 = document.querySelector(".answer1 .answer1")
const answer2 = document.querySelector(".answer2 .answer2")
const answer3 = document.querySelector(".answer3 .answer3")
const answer4 = document.querySelector(".answer4 .answer4")
const answers_cont = document.querySelector(".answers")
const answer_buttons = document.querySelectorAll(".answers .btn")
const scoreField = document.querySelector(".score-field")
const scoreField1 = document.querySelector(".score-field1")
const exitButton = document.querySelector(".submitAnswer")
const questionsSection = document.getElementById("questions_section")
const endSection = document.getElementById("end_section")
const subject3 = document.querySelector("#historyButton")
const endDiv = document.querySelector(".endDiv")


/////SETTING ESSENTIAL VARIABLES
let score = 0;
//function to get variables from localStorage
function getVariables(){
    //retrieve
    let numberOfQuestions = localStorage.getItem("numberOfQuestions")
    score = localStorage.getItem("score") //strings!!
    numberOfQuestions = parseInt(numberOfQuestions)
    score = parseInt(score)
    let variables = [numberOfQuestions, score]
    return variables
}
// set score globally accessible
let variables = getVariables();
score = variables[1];
//store our score in LocalStorage
if(localStorage.getItem('score') != null){
    score = localStorage.getItem('score')
    scoreField.textContent =localStorage.getItem('score')
}

////////MAJOR CLICK EVENTS /////////////////
//click on the answers
answer_buttons.forEach(item =>{
    item.addEventListener('click', e=>{
        console.log("we are listening")
        checkRight(e)
    })
})

/////////////////////// GAME FUNCTIONS ////////////////////////
//click on the exit button event 
exitButton.addEventListener('click', exitGame)

//check if the clicked answer is correct
function checkRight(e){
let clicked_answer = e.target.innerText
let clicked_element = e.target
console.log(correct_element)
if (correct_element == clicked_answer){
    score++;
    localStorage.setItem('score', score)
    scoreField.textContent = localStorage.getItem('score')
    clicked_element.parentElement.style.background = "green";
    setTimeout(function(){
        clicked_element.parentElement.style.background = "white"
    }, 300)
    }else{
    clicked_element.style.color= 'red';
    setTimeout(function(){
        clicked_element.style.color = "black"
    }, 250)
    }
}
//random index functions to shuffle answers later
function getIndexForAnswers(){
    // this function should suffles the indeces for either 4 options or 2
    allInd = [0,1,2,3]
    twoInd = [0,1]
    const indX = allInd.sort(() => Math.random() - 0.5)
    const twoindX =twoInd.sort(() => Math.random() - 0.5)
    const arrayOfarrays = [indX, twoindX]
    return arrayOfarrays
}
async function getRandomQuestion(){
    const options = {
        method: "GET"
    }
    const response = await fetch("http://localhost:3000/quiz/random", options);
    const data = await response.json()
    displayQuestion(data)
    console.log(data)
}
function displayQuestion(data){
    // Assign a HTML element randomly to each answer
    question.textContent = data.question;
    const correctAnswer = data.correct_answer;
    const wrongAnswersArray = data.incorrect_answers; 
    let arrays = getIndexForAnswers(); //shuffled indexes
    indX = arrays[0];
    twoindX = arrays[1];
    //if there are two answer options only
    if (wrongAnswersArray.length < 3){
        const answers = [answer2, answer3];
        answers[twoindX[0]].textContent = correctAnswer;
        answers[twoindX[1]].textContent = wrongAnswersArray[0];
        //set none used elements to hidden
        answer1.style.display ='none';
        answer4.style.display ='none';
    }else{
        // if there are 4 options to choose from
        //just in case we load after a 2 option question, reset styles on elements
        answer1.style.display = "";
        answer4.style.display = "";
        const answers = [answer1, answer2, answer3, answer4];
        answers[indX[0]].textContent = correctAnswer;
        answers[indX[1]].textContent = wrongAnswersArray[0];
        answers[indX[2]].textContent = wrongAnswersArray[1];
        answers[indX[3]].textContent = wrongAnswersArray[2];
        correct_element = answers[indX[0]].innerText
        console.log(correct_element)
    }
}
function exitGame(){
    console.log("we reached the exitGame function")
    questionsSection.style.display = 'none';
    exitButton.style.display = 'none';
    endDiv.textContent = "Thank you for playing!"
    endDiv.style.fontSize = "large";
    scoreField1.textContent = "Correct Answers: "
    score_reset = 0
    localStorage.setItem('score', score_reset) 
}
///////////////RUN GAME FUNCTION ///////////////////
// Get a number of questions at the time only 
async function getNumberOfQuestion(){
    let localVariables = getVariables();
    let numberOfQuestion = localVariables[0];
    const options = {
        method: "GET"
    }
    const response = await fetch("http://localhost:3000/quiz/random/all", options);
    const data = await response.json()
    reducedObject = data.slice(0,numberOfQuestion)
    console.log(reducedObject)
    for(let i=0; i<reducedObject.length; i++){
        displayQuestion(reducedObject[i]);
        console.log("we are waiting for a click!")
        //console.log(ildikoDiv.textContent)
        await getClick();
        console.log("click happened!")
    }
    exitGame()
}
getNumberOfQuestion()

/// ACCESSORY FUNCTIONS ////////
// making a function that returns a promise and waits for a click 
function getClick() {
    return new Promise(acc => {
        function handleClick() {
            answers_cont.removeEventListener('click', handleClick);
          acc();
        }
            answers_cont.addEventListener('click', handleClick);
      });
    }