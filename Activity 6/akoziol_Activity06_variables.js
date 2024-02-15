/*
Aden Koziol
Feb9, 2024
Activity06 - Variables
akoziol@iastate.edu
*/

console.log("---- I am in V A R I A B L E S ----")

// Q1 : Is it permited the next ?
console.log("Q1 ---------------")
var var1 = "Iowa";
console.log(var1);
var var1 = 124;
console.log(var1);
// Is it permited ? Yes

// Q2 : Is it valid ?
console.log("Q2 ----------------");
let var2 = "Ames";
console.log(var2);
let var2 = 124;
// Is it valid ?
console.log("No");

// Q3 : Is it valid ?
console.log("Q3 ----------------");
let var3 = "ISU";
console.log(var3);
var3 = 2023;
console.log(var3);
console.log("Valid ? Yes")

// Q4 : Explain the Error.
console.log("Q4 ----------------");
let var4;
const var5; //var5 is declared as a constant but is given no value.
console.log("What's the error : 'const' declarations must be initialized.")


// Q5 : Explain the Error.
console.log("Q5 ----------------");
const var6 = 3.1415;
var6 = 2.8; //var6 is declared as a constant variable but is then assigned to something else.
console.log("What's the error : Assigntment to constant variable") 


// Q6 : Explain the Error.
let first name = "Abraham"; 
console.log("first name cannot have spaces.");
let 2numbers = [1,2];
console.log("variables cannot start with numbers.");
let city-state = "Ames Iowa";
console.log("variables cannot have hyphons.");


// Q7 : What !! ??
let mainCity = "DesMoines";
console.log("This is the Capital :", MainCity)
console.log("Uncaught ReferenceError: MainCity is not defined. The m in MainCity on the line above should be lower case.")

// Q8 : "let" and "const" scope vs "var" scope
if (5 === 5) {
    var var7 = 100;
    }
    console.log(var7);
    if (5 === 5) {
    let var8 = 100;
    }
    console.log(var8);
    console.log("Uncaught ReferenceError: var8 is not defined. var variables have a function scope so in this code var7's scope is throughout the whole code. let variables have a block scope so var8's scope is only withing the if statement when it is declared. It's console.log statement is not within the if statement so the statement is out of var8's scope.")
