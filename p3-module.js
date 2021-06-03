//Module Fucntions

// Returns true if the coin function parameter is a valid coin value of either 1, 5, 10, 25, 50, or 100
const coinValues = [1, 5, 10, 25, 50, 100];
const validDenomination = (coin) => coinValues.indexOf(coin) !== -1;

//console.log statements to check validDenomination function
console.log(validDenomination(5)); //true
console.log(validDenomination(17)); //false

// Returns the calculated value of a single coin object from the obj function parameter
function valueFromCoinObject(obj) {
  const { denom = 0, count = 0 } = obj;
  return denom * count;
}

//Iterates through an array of coin objects and returns the final calculated value of all coin objects
function valueFromArray(arr) {
    return  arr.reduce((accumulator, total) => {
        return accumulator + valueFromCoinObject(total)}, 0);
    
}

//Calls and returns the result of valueFromArray() function
//which will be the value of all coin objects with the coinage array function parameter
function coinCount(...coinage) {
    //console.log(...coinage)
  return valueFromArray([...coinage]);
}

//testing the four functions
console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));  // Extra credit

//export statement
module.exports = {
  coinCount, coins
};