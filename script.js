const cards = document.querySelectorAll('.card');
const restartBtn = document.querySelector('.restart button');


const inerrText = [
  [1,2,3,4,5,6,1,2,3,4,5,6],
  ['A','B','C','D','E','F','A','B','C','D','E','F']
  ];
let firstCard, secendCard;
let firstCardText, secendCardText;
let gameOver = 0;


//Loading Number When page will load
const loadNumbers = () => {
  const i = Math.floor(Math.random()*2);
  if (i>1) return;
  
  //Randmize Array Of Numbers
  const randmize = inerrText[i].sort(() => 0.5 - Math.random());

  //Set Numbers
  randmize.forEach((num, i) => {
    cards[i].lastElementChild.innerText = num;
  });
  
};
loadNumbers();


//Starting Of Game 
const startGmme = (card) => {
  //Get Back Face Text
  const backFace = card.querySelector('.back');
  card.classList.add('flip');
  //Get first Card
  if (!firstCard) {
    firstCard = card;
    firstCardText = backFace.innerText;
    return;
  };
  //Get Secend Card
  secendCard = card;
  secendCardText = backFace.innerText;
  
  if (firstCardText === secendCardText) {
     cardsMatched();
  }else {
    //Disable all card when two card are fliped
    cards.forEach(card => {
      card.classList.add('dis');
    });
    
     cardsNotMatch();
  };
  
};

//make cards Clickable add Listener
cards.forEach( card => {
  card.addEventListener('click', () => {
    startGmme(card);
  });
});


//When Both Card Match
const cardsMatched = () => {
  firstCard = '';
  secendCard = '';
  
  gameOver++;
  //call end func when game will end 
  if (gameOver >= cards.length / 2) {
    gameOver = 0;
    endGame();
  };
};


//When Both Card Are Not Match
const cardsNotMatch = () => {
  
  setTimeout(() => {
    firstCard.classList.add('wrong');
    secendCard.classList.add('wrong');
  }, 600);
  
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secendCard.classList.remove('flip');
    
    //Remove Disable Class
    cards.forEach(card => {
      card.classList.remove('dis');
      if (card.classList.contains('wrong')) {
        card.classList.remove('wrong');
      };
    });
    
    firstCard = '';
    secendCard = '';
    
  }, 1000);
  
};


//RESTART FUNCTION
const resatrtGame = () => {
  //Reset All
  if (firstCard || secendCard) {
    firstCard = '';
    secendCard = '';
    firstCardText = '';
    secendCardText = '';
    gameOver = 0;
    
    cards.forEach(card => {
      card.classList.remove('flip');
    });
    
    setTimeout(() => {
      loadNumbers();
    }, 500);
  };
};
restartBtn.addEventListener('click', resatrtGame);


//End Of Game
const endGame = () => {
  //Lets End the Game
  setTimeout(() => {
    cards.forEach(card => {
      card.classList.remove('flip');
    });
    loadNumbers();
  }, 1100);
  
};

//Kshapi