// function constructor

/*
var john = {
    name: "John", 
    yearOfBirth: 1990,
    job: "teacher"
};

var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = function() {
    console.log(2016 - this.yearOfBirth);
};

var john = new Person("John", 1990, "teacher");
john.calculateAge();
*/

// Object.create
var personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);