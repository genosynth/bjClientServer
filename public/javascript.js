let wins = 0;
let draws = 0;
let losses = 0;
let remainingCards = []; //remainingCards is always being updated when specific cards are drawn
let showCard = false;
let myCards = [];
let myTotal;
let hisTotal;
let hisCards = [];
let deal = true;
let hit = false;

standAct = false;


var cardDatabase = {
  AH: {"url":"./Pictures/AceHearts.png", "valued": 11},
  AD: {"url":"./Pictures/AceDiamonds.png", "valued": 11},
  AS: {"url":"./Pictures/AceSpades.png", "valued": 11},
  AC: {"url":"./Pictures/AceClubs.png", "valued": 11},
  "2H":{"url":"./Pictures/2Hearts.png", "valued": 2},
  "2D":{"url":"./Pictures/2Diamonds.png", "valued": 2},
  "2S": {"url":"./Pictures/2Spades.png", "valued": 2},
  "2C":{"url":"./Pictures/2Clubs.png", "valued": 2},
  "3H": {"url":"./Pictures/3Hearts.png", "valued": 3},
  "3D":{"url":"./Pictures/3Diamonds.png", "valued": 3},
  "3S":{"url":"./Pictures/3Spades.png", "valued": 3},
  "3C": {"url":"./Pictures/3Clubs.png", "valued": 3},
  "4H": {"url":"./Pictures/4Hearts.png", "valued": 4},
  "4D":{"url":"./Pictures/4Diamonds.png", "valued": 4},
  "4S": {"url":"./Pictures/4Spades.png", "valued": 4},
  "4C":{"url":"./Pictures/4Clubs.png", "valued": 4},
  "5H":{"url":"./Pictures/5Hearts.png", "valued": 5},
  "5D":{"url":"./Pictures/5Diamonds.png", "valued": 5},
  "5S": {"url":"./Pictures/5Spades.png", "valued": 5},
  "5C": {"url":"./Pictures/5Clubs.png", "valued": 5},
  "6H": {"url":"./Pictures/6Hearts.png", "valued": 6},
  "6D": {"url":"./Pictures/6Diamonds.png", "valued": 6},
  "6S": {"url":"./Pictures/6Spades.png", "valued": 6},
  "6C":{"url":"./Pictures/6Clubs.png", "valued": 6},
  "7H":{"url":"./Pictures/7Hearts.png", "valued": 7},
  "7D":{"url":"./Pictures/7Diamonds.png", "valued": 7},
  "7S":{"url":"./Pictures/7Spades.png", "valued": 7},
  "7C": {"url":"./Pictures/7Clubs.png", "valued": 7},
  "8H":{"url":"./Pictures/8Hearts.png", "valued": 8},
  "8D":{"url":"./Pictures/8Diamonds.png", "valued": 8},
  "8S": {"url":"./Pictures/8Spades.png", "valued": 8},
  "8C": {"url":"./Pictures/8Clubs.png", "valued": 8},
  "9H": {"url":"./Pictures/9Hearts.png", "valued": 9},
  "9D": {"url":"./Pictures/9Diamonds.png", "valued": 9},
  "9S":{"url":"./Pictures/9Spades.png", "valued": 9},
  "9C":{"url":"./Pictures/9Clubs.png", "valued": 9},
  "10H":{"url":"./Pictures/10Hearts.png", "valued": 10},
  "10D": {"url":"./Pictures/10Diamonds.png", "valued": 10},
  "10S":{"url":"./Pictures/10Spades.png", "valued": 10},
  "10C":{"url":"./Pictures/10Clubs.png", "valued": 10},
  JH:{"url":"./Pictures/JHearts.png", "valued": 10},
  JD: {"url":"./Pictures/JDiamonds.png", "valued": 10},
  JS:{"url":"./Pictures/JSpades.png", "valued": 10},
  JC:{"url":"./Pictures/JClubs.png", "valued": 10},
  QH:{"url":"./Pictures/QHearts.png", "valued": 10},
  QD:{"url":"./Pictures/QDiamonds.png", "valued": 10},
  QS:{"url":"./Pictures/QSpades.png", "valued": 10},
  QC:{"url":"./Pictures/QClubs.png", "valued": 10},
  KH:{"url":"./Pictures/KHearts.png", "valued": 10},
  KD:{"url":"./Pictures/KDiamonds.png", "valued": 10},
  KS:{"url":"./Pictures/KSpades.png", "valued": 10},
  KC:{"url":"./Pictures/KClubs.png", "valued": 10},
};
 
