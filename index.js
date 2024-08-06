/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    
    let gameLength = games.length; //tells how many objects are in the games array for forloop

    for (let iGames = 0; iGames < gameLength; iGames++) { // loop over each item in the data game array

        const gameDiv = document.createElement("div"); // create a new div element, which will become the game card
        gameDiv.classList.add("game-card");// add the class game-card to the list

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        gameDiv.innerHTML = `
            <div class = "games">
                <h2> ${games[iGames].name} </h2>
                <img src="${games[iGames].img}" class="game-img" alt="Image of ${games[iGames].name}" >
                <p> Looking for an exciting game? Play ${games[iGames].name}! ${games[iGames].description} 
                    With ${games[iGames].backers} backers, you can be sure it is a great way to get rid of boredom. Give it a try! 
                </p> 
            </div>
        `;

        // append the game to the games-container
        // const ourGamesHeading = document.getElementById('button-container');
       // parentElement.insertBefore(gameDiv, ourGamesHeading.nextSibling);

       const parentElement = document.getElementById('games-container');
       parentElement.appendChild(gameDiv);
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games - ah im there now :)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
 const contributionsCard = document.getElementById('num-contributions'); 
// set the initial value
 const iniVal = 0; 

// use reduce() to count the number of total contributions by summing the backers
const totCont = GAMES_JSON.reduce((accumulator, games) => {
                return accumulator += games.backers;
                }, iniVal)

contributionsCard.textContent = totCont; //this assigning gave me so much trouble for no reason

// set the inner HTML using a template literal and toLocaleString to get a number with commas
const numberContributions = Number(contributionsCard.textContent);
contributionsCard.innerHTML = `
    <p> 
        ${numberContributions.toLocaleString()}
    </p>
`


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totRaised = GAMES_JSON.reduce((accumulator, games) => {
                  return accumulator += games.pledged;
                  }, iniVal)

raisedCard.textContent = totRaised;

// set inner HTML using template literal
const numberRaised = Number(raisedCard.textContent);
raisedCard.innerHTML = `
    <p> 
        $${numberRaised.toLocaleString()}
    </p>
`


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totGames = GAMES_JSON.length; //Q: why didn't games.length work here as well?
// set inner HTML using template literal
const numberGames = Number(totGames);

gamesCard.innerHTML = `
    <p> 
        ${numberGames.toLocaleString()}
    </p>
`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((games) => {
        return games.pledged < games.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    // console.log(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((games) => {
        return games.pledged >= games.goal;
    });

    addGamesToPage(fundedGames);
    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON); // add all games from the JSON data to the DOM
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// if amount pledged is less than goal, increase count. else, don't
const unfundedGamesCount = GAMES_JSON.reduce((count, games) => {
    return games.pledged < games.goal ? count + 1: count;
    }, 0);

const unfundedCountNumber = Number(unfundedGamesCount);


// use ternary operator to determine this or these
let thisOrThese = `${unfundedGamesCount === 1 ? "this": "these"}`;

// use ternary operator to determine game or games
let sOrNot = `${unfundedGamesCount === 1 ? "": "s"}`;

// use ternary operator to determine remain or remains
let remainsOrNot = `${unfundedGamesCount === 1 ? "s": ""}`;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `
    <p> 
        A total of ${numberRaised.toLocaleString()} has been raised for ${numberGames.toLocaleString()} games. 
        Currently, ${unfundedCountNumber.toLocaleString()} remain${remainsOrNot} unfunded. 
        We need your help to fund ${thisOrThese} amazing game${sOrNot}!
    </p>
`

// create a new DOM element containing the template string and append it to the description container
const newDisplayStr = document.createElement('div');
newDisplayStr.innerHTML = displayStr;

// Append the new element to the description container
descriptionContainer.appendChild(newDisplayStr);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item