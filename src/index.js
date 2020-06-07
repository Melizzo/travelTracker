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
      console.log(instantiateSingleTraveler(
        data[0],
        data[1].trips,
        data[2].destinations
      ));
      
      return instantiateSingleTraveler(
        data[0],
        data[1].trips,
        data[2].destinations
      );
    })
    .then(
      domUpdates.displayPage(),

      // console.log(traveler),
      travelerPageHandler()
      )
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
    domUpdates.displayPage()
     return instantiateTravelAgency(
        data[0].trips,
        data[1].destinations,
        data[2].travelers
      )
     })
    .catch((error) => console.log(error));
  }
 

function instantiateSingleTraveler(
  singleTraveler,
  tripsData,
  destinationsData
) {
  traveler = new Traveler(singleTraveler, tripsData, destinationsData);
  return traveler
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
const submitButton = document.querySelector("#login-submit-button");
const loginPageError = document.querySelector("#login-error");

// Event Listeners
submitButton.addEventListener("click", logIn);

function travelerPageHandler() {
  var x = 5;
  domUpdates.displayPage();
  debugger
  console.log('traveler', traveler);
  
  traveler.findTravelerFirstName();
}

function logIn(e) {
  console.log("submit Btn", e);
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
    const travelerId = Number(
      document
        .querySelector("#login-username-input")
        .value.split("")
        .splice(8)
        .join()
    );
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

