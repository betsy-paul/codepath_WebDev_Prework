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
                <p> Name: ${games[iGames].name} 
                    <br>
                    About: ${games[iGames].description} 
                    <br>
                    Amount Raised: ${games[iGames].pledged} 
                    <br>
                    Backers: ${games[iGames].backers} 
                    <br>
                    Target: ${games[iGames].goal} 
                </p> 
            </div>
        `;

        // append the game to the games-container

       const parentElement = document.getElementById('games-container');
       parentElement.appendChild(gameDiv);
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((games) => {
        return games.pledged < games.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
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

// make a search bar for the array of games in GAMES_JSON
searchBar.addEventListener('keyup', (e) => {
    let searchString = e.target.value.trim().toLowerCase();

    // show only games that passed the filter
    function filterGames() {
        deleteChildElements(gamesContainer);

        if (searchString === "") {
            // when search bar is empty, show all games)
            addGamesToPage(GAMES_JSON);
        } else {
            // use filter() to get a list of games that meet filter requirement
            let gamesThatPassed = GAMES_JSON.filter((games) => {
                return games.name.toLowerCase().includes(searchString) || games.description.toLowerCase().includes(searchString);
            });

            // extra if statement for error if search string doesnt match anything
            if (gamesThatPassed.length === 0) {
                // Display a message when no games match the search
                const noResultsMessage = document.createElement('p');
                noResultsMessage.textContent = 'Sorry, no games match that search.';
                gamesContainer.appendChild(noResultsMessage);
            } else {
                addGamesToPage(gamesThatPassed);
                // use the function we previously created to add filtered games to the DOM
            }
        }
    }

    filterGames();
});


// filter field stuff idk
function backersFilter()  {
    const copyOfGames = [...GAMES_JSON];
    const orderedGames =  copyOfGames.sort((item1, item2) => {
        return item2.backers - item1.backers;
    });
    addGamesToPage(orderedGames);
}

const backersBtn = document.getElementById("backers-btn");
backersBtn.addEventListener("click", backersFilter);


function amountRFilter()  {
    const copyOfGames = [...GAMES_JSON];
    const orderedGames =  copyOfGames.sort((item1, item2) => {
        return item2.pledged - item1.pledged;
    });

    addGamesToPage(orderedGames);
}

const amountBtn = document.getElementById("amount-btn");
amountBtn.addEventListener("click", amountRFilter);


function targetFilter()  {
    const copyOfGames = [...GAMES_JSON];
    const orderedGames =  copyOfGames.sort((item1, item2) => {
        return item2.goal - item1.goal;
    });
    addGamesToPage(orderedGames);
}

const targetBtn = document.getElementById("target-btn");
targetBtn.addEventListener("click", targetFilter);