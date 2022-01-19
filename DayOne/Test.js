// examples for for of loop and for in loop

// const array1 = ['a', 'b', 'c'];

// array1['foo']='foo example';
// for (const element in array1) {
//   console.log(element);
// }

// for (const element of array1) {
//     console.log(element);
//   }


// // labelling example with countinue statement
// let i, j;

// loop1:
// for (i = 0; i < 3; i++) {      //The first for statement is labeled "loop1"
//    loop2:
//    for (j = 0; j < 3; j++) {   //The second for statement is labeled "loop2"
//       if (i === 1 && j === 1) {
//          break loop1;
//       }
//       console.log('i = ' + i + ', j = ' + j);
//    }
// }

// // labelling example with break statement
// let i, j;

// loop1:
// for (i = 0; i < 3; i++) {      //The first for statement is labeled "loop1"
//    loop2:
//    for (j = 0; j < 3; j++) {   //The second for statement is labeled "loop2"
//       if (i === 1 && j === 1) {
//          break loop1;
//       }
//       console.log('i = ' + i + ', j = ' + j);
//    }
// }

// function setCookie(name,value,days) {
//     var expires = "";
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + (days*24*60*60*1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + (value || "")  + expires + "; path=/";
// }
// function getCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0;i < ca.length;i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//     }
//     return null;
// }

// setCookie("user_email","bobthegreat@gmail.com",30); //set "user_email" cookie, expires in 30 days
// var userEmail=getCookie("user_email");//"bobthegreat@gmail.com"


// Page Redirect

// window.location.reload();  // to reload page

// to auto refresh we can use setTimeout and setInterval to auto relod after specific time intervals e.g.

// setTimeout(()=>{
// window.location.reload();
// },2000)// after first 2 seconds

// setInterval(()=>{
//     window.location.reload();
//     },2000); // after every 2 seconds



//     Javascript functions:
// Primitive values that are passed to functions are by values and not by reference, but if we pass an object as parameter, in that case, this change will be implemented as globally because object and non-primitive data type parameters are passed by reference and not by value.

// Function expression allows us to create anonymous functions, it does not need of function keyword, a function expression has to be stored inside a variable and can be accessed with a variable name.
// Function declarations are similar to var and they will automatically hoisted, however, function expressions will not be hoisted.


// Functions can be multiply-nested. For example:
// * A function (A) contains a function (B), which itself contains a function (C).
// * Both functions B and C form closures here. So, B can access A, and C can access B.
// * In addition, since C can access B which can access A, C can also access A.

// Arrow functions not have their own this, arguments and super

// A function literal is just an expression that defines an unnamed function. The syntax for a function literal is much like that of the function statement, except that it is used as an expression rather than as a statement and no function name is required.


//      Javascript Dialog Boxes are of three types as below
// I) Alert
// To warn user with only one button
// II) Confirm
// To take confirm from user with two buttons
// III) Promt
// To take some information from user


//      Javascript Numbers

// let number = 1100;
// console.log(number.toString()); // "1100"
// console.log(number.toLocaleString())  // 1,100

//      Javascript Numbers
// we use new keyword if we want to create an instance of user defined or built in data types like number as below.
// let numberObj = new Number(12);
// console.log('numberObj ==>', numberObj.valueOf());

let sampleString =new String('Hellow World sample');
console.log(typeof sampleString);
console.log(sampleString.length);
console.log('charAt ==>', sampleString.charAt(0));
console.log('indexOf ==>', sampleString.indexOf('l'));

let text = "lastIndexOf returns the element from last occurence of element";
let result = text.lastIndexOf("element");
console.log('lastIndexof text ==>', result);

// The localeCompare() method compares two strings in the current locale.

// The localeCompare() method returns sort order -1, 1, or 0 (for before, after, or equal).

let matchStr = "The rain in SPAIN stays mainly rain in the plain";
let matchRresult = matchStr.match("rain");
console.log('matchRresult ==>', matchRresult)

// reduce method
var total = [0, 1, 2, 3].reduce(function(a, b){ return a + b; }); 
console.log("total is : " + total ); 



// Javascript Array

let arr = [1,2,3,4];
arr.splice(0,0,4,5);
console.log('arr', arr);
