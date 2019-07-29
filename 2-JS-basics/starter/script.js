var markMass = 60;
var markHeight = 1.7;

var johnMass = 55;
var johnHeight = 1.5;

var markBMI = markMass / (markHeight * markHeight);
var johnBMI = johnMass / (johnHeight * johnHeight);

var isMarkGreater = markBMI > johnBMI;
console.log("Is Mark's BMI higher than John's? " + isMarkGreater);

// =============================================================== //
// Coding Challenge 2
// =============================================================== //

var johnScore = (89 + 120 + 103) / 3;
var mikeScore = (116 + 94 + 123) / 3;
var maryScore = (97 + 134 + 105) / 3;

if(johnScore > mikeScore && johnScore > maryScore) {
    console.log("John won with " + johnScore + " points");
} else if (mikeScore > johnScore && mikeScore > maryScore) {
    console.log("Mike won with " + mikeScore + " points");
} else if(maryScore > mikeScore && maryScore > johnScore) {
    console.log("Mary won with " + maryScore + " points");
} else {
    console.log("There was a tie with " + mikeScore + " points");
}

// =============================================================== //
// Coding Challenge 3
// =============================================================== //

var dinnerPrices = [124, 48, 268];
var tips = [calculateTip(dinnerPrices[0]), calculateTip(dinnerPrices[1]), calculateTip(dinnerPrices[2])];
var finalPrices = [tips[0] + dinnerPrices[0], tips[1] + dinnerPrices[1], tips[2] + dinnerPrices[2]];

function calculateTip(bill) {
    var tip;
    if(bill < 50) {
        tip = 0.2;
    } else if(bill >= 50 || bill <= 200) {
        tip = 0.15;
    } else {
        tip = 0.1;
    }

    return bill * tip;
}


// tip 20% when bill < 50, 15% when bill is between 50 and 200, 10% when bill is more than 200
// return array containing all 3 tips, and an array containing final bill + tips

// =============================================================== //
// Coding Challenge 4
// =============================================================== //

var john = {
    fullName: 'John Smith', 
    mass: 70,
    height: 1.8,
    calcBMI: function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

var mark = {
    fullName: 'Mark Smith',
    mass: 60,
    height: 1.6,
    calcBMI: function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

if(mark.calcBMI() > john.calcBMI()) {
    console.log(mark.fullName + "'s BMI is higher: " + mark.bmi);
} else if(john.bmi > mark.bmi) {
    console.log(john.fullName + "'s BMI is higher: " + john.bmi);
} else {
    console.log("They're the same BMI: " + john.bmi + mark.bmi);
}
// =============================================================== //
// Coding Challenge 5
// =============================================================== //

var dinners = {
    bills: [124, 48, 268, 180, 42],
    tips: [],
    totals: [],
    calcTip: function() {
        for(var i = 0; i < this.bills.length; i++) {
            var percent;
            if(this.bills[i] < 50) {
                percent = 0.2;
            } else if(this.bills[i] >= 50 && this.bills[i] <= 200) {
                percent = 0.15;
            } else {
                percent = 0.1; 
            }
            var tip = percent * this.bills[i];
            this.tips.push(tip);
            this.totals.push(tip + this.bills[i]);
        }
    },
    avgTips: calcAverageTips(tips)
}

dinners.calcTip();
console.log(dinners.tips);
console.log(dinners.totals);

var markDinners = {
    bills: [77, 375, 110, 45],
    tips: [],
    totals: [],
    calcTip: function() {
        for(var i = 0; i < this.bills.length; i++) {
            var percent;
            if(this.bills[i] < 100) {
                percent = 0.2;
            } else if(this.bills[i] >= 10 && this.bills[i] <= 300) {
                percent = 0.1;
            } else {
                percent = 0.25; 
            }
            var tip = percent * this.bills[i];
            this.tips.push(tip);
            this.totals.push(tip + this.bills[i]);
        }
    },
    avgTips: calcAverageTips(tips)
}
markDinners.calcTip();

function calcAverageTips(arr) {
    var sum = 0;
    for(var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum / arr.length;
}

if(markDinners.avgTips > dinners.avgTips) {
    console.log("Mark paid more tips on average: " + markDinners.avgTips);
} else if(dinnerPrices.avgTips > markDinners.avgTips) {
    console.log("John paid more tips on average: " + dinners.avgTips);
} else {
    console.log("They paid the same tips on average: " + dinners.avgTips);
}