function drawCard(number) {
  let num = Math.floor(Math.random() * (number));
  number = num;
  let card = deckOfCards[num];
  delete deckOfCards[num]
  deckOfCards = deckOfCards.filter((el) => {
    return el != null && el != "";
  });
 remainingCards = deckOfCards;
 return card;
  
}
function dealCards() {
  deckOfCards = Object.keys(cardDatabase); //creates an array with all cards
  //myCard1
  let card = drawCard(52);
  myCards.push(card);
  //myCard2
  card = drawCard(51);
  myCards.push(card);
  //hisCard1
  card = drawCard(50);  
  hisCards.push(card);
  //hisCard2
  card = drawCard(49);  
  hisCards.push(card);

}

function checkMyAce() {
  for (i = 0; i < myCards.length; i++) {
    if (myCards[i].charAt(0) === "A") {
      //myAces = myAces + 1;
      cardDatabase[myCards[i]].valued = 1;
        if (myTotal < 22){
          return;
        }

      //myCards[i].charAt(0) = 'U'

      console.log(cardDatabase[myCards[i]].valued);
    }
    /* if (myAces >= 2){
            
        }
        */
  }
}

function checkHisAce() {
  if (hisTotal < 22) {
    return;
  }
  //let myAces = 0;
  for (i = 0; i < hisCards.length; i++) {
    if (hisCards[i].charAt(0) === "A") {
      cardDatabase[hisCards[i]].valued = 1;

      //console.log(cardValues[hisCards[i]])
    }
  }

  calcValues();
  showHisResults();
}

function calcValues() {
  let myValue = 0;
  if (myCards[0].includes('A') && myCards[1].includes('A')){
    cardDatabase[myCards[0]].valued=1;
    
    for (i = 0; i < myCards.length; i++) {
      myValue = myValue + cardDatabase[myCards[i]].valued;
    }
    
  

  } else for (i = 0; i < myCards.length; i++) {
    myValue = myValue + cardDatabase[myCards[i]].valued;
  }
  myTotal = myValue;
  

  let hisValue = 0;

  if (hisCards[0].includes('A') && hisCards[1].includes('A')){
    cardDatabase[hisCards[0]].valued=1;
    
    for (i = 0; i < hisCards.length; i++) {
      hisValue = hisValue + cardDatabase[hisCards[i]].valued;
    }
    
  

  } else for (i = 0; i < hisCards.length; i++) {
    hisValue = hisValue + cardDatabase[hisCards[i]].valued;
  }
  hisTotal = hisValue;

  //console.log("His Total is " + hisTotal);
}

function frontEndCards() {
  if (deal === false) {
    return;
  }
  hit = true;
  standAct = true;
  dealCards();
  

  for (let i = 0; i < 2; i++) {
    //Displaying my 2 Cards
    var img = document.createElement("img");
    img.src = cardDatabase[myCards[i]].url;
    
    var src = document.getElementById("mycards");
    src.appendChild(img);
  }

  for (let i = 0; i < 1; i++) {
    //Displaying his 2 Cards
    var img = document.createElement("img");
    img.src = cardDatabase[hisCards[i]].url;
    var src = document.getElementById("hiscards");
    src.appendChild(img);
  }

  var img = document.createElement("img");
  img.src = "./Pictures/BackCard.png";
  var src = document.getElementById("hiscards");
  src.appendChild(img);
  showMyResults();
  deal = false;
  calcValues();
  if (myTotal === 22){
    checkMyAce();
  }
  if (myTotal != 21) {
    return;
  }
  document.getElementById("container").innerHTML = "YOU GOT BLACKJACK";
  standAct = true;
  deal = false;
  stand();
  showScore();
}

