import { fifaData } from "./fifa.js";

console.log(fifaData);

const result = fifaData.filter((filterFirst) => {
  return filterFirst.Year === 2014 && filterFirst.Stage === "Final";
});
console.log(result[0]["Home Team Name"]); //taking results only index to call fifaData with bracket notations properties.
console.log(result[0]["Away Team Name"]);
console.log(result[0]["Home Team Goals"]);
console.log(result[0]["Away Team Goals"]);

// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with 
only finals data */

function getFinals(data) {                    //we're using our data parameter to call fifaData.
  const finalData =  data.filter((filterFinals) =>       //We're pointing our callback filterFinals towards the object property 'Stage' 
    filterFinals.Stage === "Final"    // We need to remember to use strict equality. It's just best pratice, 
  );                                         // and less prone to bug.
  return finalData;
}
console.log(getFinals(fifaData));             

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, 
and returns an array called `years` containing all of the years in the dataset */

function getYears(data, callback) {              // our callback is going to be the getFinals function. It'll always return final.
  const sortedYears = [];                        // creating empty array for the years 
  callback(data).map((years) => sortedYears.push(years["Year"]));  // we take our callback getFinals with the data fifaData         
  return sortedYears;  // We then are using .map() with our callback years to point towards a push towards our array.
}
console.log(getYears(fifaData, getFinals));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function 
`getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all 
winning countries in an array called `winners` */

function getWinners(data, callback) {            
  const sortedWinners = [];            //empty array for our winners.
  callback(data).filter((WLdata) => { //getFinals + fifadata being filtered to return if our home team goals are greater than our
    if (WLdata["Home Team Goals"] > WLdata["Away Team Goals"]) { //away goals. 
      sortedWinners.push(WLdata["Home Team Name"]);    //If they are we want to push that. If away wins, we want to push those.
    } else {
      sortedWinners.push(WLdata["Away Team Name"]);
    }
  });
  return sortedWinners;  // just returning our orginal array we created with the new data
}

console.log(getWinners(fifaData, getFinals));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts 
the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(callback, callback2) {  // Our year is our first callback with returns the final winners.
  const year = callback(fifaData, getFinals);     // Same thing with our second constant - country. 
  const country = callback2(fifaData, getFinals); // These will be used to return our getFinals function data from our fifaData.
  const win = [];

  year.forEach((years, index) => {      //we're asking for our first callback to return each each country inside fifaData, and year.
    const countries = country[index];        // each country is now being pushed inside our new win array with the template literal.
    win.push(`In ${years}, ${countries} won the world cup!`); 
  });
  return win;
}
console.log(getWinnersByYear(getYears, getWinners));

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` 
and returns the the average number of home team goals and away team goals scored per match 
(Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {  //just the data of fifaData
  const totalGoals = data.reduce(  //constant totalGoals will now use the array reduce method to figure out this math. 
    (acum, goals) => acum + goals["Home Team Goals"] + goals["Away Team Goals"], //bracket notation callback is taking the data properties
    0
  );
  return (totalGoals / data.length).toFixed(2); //using toFixed to return an exact point.
}

console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {
  /* code here */
}

getCountryWins();

/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {
  /* code here */
}

getGoals();

/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
  /* code here */
}

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


// - [ ] Use `.map` to format country names into `<h1>` HTML headers.


function countryHTML(data){
     return data.map((z) => "<h1>" + z['Home Team Name'] + "</h1>" + "<h1>" + z['Away Team Name'] + "</h1>")
  // return data.map((z) => `<h1>${z['Home Team Name']} VS ${z['Away Team Name']}</h1>`)
}
console.log(countryHTML(fifaData))

