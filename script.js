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

//FOR EACH METHOD ====
// updateDom FUNCTIONALITY
//take in a parameter (providedData)
//give the default value to the providedData parameter -->(data),which is saying that if nothing is passed in when weinvoke the function updateDom(?) then we`re going to use the default value -->(data)
//clear the main div, set it to its default value
//loop through the provided data parameter using the forEach method
//forEach method takes in a callback function with a parameter(item)
//we can add the index param in case we need the index of the item
//we can access the entire array with the third parameter
//we only need one parameter ,which is the item param
//create a new element for every single person with the help of the document.createElement method
// add the class (.person) on the new element created with the help of classList.add()
//populate the new div element with the help of .innerHTML
//to actualy be displayed in the browser we need to take the main element and with the help of appendChild() ,that child element is the (const element) that we just created, we can display it
const updateDOM = (providedData = data) => {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong> ${item.name} </strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
  //======================================================

  //Example of a for loop ,which is similar to forEach
  //we`re looping through the data
  //in this case we`re getting every user name from the data/providedData
  // for(i=0;i<providedData.length;i++){
  //   providedData[i].name
  //   console.log(providedData[i])

  // }
  //=====================================================
};
//==================================================================

//FORMAT NUMBER DISPLAYED IN THE BROWSER TO LOOK LIKE MONEY FUNCTIONALITY
//take in a number parameter
//used the code from stackoverflow to transform the number into a currency string
//use function to take in item.money from element.innerHTML /providedData.forEach() above
//concatinate the pound sign to the amount of money
const formatMoney = (number) => {
  return "£" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
//=====================================================================

//ADD A NEW OBJECT TO DATA ARRAY WITH THE HELP OF THE PUSH METHOD
const addData = (obj) => {
  data.push(obj);
  updateDOM();
};
//=========================================================================================

//FETCH RANDOM USER AND ADD MONEY
//Use async/await method instead of .then() method
const getRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  //console.log(data);

  //we assign a variable user to the data fetched and to the first item from the results(results comes from the fetched data api)
  //user is an object
  const user = data.results[0];

  //CREATE AN OBJECT CALLED newUser
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

//doubleMoney FUNCTIONALITY , MAP() ARRAY METHOD
//we have the data array at the top and because we use let that means that we can reasign it
//return an object
//use spread operator so that we can have access to everything that we have inside person
//invoke updateDOM because every time we invoke double money we need to update the DOM elements
//take the money propert and give it a value using person(which is an object).money and we multiply it with 2  so that when we click the double money button we will double the money for each person
//we can see the name aswell when we click double money btn because we`re using the spread operator
const doubleMoney = () => {
  data = data.map((person) => {
    return { ...person, money: person.money * 2 };
  });
  updateDOM();
};
//=================================================================

//sortByRichest FUNCTIONALITY , SORT ARRAY METHOD
//sort method takes in a callback function with 2 parameters a,b
//we have to target the money preoperty from the object
// invoke updateDOM in order to be able to see it hapening in the browser
const sortByRichest = () => {
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
};
//======================================================================

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

// EVENT LISTENERS
//add the click event listeneer on addUserBtn and invoke the getRandom user function which will add a random person on the list of persons
addUserBtn.addEventListener("click", getRandomUser);
//add the click event listeneer on doubleBtn and invoke the doubleMoney function which will double the money for each person
doubleBtn.addEventListener("click", doubleMoney);
//add the click event listeneer on sortBtn and invoke the sortByRichest function ,this will give us the richest persons in descending order
sortBtn.addEventListener("click", sortByRichest);

//======================================================================
