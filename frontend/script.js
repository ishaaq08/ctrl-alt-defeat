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
//const ildikoDiv = document.querySelector("#ildiko-div")
let gamePlay = true;

//score that counts current player's score and total questions asked 
let score = 0;

//store our score in LocalStorage
if(localStorage.getItem('score') != null){
    score = localStorage.getItem('score')
    scoreField.textContent =localStorage.getItem('score')
}
//click on the answers
answer_buttons.forEach(item =>{
    item.addEventListener('click', e=>{
        console.log("we are listening")
        checkRight(e)
    })
})
//click on the exit button 
exitButton.addEventListener('click', exitGame)

function checkRight(e){
let counter = 0;
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
    // setTimeout(function(){
    //     window.reload();
    // }, 3000)
    counter++;
    }else{
    clicked_element.style.color= 'red';
    setTimeout(function(){
        clicked_element.style.color = "black"
    }, 250)
    // setTimeout(function(){
    //     window.reload();
    // }, 3000)
    counter++;
    }
}
//random index functions to shuffle answers later
function getIndexForAnswers(){
    // this function should add
    allInd = [0,1,2,3]
    const indX = allInd.sort(() => Math.random() - 0.5)
    return indX
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
    let indX = getIndexForAnswers(); //shuffled indexes
    const answers = [answer1, answer2, answer3, answer4];
    answers[indX[0]].textContent = correctAnswer;
    answers[indX[1]].textContent = wrongAnswersArray[0];
    answers[indX[2]].textContent = wrongAnswersArray[1];
    answers[indX[3]].textContent = wrongAnswersArray[2];
    correct_element = answers[indX[0]].innerText
    console.log(correct_element)
}
function exitGame(){
    console.log("we reached the exitGame function")
    questionsSection.style.display = 'none';
    exitButton.style.display = 'none';
    endSection.textContent = "Thank you for playing!"
    scoreField1.textContent = "Correct Answers: "
    score_reset = 0
    localStorage.setItem('score', score_reset) 
}
function checkNumberOfQuestions(){
    //here I'm going to get the value of the div 
    let numberFromDiv =3;
    if (numberFromDiv){
        return numberFromDiv
    }else{
        return 5
    }
}
// Get a number of questions at the time only 
async function getThreeQuestion(){
    let numberOfQuestions = checkNumberOfQuestions();
    const options = {
        method: "GET"
    }
    const response = await fetch("http://localhost:3000/quiz/random/all", options);
    const data = await response.json()
    reducedObject = data.slice(0,numberOfQuestions)
    console.log(reducedObject)
    for(let i=0; i<reducedObject.length; i++){
        displayQuestion(reducedObject[i]);
        console.log("we are waiting for a click!")
        await getClick();
        console.log("click happened!")
    }
    exitGame()
}
getThreeQuestion()
//getRandomQuestion()

// making a function that returns a promise and waits for a click 
function getClick() {
    return new Promise(acc => {
        function handleClick() {
          document.removeEventListener('click', handleClick);
          acc();
        }
        document.addEventListener('click', handleClick);
      });
    }