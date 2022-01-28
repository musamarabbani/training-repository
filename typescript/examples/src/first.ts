const str = 'Hello World'
console.log('str ==>', str);


interface Person{
  firstName:string,
  lastName:string,
  age:number,
  job?:Job,
  isVisiter?:boolean
}
type Job = "Engineer" | "doctor"
function returnPersonInfo(info:Person):string|undefined{
  if(info.isVisiter) return undefined;
  else{
    let personInfo:string = `${info.firstName} ${info.lastName} has age ${info.age}`;
    return personInfo;
  }

};
const info={firstName : 'ali',lastName :'ahmad',age:20}
console.log(returnPersonInfo(info));