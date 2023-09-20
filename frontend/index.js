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

const images = [
     "assets/five-stars.webp",
     "assets/approved-icon.png",
     "assets/smiley-face.png",
     "assets/students.png"
 ]

// Accessing the p tags in the div carousel 

const text = document.getElementById("quote-display")
const img = document.getElementById("slide-show-image")

let currentQuoteIndex = 0
let currentImageIndex = 0

function displayNextQuote(){
    text.innerHTML = reviews[currentQuoteIndex]
    img.src = images[currentImageIndex]

    currentQuoteIndex ++
    currentImageIndex ++ 

    if (currentQuoteIndex === reviews.length){
        currentQuoteIndex = 0
    }

    if (currentImageIndex === images.length){
        currentImageIndex = 0
    }

    console.log(images[currentImageIndex]);
}

displayNextQuote()

setInterval(displayNextQuote, 3000)