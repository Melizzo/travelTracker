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
      domUpdates.displayTravelerInformation(traveler);
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
      travelAgent = new TravelAgency(
        {},
        data[0].trips,
        data[1].destinations,
        data[2].travelers
      );
      console.log(travelAgent);
      console.log("Hello Travel Agent");
      domUpdates.displayPage();
      domUpdates.displayTravelAgentInformation(travelAgent);
    })
    .catch((error) => console.log(error));
}

// QuerySelectors
const loginPageError = document.querySelector("#login-error");
document.getElementById("login-submit-button").addEventListener("click", logIn);

document.addEventListener("click", (e) => {
  if (e.target.id === "calculate-trip-estimate-button") {
    e.preventDefault();
    const trip = tentativeTrip();
    domUpdates.displayTentativeTrip(trip, traveler.destinationsData);
  }
  if (e.target.id === "post-traveler-trip-button") {
    const tripObject = tentativeTrip();
    ApiFetch.postNewTrip(tripObject)
      .then(() => ApiFetch.getAllTrips())
      .then((response) => {
        console.log(response);
        domUpdates.displayBookTripForm();
        domUpdates.displayTravelerInformation(traveler);
      })
      .catch((err) => console.log(err));
  }
  if (e.target.id === "approve-trip-button") {
    e.preventDefault();
    ApiFetch.modifySingleTrip({
      id: +document.getElementById("travel-agency-approve-trip").value,
      status: "approved",
      suggestedActivities: [],
    })
      .then((response) => {
        console.log(response);
        alert("Trip has been approved!");
        domUpdates.displayAllPendingTravelersTrip(travelAgent);
      })
      .catch((err) => {
        console.log(err);
        alert("Error - trip id not found!");
      });
  }
  if (e.target.id === "delete-trip-button") {
    e.preventDefault();
    ApiFetch.deleteSingleTrip({
      id: +document.getElementById("travel-agency-delete-trip").value,
    })
      .then((response) => {
        console.log(response);
        alert("Trip has been deleted.");
        domUpdates.displayAllPendingTravelersTrip(travelAgent);
      })
      .catch((err) => {
        console.log(err);
        document.getElementById("travel-agency-delete-trip").requestFullscreen();
        alert("Error - trip id not found!");
      });
  }
  if (e.target.id === 'search-for-traveler') {
    let name = document.getElementById('search-traveler-name-travel-agent').value
    const searchedtraveler = travelAgent.findSingleTraveler(name)
    traveler = new Traveler({"id": searchedtraveler.travelerFound.id,
    "name": searchedtraveler.travelerFound.name,
    "travelerType": "relaxer" },
      searchedtraveler.tripsData, 
      searchedtraveler.destinationData 
    )
    domUpdates.displaySearchedTraveler(traveler)
  }
});

function tentativeTrip() {
  const trip = {
    id: Date.now(),
    userID: traveler.travelerData.id,
    destinationID: +document.getElementById("destination-Form-ID").value,
    travelers: +document.getElementById("number-travelers-Form-ID").value,
    date: document
      .getElementById("select-date-trip")
      .value.split("-")
      .join("/"),
    duration: +document.getElementById("number-days-of-trip-Form").value,
    status: "pending",
    suggestedActivities: [],
  };
  return trip;
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
  if (document.querySelector("#login-username-input").value === "") {
    return loginPageError.insertAdjacentHTML(
      "beforebegin",
      "<p>Please enter in a login</p>"
    );
  }
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
