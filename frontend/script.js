const question = document.querySelector(".question p")
const answer1 = document.querySelector(".answer1 p")
const answer2 = document.querySelector(".answer2 p")
const answer3 = document.querySelector(".answer3 p")
const answer4 = document.querySelector(".answer4 p")
const answers_cont = document.querySelector(".answers")
const answer_buttons = document.querySelectorAll(".answers .btn")
const scoreField = document.querySelector(".score-field")
const scoreField1 = document.querySelector(".score-field1")
const exitButton = document.querySelector(".submitAnswer")
const questionsSection = document.getElementById("questions_section")
const endSection = document.getElementById("end_section")
let gamePlay = true;

//score that counts current player's score and total questions asked 
let score = 0;
let total= 0;

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
  let clicked_answer = e.target.querySelector("p")
  console.log("we arrived here")
  console.log(clicked_answer)
  if (correct_element == clicked_answer){
    score++;
    total++;
    localStorage.setItem('score', score)
    scoreField.textContent = localStorage.getItem('score')
    clicked_answer.parentElement.style.background = "green";
    setTimeout(function(){
        location.reload()
    }, 3000)
  }else{
    total++;
    clicked_answer.parentElement.style.color = "red";
    setTimeout(function(){
        location.reload()
    }, 3000)
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
    //loop through 10 times
    const response = await fetch("http://localhost:3000/quiz/random", options);
    const data = await response.json();
    console.log(data)
    console.log(data.question)
    question.textContent = data.question;

    // Assign a HTML element randomly to each answer
    const correctAnswer = data.correct_answer;
    const wrongAnswersArray = data.incorrect_answers;
    let indX = getIndexForAnswers(); //shuffled indexes
    const answers = [answer1, answer2, answer3, answer4];
    answers[indX[0]].textContent = correctAnswer;
    answers[indX[1]].textContent = wrongAnswersArray[0];
    answers[indX[2]].textContent = wrongAnswersArray[1];
    answers[indX[3]].textContent = wrongAnswersArray[2];
    correct_element = answers[indX[0]]
    }

function exitGame(){
    console.log("we reached the exitGame function")
    questionsSection.style.display = 'none';
    exitButton.style.display = 'none';
    endSection.textContent = "Thank you for playing!"
    scoreField1.textContent = "Correct Answers: "
    //get percentage doesn't work yet
    let calcPercentage = ((localStorage.getItem('score'))/total)*100
    console.log(calcPercentage)
    score_reset = 0
    localStorage.setItem('score', score_reset)
    
}
getRandomQuestion()

