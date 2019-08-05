
// ------------------ BUDGET CONTROLLER
var budgetController = (function() {
    var Expense = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalInc) {
        if(totalInc > 0) {
            this.percentage = Math.round(this.value / totalInc * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    var Income = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1,
    };

    var calculateTotal = function(type) {
        var sum = 0;

        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    return {
        addItem: function(type, desc, val) {
            var newItem, ID;

            // create new id
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // create new item based on income or expense
            if(type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, desc, val);
            }

            // push it into our data structure 
            data.allItems[type].push(newItem);

            // return new item
            return newItem;
        },

        deleteItem: function(type, id) {
            var ids, index; 

            ids = data.allItems[type].map(function(cur){
                return cur.id;
            });

            index = ids.indexOf(id);
            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }   
        },

        calculateBudget: function() {
            // 1. calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // 2. calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // 3. calculate percentage of income that we spent
            if(data.totals.inc > 0) {
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });

            return allPerc;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                percentage: data.percentage,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
            }
        },
    };
})();

// ------------------ UI CONTROLLER
var UIController = (function() {
    var DOMStrings = {
        inputType: ".add__type",
        inputDesc: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentLabel: ".budget__expenses--percentage",
        container: ".container",
        expensePercLabel: ".item__percentage",
        dateLabel: ".budget__title--month",
    };

    var formatNumber = function(num, type) {
        var numSplit, int, dec, sign;
        // + or - before number         +900 or -300
        // exactly two decimal points   +900.00 or -300.00
        // comma separating thousands   +9,000 or -3,000

        num = Math.abs(num);
        num = num.toFixed(2); // two decimals

        numSplit = num.split(".");

        int = numSplit[0];
        num = "." + dec;
        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
        }
        dec = numSplit[1];
        type === 'exp' ? sign = "-" : sign = "+";

        return (type === 'exp' ? sign = "-" : sign = "+") + " " + int + "." + dec;
    };

    var nodeListForEach = function(list, callback) {
        for(var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDesc).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
            }
        
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            // create html string with placeholder text
            if(type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> \
                <div class="item__description">%description%</div> <div class="right clearfix"> \
                <div class="item__value">%value%</div> <div class="item__delete">\
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i>\
                </button></div></div></div>'
            } else {
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%">\
                <div class="item__description">%description%</div><div class="right clearfix">\
                <div class="item__value">%value%</div><div class="item__percentage">21%</div>\
                <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i>\
                </button></div></div></div>'
            }
            // replace placeholder with actual data
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.desc);
            newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));
            // insert the html into the dom
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID)
            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.inputDesc + ', ' + DOMStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(cur, idx, arr) {
                cur.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            var type; 

            obj.budget > 0 ? type = "inc" : type = "exp";

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp, "exp");
            document.querySelector(DOMStrings.percentLabel).textContent = obj.percentage;

            if(obj.percentage > 0) {
                document.querySelector(DOMStrings.percentLabel).textContent = obj.percentage + "%";
            } else {
                document.querySelector(DOMStrings.percentLabel).textContent = "---";
            }
        },

        displayPercentages: function(percentagesArr) {
            var fields;

            fields = document.querySelectorAll(DOMStrings.expensePercLabel);

            nodeListForEach(fields, function(cur, idx) {
                if(percentagesArr[idx] > 0) {
                    cur.textContent = percentagesArr[idx] + "%";
                } else {
                    cur.textContent = "---";
                }
            });
        },

        displayMonth: function() {
            var now, year, month, months;

            now = new Date();
            year = now.getFullYear();
            months = ["January", "February", "March", "April", 
                "May", "June", "July", "August", "September", 
                "October", "November", "December"];
            month = now.getMonth();

            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + " " + year;
            
        },

        changedType: function() {
            var fields;

            fields = document.querySelectorAll(
                DOMStrings.inputType + "," + DOMStrings.inputDesc + "," + DOMStrings.inputValue
            );

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle("red-focus");
            });

            document.querySelector(DOMStrings.inputBtn).classList.toggle("red");

        },

        getDOMstrings: function() {
            return DOMStrings;
        },
    }
})();

// ------------------ GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
    var setupEventListeners = function() {
        var DOMStrings = UICtrl.getDOMstrings();

        document.querySelector(DOMStrings.inputBtn)
            .addEventListener("click", ctrlAddItem);
        document.addEventListener("keypress", function(ev) {
            if(ev.keyCode === 13 || ev.which === 13) {
                ctrlAddItem();
            }   
        });

        document.querySelector(DOMStrings.container)
            .addEventListener("click", ctrlDeleteItem);

        document.querySelector(DOMStrings.inputType)
            .addEventListener("change", UICtrl.changedType);
    };

    var updateBudget = function() {
        // 1. calculate the budget
        budgetController.calculateBudget();

        // 2. return the budget
        var budget = budgetController.getBudget();

        // 3. display the budget on the ui
        UICtrl.displayBudget(budget);

    };

    var updatePercentages = function() {
        var percentages;

        // 1. calculate percentages
        budgetController.calculatePercentages();

        // 2. read them from budget controller
        percentages = budgetController.getPercentages();
        
        // 3. display them on user interface with new percentages
        UICtrl.displayPercentages(percentages);
    };

    var ctrlAddItem = function() {
        var input, newItem;
        // 1. get filled input data
        input = UICtrl.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. add the item to budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);

            // 3. add the item to user interface
            UICtrl.addListItem(newItem, input.type);

            // 3.5. clear the fields
            UICtrl.clearFields();

            // 4. calculate and update budget
            updateBudget();

            // 5. calculate and update percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(ev) {
        var itemID, splitID, type, id;
        itemID = ev.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID) {
            splitID = itemID.split("-");
            type = splitID[0];
            id = parseInt(splitID[1]);

            // 1. delete item from the data structure
            budgetController.deleteItem(type, id);

            // 2. delete item from the user interface
            UICtrl.deleteListItem(itemID);

            // 3. update and show new budget
            updateBudget();

            // 4. calculate and update percentages
            updatePercentages();
        }
    };

    return {
        init: function() {
            console.log("App started");
            UICtrl.displayBudget({
                budget: 0,
                percentage: -1,
                totalInc: 0,
                totalExp: 0,
            });
            setupEventListeners();
            UICtrl.displayMonth();
        }
    };


})(budgetController, UIController);

controller.init();