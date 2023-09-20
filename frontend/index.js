const quizButton10 = document.querySelector(".quiz-button-10")

const quizButton50 = document.querySelector(".quiz-button-50")

const ildikoDiv = document.querySelector(".ildiko-div")
console.log(ildikoDiv);


quizButton10.addEventListener("click", ()=> {
    ildikoDiv.innerText = 10
})

quizButton50.addEventListener("click", ()=> {
    ildikoDiv.innerText = 50
})

