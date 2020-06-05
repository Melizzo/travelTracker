// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// Imports
import './css/base.scss';
import "./css/styles.scss";
import ApiFetch from './apiFetch';
import Traveler from './traveler';
import TravelAgency from './travelAgency';
import domUpdates from './domUpdates';
import './images/loginPageTravel.jpg';

let traveler;
let travelAgent;



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
  console.log('hello traveler')
  traveler = new Traveler(traveler, tripsData, destinationsData)
}

function instantiateTravelAgency(tripsData, destinationsData, travelersData) {
  console.log('Hello Travel Agent');
  travelAgent = new TravelAgency(tripsData, destinationsData, travelersData)
}

// QuerySelectors
const submitButton = document.querySelector('#login-submit-button');
const loginPageError = document.querySelector('#login-error');

// Event Listeners
submitButton.addEventListener('click', logIn);

function logIn(e) {
  console.log('submit Btn', e);
  validateLoginInformation();
} 

function validateLoginInformation() {
  if(!validatePassword()) {
    loginPageError.insertAdjacentHTML('beforebegin', "<p>That's an incorrect Password!</p>")
  } 
  else {
    returnUserName()
    domUpdates.displayPage()
    
  }
}

function displayPage() {

}
 
function returnUserName() {
  if(document.querySelector('#login-username-input').value === 'manager') {
    fetchAllTravelers({})
  }
  else {
    const travelerId = Number(document.querySelector('#login-username-input').value.split('').splice(8).join())
    fetchSingleUser(travelerId)
  }
}

function validatePassword() {
  const password = document.querySelector('#login-password-input').value
 if(password !== 'travel2020' || ''){
    return false;
  } return true;
}
