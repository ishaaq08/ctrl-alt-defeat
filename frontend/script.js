const question = document.querySelector(".question p")
const answer1 = document.querySelector(".answer p")
const answer2 = document.querySelector(".another_answer p")
const answer3 = document.querySelector(".another_answer2 p")
const answer4 = document.querySelector(".another_answer3 p")

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
    }

getRandomQuestion()
