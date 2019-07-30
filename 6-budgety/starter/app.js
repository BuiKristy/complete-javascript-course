
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
    
    var Data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
})();

// ------------------ UI CONTROLLER
var UIController = (function() {
    var DOMstrings = {
        inputType: ".add__type",
        inputDesc: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDesc).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }
})();

// ------------------ GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
    var setupEventListeners = function() {
        var DOMstrings = UICtrl.getDOMstrings();

        document.querySelector(DOMstrings.inputBtn)
            .addEventListener("click", ctrlAddItem);
        document.addEventListener("keypress", function(ev) {
            if(ev.keyCode === 13 || ev.which === 13) {
                ctrlAddItem();
            }   
        });
    }

    var ctrlAddItem = function() {
        // 1. get filled input data
        var input = UICtrl.getInput();

        // 2. add the item to budget controller
        // 3. add the item to user interface
        // 4. calculate the budget
        // 5. display the budget on the user interface
    };

    return {
        init: function() {
            console.log("App started");
            setupEventListeners();
        }
    };


})(budgetController, UIController);

controller.init();