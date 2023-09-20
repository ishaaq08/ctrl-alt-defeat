const quizButton10 = document.querySelector(".quiz-button-10")
const quizButton50 = document.querySelector(".quiz-button-50")


// Access the button and the div tag
const reveal = document.querySelector(".reveal-button")
const content = document.querySelector(".content")

// Adding event listener

// reveal.addEventListener("click", () => {
//     if(content.classList.contains("hidden")){
//         content.classList.remove("hidden")
//     } else {
//         content.classList.add("hidden")
//     }
// })

const reviews = [
    "Rated 5/5 by all schools in the UK- school A",
    "Excellent learning resource, much more captivating then traditional methods - school B",
    "Invaluable resource - school D",
    "With the emphasis on STEM studies, Non-STEM subjects have been neglected, however this tool greatly improves our ability to teach non-stem subjects - School E"
]

// Accessing the p tags in the div carousel 


const text = document.getElementById("quote-display")

let currentQuoteIndex = 0

function displayNextQuote(){
    text.innerHTML = reviews[currentQuoteIndex]
    currentQuoteIndex = (currentQuoteIndex + 1) % reviews.length
}

displayNextQuote()

setInterval(displayNextQuote, 5000)
