const quizButton10 = document.querySelector(".quiz-button-10")

const quizButton50 = document.querySelector(".quiz-button-50")


quizButton10.addEventListener("click", ()=> {
    storeVariables(quizButton10.getAttribute("value"))
})

quizButton50.addEventListener("click", ()=> {
    storeVariables(quizButton50.getAttribute("value"))
})

function storeVariables(numberOfQuestion){
    //variables to pass next page
    console.log(`We are playing ${numberOfQuestion}`)
    let score = 0

    //save to localStorage
    localStorage.setItem("numberOfQuestions", numberOfQuestion);
    localStorage.setItem("score", JSON.stringify(score))

    //redirect
    location.href ="quiz.html"
}

