const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let noClicking = false;

const imagesArray = [
  'url("images/photo1.jpeg")',
  'url("images/photo2.jpeg")',
  'url("images/photo3.jpeg")',
  'url("images/photo4.jpeg")',
  'url("images/photo5.jpeg")',
  'url("images/photo1.jpeg")',
  'url("images/photo2.jpeg")',
  'url("images/photo3.jpeg")',
  'url("images/photo4.jpeg")',
  'url("images/photo5.jpeg")'
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledImages = shuffle(imagesArray);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForImages(imagesArray) {
  for (let image of imagesArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    //newDiv.classList.add(image);
    newDiv.setAttribute('src', image);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains('selected')) return;
  
  //Select which card was clicked on
  
  let clickedCard = event.target;

  //Get and set color of card
  let imgSrc = clickedCard.getAttribute('src');

  clickedCard.style.backgroundImage = imgSrc;

  //Check if a card has already been clicked
  if (!card1 || !card2) {
    // Add selected class to the card clicked
    clickedCard.classList.add('selected');

    //Assign the clicked card to the first card 
    card1 = card1 || clickedCard;

    //Check if second card clicked is the first card and if so its value  is null
    //Otherwise it is assigned to the second card;
    card2 = clickedCard === card1 ? null : clickedCard;
  }

  //Check if there are two cards clicked
  if (card1 && card2){
    noClicking = true;
    let card1Image = card1.style.backgroundImage;
    let card2Image = card2.style.backgroundImage;

    //Evaluate if the two cards are a match
    if (card1Image === card2Image){
      //If the cards are a match
        //Disable any pointer events on both cards
        card1.style.pointerEvents = "none";
        card2.style.pointerEvents = "none";
        //Reset the value of both cards to null
        card1 = null;
        card2 = null;
        noClicking = false;
    } else {
      // Flip the cards back to no color and unselect them after 1 second
        setTimeout(function() {
        card1.style.backgroundImage = '';
        card2.style.backgroundImage = '';
        card1.classList.remove('selected');
        card2.classList.remove('selected');
        card1 = null;
        card2 = null;
        noClicking = false;
        }, 1000)
      }
    }  
  }

  

// when the DOM loads
createDivsForImages(shuffledImages);
