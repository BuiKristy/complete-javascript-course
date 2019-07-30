
// ------------------ BUDGET CONTROLLER
var budgetController = (function() {
    var Expense = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    }

    var Income = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    }
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
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
        }
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
                html = '<div class="item clearfix" id="income-%id%"> \
                <div class="item__description">%description%</div> <div class="right clearfix"> \
                <div class="item__value">%value%</div> <div class="item__delete">\
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i>\
                </button></div></div></div>'
            } else {
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%">\
                <div class="item__description">%description%</div><div class="right clearfix">\
                <div class="item__value">%value%</div><div class="item__percentage">21%</div>\
                <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i>\
                </button></div></div></div>'
            }
            // replace placeholder with actual data
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.desc);
            newHtml = newHtml.replace("%value%", obj.value);
            // insert the html into the dom
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
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

        getDOMstrings: function() {
            return DOMStrings;
        }
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
    };

    var updateBudget = function() {
        // 1. calculate the budget
        // 2. return the budget
        // 3. display the budget on the ui

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
        }
    };

    return {
        init: function() {
            console.log("App started");
            setupEventListeners();
        }
    };


})(budgetController, UIController);

controller.init();