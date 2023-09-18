const question = document.querySelector("question p")
const answer1 = document.querySelector("answer p")
const answer2 = document.querySelector("another_answer p")
const answer3 = document.querySelector("another_answer2 p")
const answer4 = document.querySelector("another_answer3 p")

function getIndex(){
    return 1
}

async function getRandomQuestion(){
    const options = {
        method: "GET"
    }
    const response = await fetch("http://localhost:3000/quiz/random", options);
    const data = await response.json();
    console.log(data)
    question.textContent= data.question;
    //
    const correctAnswer = data.correct_answer;
    const wrongAnswersArray = data.incorrect_answers;
}
getRandomQuestion()