const cards = document.querySelectorAll('p');
async function getApiData() {
  const res = await fetch(`http://localhost:3000/quiz`);
  const data = await res.json();
  const filteredApiData = data.slice(0, 6);
  const cardsData = filteredApiData.flatMap((item) => {
    return [item.question, item.correct_answer];
  });

  shuffleArray(cardsData);
  cards.forEach((card, index) => {
    card.textContent = cardsData[index];
  });
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

getApiData();