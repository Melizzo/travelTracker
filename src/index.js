// Imports
import "./css/base.scss";
import "./css/styles.scss";
import ApiFetch from "./apiFetch";
import Traveler from "./traveler";
import TravelAgency from "./travelAgency";
import domUpdates from "./domUpdates";
import "./images/loginPageTravel.jpg";

let traveler;
let travelAgent;


// Data Fetching
function fetchSingleUser(id) {
  return Promise.all([
    ApiFetch.getSingleTravelerData(id),
    ApiFetch.getAllTrips(),
    ApiFetch.getAllDestinations(),
  ])
    .then((data) => {
      return data;
    })
    .then((data) => {
      traveler = new Traveler(data[0], data[1].trips, data[2].destinations);
      domUpdates.displayPage();
      domUpdates.displayTravelerInformation(traveler)
    })
    .catch((error) => {
      loginPageError.insertAdjacentHTML(
        "afterbegin",
        "<p>Login doesn't exist, please try again.</p>"
      );
      console.log("catch error", error);
    });
}

function fetchAllTravelers() {
  Promise.all([
    ApiFetch.getAllTrips(),
    ApiFetch.getAllDestinations(),
    ApiFetch.getTravelersData(),
  ])
    .then((data) => {
      domUpdates.displayPage();
      return instantiateTravelAgency(
        data[0].trips,
        data[1].destinations,
        data[2].travelers
      );
    })
    .catch((error) => console.log(error));
}

function instantiateTravelAgency(tripsData, destinationsData, travelersData) {
  console.log("Hello Travel Agent");
  return (travelAgent = new TravelAgency(
    tripsData,
    destinationsData,
    travelersData
  ));
}

// QuerySelectors
const loginPageError = document.querySelector("#login-error");
document.getElementById('login-submit-button').addEventListener('click', logIn)

document.addEventListener('click', (e) => {
  if(e.target.id === 'calculate-trip-estimate-button') {
    e.preventDefault()
    const trip = tentativeTrip()
    domUpdates.displayTentativeTrip(trip, traveler.destinationsData)
  }
  if(e.target.id === 'post-traveler-trip-button') {
    const tripObject = tentativeTrip();
    ApiFetch.postNewTrip(tripObject)
    .then(() => getAllTrips()) 
    .then(response => {
      console.log(response)
    })
    .catch(err => console.log(err))
  }
})

function travelerPageHandler() {
  // traveler.calculateTotalCostOfTrips(traveler.calculateTotalLodgingCostPerTripThisYear(traveler.findTravelerTrips()), traveler.calculateTotalFlightCostPerTripThisYear(traveler.findTravelerTrips()));
}

function tentativeTrip() {
   const trip = {
    id: Date.now(),
    userID: traveler.travelerData.id,
    destinationID: +document.getElementById('destination-Form-ID').value,
    travelers: +document.getElementById('number-travelers-Form-ID').value, 
    date: document.getElementById('select-date-trip').value.split('-').join('/'),
    duration: +document.getElementById('number-days-of-trip-Form').value,
    status: 'pending',
    suggestedActivities: []
  }
  console.log(trip);
  return trip
}

function logIn(e) {
  const loginValid = validateLoginInformation();
  if (loginValid) {
    findUserName();
  }
}
function validateLoginInformation() {
  if (!validatePassword()) {
    loginPageError.insertAdjacentHTML(
      "beforebegin",
      "<p>That's an incorrect Password!</p>"
    );
    return false;
  } else {
    return true;
  }
}

function findUserName() {
  if (document.querySelector("#login-username-input").value === "manager") {
    fetchAllTravelers({});
  } else {
    const travelerId = document
      .querySelector("#login-username-input")
      .value.split("")
      .filter((char) => !isNaN(char + 1))
      .join("");
    fetchSingleUser(travelerId);
  }
}
function validatePassword() {
  const password = document.querySelector("#login-password-input").value;
  if (password !== "travel2020" || "") {
    return false;
  }
  return true;
}
