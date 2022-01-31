// function getArray<T>  (items:T[]){
//   return new Array<T>().concat(items)
// }

// let myNumArr = getArray<number>([100, 200, 300]);
// let myStrArr = getArray<string>(["Hello", "World"]);

// myNumArr.push(400); // OK
// myStrArr.push("Hello TypeScript"); // OK

// console.log('myNumArr ==>', myNumArr);
// console.log('myStrArr ==>', myStrArr);

// const printLastArray=<T>(arr:T[]):T[]=>{
//   return new Array().concat(arr);
// }

// let myNumArr = printLastArray<number>([100, 200, 300]);
// let myStrArr = printLastArray<string>(["Hello", "World"]);

// myNumArr.push(400); // OK
// myStrArr.push("Hello TypeScript"); // OK


// console.log('myNumArr ==>', myNumArr);
// console.log('myStrArr ==>', myStrArr);


const printRandomArray=<T,Q>(arr:any[]):number[]| string[]=>{
  return new Array().concat(arr);
}

let myRandomArr :(string|number)[]= printRandomArray<number, string>([100, 200, 300,"Hello", "World"]);
myRandomArr.push(400);

console.log('myNumArr ==>', myRandomArr);
