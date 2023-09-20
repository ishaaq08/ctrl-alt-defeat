const cards = document.querySelectorAll('.pair-container');

let selectedCards = [];
let matchedCards = [];
console.log(window.innerHeight, window.innerWidth)

function openPopup() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const leftPosition = (screenWidth - 700)/2
  const topPosition = (screenHeight -700)/2
  return window.open('matchGame/popup.html', 'center window', `width=700,height=700,left=${leftPosition},top=${topPosition}, location=0`);
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
async function getApiData() {
  const res = await fetch(`http://localhost:3000/quiz/random/all`);
  const data = await res.json();
  const filteredApiData = data.slice(0, 6);

  const cardsData = filteredApiData.flatMap((item) => {
    return [item.question, item.correct_answer];
  });

  // shuffleArray(cardsData);
  cards.forEach((card, index) => {
    card.textContent = cardsData[index];
  });
  
}
cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (selectedCards.length < 2 && !matchedCards.includes(cards)) {
      selectedCards.push(card);

      console.log(selectedCards)

      if (selectedCards.length === 2) {
        const [firstCard, secondCard] = selectedCards;
        const class1 = firstCard.getAttribute('class')
        const class2 = secondCard.getAttribute('class')

        if ((class1 === class2) && (firstCard.innerHTML !== secondCard.innerHTML)) {
          matchedCards.push(firstCard, secondCard);
          selectedCards[0].style.backgroundColor = 'green';
          selectedCards[1].style.backgroundColor = 'green';
          selectedCards = [];

          console.log('Correct pair chosen');
          console.log(matchedCards)

          if (matchedCards.length === cards.length) {
            openPopup();
          } else{
            selectedCards = [];
          }
        }else {   
          console.log('Incorrect pair chosen');
          selectedCards[0].classList.add('changeBackground');
          selectedCards[1].classList.add('changeBackground');
          setTimeout(() => {
            console.log(selectedCards);
            selectedCards[0].classList.remove('changeBackground');
            selectedCards[1].classList.remove('changeBackground');
            selectedCards = [];
          }, 1000);
          
        }
      }
    }
  })
})


getApiData();

