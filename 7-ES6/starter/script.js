/*
function Person(name) {
    this.name = name;
}

Person.prototype.myFriends5 = function(friends) {
    var arr = friends.map(function(el) {
        return this.name + ' is friends with ' + el;
    }.bind(this));

    console.log(arr);
}

var friends = ["Bob", "Jane", "Mark"];
//new Person("John").myFriends5(friends);

Person.prototype.myFriends6 = function(friends) {
    var arr = friends.map(el => `${this.name} is friends with ${el}`);

    console.log(arr);
}

new Person("Jack").myFriends6(friends);

// ------------------------------ DESTRUCTURING
const [name, age] = ['John', 26];

const obj = {
    firstName: "John",
    lastName: "Smith"
};

const {firstName, lastName} = obj;
console.log(`${firstName} ${lastName}`);

const {firstName: a, lastName: b} = obj;
console.log(a + " " + b);

// ------------------------------ ARRAYS
const boxes = document.querySelectorAll(".box");

// ES5 -- using slice and call to convert NodeList to an Array
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(el) {
    el.style.backgroundColor = "dodgerblue";
});

// ES6 -- from takes an iterable object and converts to array
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(el => el.style.backgroundColor = "orange");



// ES5 -- cannot use continue/breaks in forEach, so need to use
// simple loop.
for(var i = 0; i < boxesArr5.length; i++) {
    if(boxesArr5[i].className === "box blue") {
        continue;
    }

    boxesArr5[i].textContent = "I changed to blue!";
}

// ES6 -- new "for of" loop that lets you use continue/break
for(const cur of boxesArr6) {
    if(cur.className === "box blue") {
        continue;
    }

    cur.textContent = "I changed to blue!";
}


var ages = [12, 17, 8, 21, 14, 11];

// ES5 -- use indexOf and a mapping function to find who is >= 18
// and then access with the array 
var full = ages.map(function(cur) {
    return cur >= 18;
});
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

// ES6 -- findIndex and find lets you search using a predicate.
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));

// ------------------------------- SPREAD Operator

function addfourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);


// ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);


*/

class Specs {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

// in charge of 1) parks and 2) streets
// 3 parks and 4 streets
// all parks and streets have name and build year
// final report:
// tree density of each park in town (# of trees / park area)
// average age of each town's park (sum of all ages / # parks)
// name of park with more than 1000 trees
// total and average length of town's streets
// size classification of all streets: tiny/small/normal/big/huge,
//      if size is unknown, default is normal