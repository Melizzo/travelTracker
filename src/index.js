// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// Imports
import './css/base.scss';
import "./css/styles.scss";
import ApiFetch from './apiFetch';
// import Traveler from '.traveler';
import './images/loginPageTravel.jpg'

let traveler;

// Data Fetching


// This will fetch when user has clicked submit  
// on submit - will pass in the num portion of the login into the fetch,
// and if it is success, check password.
// if unsuccessful, display error. 
// error => run function displayError (span.innerHTML `you dummy, that's not right`)

function fetchSingleUser(id) {
  Promise.all([ApiFetch.getSingleTravelerData(id), ApiFetch.tripsData, ApiFetch.getAllDestinations])
  .then(data => instantiateSingleTraveler(data[0].getSingleTravelerData, data[1].tripsData, data[2].getAllDestinations))

  // const promise = ApiFetch.getSingleTravelerData(id)
  // .then(data => instantiateSingleTraveler(data))
  // .then(data => console.log(data))
  // .then(console.log(ApiFetch.getSingleTravelerData(id)))
  .catch(error => console.log(error))
}

function instantiateSingleTraveler(traveler, tripsData, destinationsData) {
  traveler = new Traveler(traveler, tripsData, destinationsData)
}



// function fetchData() {
//   Promise.all([ApiFetch.travelersData, ApiFetch.getSingleTravelerData(id), ApiFetch.tripsData, ApiFetch.destinationsData])
//     .then(data => instantiate(data[0].travelersData, data[1].getSingleTravelerData(id), data[2].tripsData, data[3].destinationsData))
//     .catch(error => console.log(error.message))
// }

// function instantiate(travelers, singleTraveler, trips, destinations) {

// }
// QuerySelectors
const submitButton = document.querySelector('#login-submit-button');
const loginPageError = document.querySelector('#login-error')


// Event Listeners
submitButton.addEventListener('click', logIn);

function logIn(e) {
  console.log('submit Btn', e);
  // validatePassword();
  // returnUserName()
  validateLoginInformation();
  
  // Validate that the password === travel2020, if not throw alert
  // if the password does validate
  // slice traveler off of the string, Number - the remain value
  // interpolate that in the single user fetch.
  // if success - great
  // if fail interHTML fetch Error
  // validateLoginInformation(login, password);
  
} 

function validateLoginInformation() {
  if(!returnUserName) {
    loginPageError.insertAdjacentHTML('beforebegin', "<p>That's an incorrect login!</p>")
  }
  if(!validatePassword()) {
    loginPageError.insertAdjacentHTML('beforebegin', "<p>That's an incorrect Password!</p>")
  } 
  else {
    returnUserName()
  }
}
 
function returnUserName() {
  const travelerId = Number(document.querySelector('#login-username-input').value.split('').splice(8).join())
  fetchSingleUser(travelerId)
  if(document.querySelector('#login-username-input').value === 'manager') {
    return true
  }

  // const findMatch = data.travelersData.find(traveler => traveler.id === inputLogin[0].value);
  // inputLogin[0].value !== 'manager' && findMatch === undefined ? findMatch = '' : findMatch;
  // return usernameInput[0].value === 'manager' || findMatch.username;

}

function validatePassword() {
  const password = document.querySelector('#login-password-input').value
 if(password !== 'travel2020' || ''){
    return false;
  } return true;
}
