//Select all the DOM elements that we need
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showBillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

// initialise an array of objects that includes {first and last name and wealth} called data ,where we`re going to put all the needed data
let data = [];
//====================================================================

//Add new object to data array ,push method
const addData = (obj) => {
  data.push(obj)
};

//Fetch random user and add money
//Use async/await method instead of .then() method
const getRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  //console.log(data);

  //we assign a variable user to the data fetched and to the first item from the results(results comes from the fetched api)
  const user = data.results[0];

  //Create an object called newUser
  //take user, name object and first property of the object
  //take user, name object and last property of the object
  //to generate a random number up to 1 milion we use Math.floor wich rounds a number down ,Math.random which generates a random decimal, and we multiply it to 1 milion to have a random number that goes upe to 1 mil
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  // console.log(newUser)--> we get 3 random users with 3 random amount of money -up to a mil

  //pass newUser in addData function because we want to add the new object to the data arry
  addData(newUser);
};
getRandomUser();
getRandomUser();
getRandomUser();
//=======================================================================================================

//Example of fetching the data with  .then() method
// const getRandomUser = () => {
//   fetch("https://randomuser.me/api")
//     .then((res) => {
//       return res.json;
//     })
//     .then((data) => {
//      console.log(data)
//     });
// };
// getRandomUser();
//=========================================================================================================
