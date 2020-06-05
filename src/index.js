// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// Imports
import './css/base.scss';
import "./css/styles.scss";
import ApiFetch from './apiFetch';
import Traveler from './traveler';
import TravelAgency from './travelAgency';
import './images/loginPageTravel.jpg'

let traveler;

// QuerySelectors
const submitButton = document.querySelector('#login-submit-button');
const loginPageError = document.querySelector('#login-error');

// Data Fetching

function fetchSingleUser(id) {
  Promise.all([ApiFetch.getSingleTravelerData(id), ApiFetch.getAllTrips(), ApiFetch.getAllDestinations()])
  .then(data => instantiateSingleTraveler(data[0].getSingleTravelerData, data[1].trips, data[2].destinations))
  .catch(error => {
    loginPageError.insertAdjacentHTML('afterbegin', "<p>Login doesn't exist, please try again.</p>");
    console.log(error);
  })
}

function fetchAllTravelers() {
  Promise.all([ApiFetch.getAllTrips(), ApiFetch.getAllDestinations(), ApiFetch.getTravelersData()])
  .then(data => instantiateTravelAgency(data[0].trips, data[1].destinations, data[2].travelers))
  .catch(error => console.log(error))
}

function instantiateSingleTraveler(traveler, tripsData, destinationsData) {
  console.log('hello')
  traveler = new Traveler(traveler, tripsData, destinationsData)
}

// pass in empty Object when calling the travel agency, before tripsData(it's expecting a singleTravelerData)
function instantiateTravelAgency(tripsData, destinationsData, travelersData) {
  travelAgent = new TravelAgency(tripsData, destinationsData, travelersData)
}



// function fetchData() {
//   Promise.all([ApiFetch.travelersData, ApiFetch.getSingleTravelerData(id), ApiFetch.tripsData, ApiFetch.destinationsData])
//     .then(data => instantiate(data[0].travelersData, data[1].getSingleTravelerData(id), data[2].tripsData, data[3].destinationsData))
//     .catch(error => console.log(error.message))
// }

// function instantiate(travelers, singleTraveler, trips, destinations) {

// }



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