function hitCard() {
  //User hits a card
  if (hit === false) {
    return;
  }
  
  let card = drawCard(remainingCards.length-1);
  console.log(card);
  var img = document.createElement("img");
  img.src = cardDatabase[card].url;
  var src = document.getElementById("mycards");
  src.appendChild(img);
  myCards.push(card);
  calcValues();
  if (myTotal > 21) {
    //Checking Ace and updating your value
    checkMyAce();
    calcValues();
    showMyResults();
  }
  if (myTotal > 21) {
    document.getElementById("container").innerHTML = "YOU LOOSE";
    losses = losses + 1;
    hit = false;
    standAct = false;
    showHisResults();
    revealCard();
  }
  if (myTotal === 21) {
    revealCard();
    botDecision();
    showHisResults();

    //document.getElementById("container").innerHTML = "BLACKJACK! YOU WIN!" ;
    //wins = wins + 1;
    deal = false;
    hit = false;
    standAct = false;
    //revealCard();
  }
  showMyResults();

  showScore();
  deal = false;
}

function revealCard() {
  let hisMenu = document.getElementById("hiscards");
  hisMenu.removeChild(hisMenu.lastElementChild);
  var img = document.createElement("img");
  img.src = cardDatabase[hisCards[1]].url;
  var src = document.getElementById("hiscards");
  src.appendChild(img);
  showCard = true;
}

function stand() {
  if (standAct === false) {
    return;
  }
  revealCard();
  calcValues();
  showHisResults();
  botDecision();
  showHisResults();
  standAct = false;
  hit = false;
}

function botDecision() {
  while (hisTotal < myTotal && myTotal <= 21) {
    let card = drawCard(remainingCards.length-1)
    hisCards.push(card);
    let y = hisCards.length;

    //console.log(remainingCards);

    var img = document.createElement("img");
    img.src = cardDatabase[hisCards[y - 1]].url;
    var src = document.getElementById("hiscards");
    src.appendChild(img);
    showMyResults();
    checkHisAce();
  }

  if (hisTotal > 21) {
    document.getElementById("container").innerHTML = "YOU WIN";
    wins = wins + 1;
  }
  if (myTotal < 21 && hisTotal > myTotal && hisTotal < 22) {
    document.getElementById("container").innerHTML = "YOU LOOSE";
    losses = losses + 1;
  }

  if (myTotal === hisTotal) {
    document.getElementById("container").innerHTML = "ITS A TIE";
    draws = draws + 1;
  }
  deal = false;
  showScore();
}
function showMyResults() {
  calcValues();
  //console.log("Your Total is " + myTotal);

  document.getElementById("myresult").innerHTML = "Your Total is : " + myTotal;
}

function showHisResults() {
  calcValues();
  //console.log("Opponent's Total is " + hisTotal);

  document.getElementById("hisresult").innerHTML =
    "Opponent's Total is : " + hisTotal;
  if (showCard === true) {
    document.getElementById("hisresult").innerHTML =
      "Opponent's Total is : " + hisTotal;
  }
}

function replay() {
  //location.reload();
  remainingCards = []; //remainingCards is always being updated when specific cards are drawn
  showCard = false;
  myCards = [];
  myTotal = 0;
  hisTotal = 0;
  hisCards = [];

  cardDatabase["AH"].valued = 11;
  cardDatabase["AC"].valued = 11;
  cardDatabase["AS"].valued = 11;
  cardDatabase["AD"].valued = 11;

  deal = true;
  hit = false;
  standAct = false;
  document.getElementById("hisresult").innerHTML = "";
  document.getElementById("myresult").innerHTML = "";
  document.getElementById("hiscards").innerHTML = "";
  document.getElementById("mycards").innerHTML = "";
  document.getElementById("container").innerHTML = "";
}

function showScore() {
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("draws").innerHTML = draws;
  document.getElementById("losses").innerHTML = losses;
}

function checkPoints() {
  let points = (wins*3)+(draws)-(losses*3);

  document.getElementById("points").innerHTML = points;
  document.getElementById("score-submit").value = points;
  
}

