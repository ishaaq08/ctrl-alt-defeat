const question = document.querySelector(".question p")
const answer1 = document.querySelector(".answer1 p")
const answer2 = document.querySelector(".answer2 p")
const answer3 = document.querySelector(".answer3 p")
const answer4 = document.querySelector(".answer4 p")
const answers_cont = document.querySelector(".answers")

//score that counts current player's score
let score = 0;
let total_score = 0;
let correct_element = "";
//need to add event listener get container, and use it as a wrapper
answers_cont.addEventListener("click", checkRight);

function checkRight(e){
  clicked_answer =  e.target.querySelector("p");
  if (correct_element == clicked_answer){
    score++;
    console.log(`Right answer, You have achieved: ${score} points`)
  }else{
    console.log(`Wrong answer, You have achieved: ${score} points so far`)
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
    console.log(correct_element)
    }

getRandomQuestion()

