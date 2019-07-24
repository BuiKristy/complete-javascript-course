

Section 5: Objects & Functions
====================

## Prototype Property Summary
* every javascript object has a **prototype property**, which makes inheritance possible in javascript; 
* the prototype property of an object is where we put methods and properties that we want **other objects to inherit**;
* the constructor's prototype property is **NOT** the prototype of the constructor itself, it's the prototype of **ALL** instances that are created through it;
* when a certain method or property is called, the search starts in the object itself and if it cannot be found, the search moves on to the object's prototype. This continues until the method is found and this is the **prototype chain**.
* inheritance is when one object gets access to anoter object's properties and methods