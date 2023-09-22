
const reviews = [
    "Rated 5/5 by all schools in the UK. Highly recommended teaching platform! - school A",
    "Excellent learning resource, much more captivating then traditional methods - school B",
    "Invaluable resource. The students are showing greater engagement in non STEM subjects - school D",
    "With the emphasis on STEM studies, Non-STEM subjects have been neglected, however this tool greatly improves our ability to teach non-stem subjects - School E"
]

const images = [
     "assets/five-stars.webp",
     "assets/approved-icon.png",
     "assets/smiley-face.png",
     "assets/students.png",
     "assets/graduation.png"
 ]


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

}

displayNextQuote()

setInterval(displayNextQuote, 3000)
