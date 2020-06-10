// QuerySelectors
import traveler from "./traveler";

let domUpdates = {
  displayPage() {
    const welcomePage = document.querySelector("#welcome-login-area");
    const travelAgencyPage = document.querySelector("#travel-agency-page");
    const travelerPage = document.querySelector("#traveler-page");
    if (document.querySelector("#login-username-input").value === "manager") {
      welcomePage.classList.add("hidden");
      welcomePage.classList.remove("login-area");
      travelAgencyPage.classList.remove("hidden");
      travelAgencyPage.classList.add('travel-agent-login-page')
    } else {
      welcomePage.classList.add("hidden");
      welcomePage.classList.remove("login-area");
      travelerPage.classList.remove("hidden");
      travelerPage.classList.add("traveler-login-page");
    }
  },

  // TravelAgency
  displayTravelAgentInformation(travelAgent) {
    this.displayAllPendingTravelersTrip(travelAgent)
    this.displayIncomeFor2020(travelAgent)
    this.displayCurrentTravelersOnATrip(travelAgent)
  },

  displayCurrentTravelersOnATrip(travelAgent) {
    const travelersOnTrip = travelAgent.findTotalNumTravelersCurrentlyOnATrip()
    document.getElementById('travel-agency-Header').insertAdjacentHTML('beforeend', `<h3>${travelersOnTrip} travelers are currently traveling.</h3>`)
  },

  displayIncomeFor2020(travelAgent) {
    const totalFlightsCost2020 = travelAgent.calculateTotalFlightsCost()
    const totalLodgingCost2020 = travelAgent.calculateTotalLodgingCost()
    const income = travelAgent.calculateTotalCostOfTrips(totalFlightsCost2020, totalLodgingCost2020)
    document.getElementById('travel-agency-Header').insertAdjacentHTML('afterbegin', `<h3>2020 Income: $${income}</h3>`)
  },
  
  displayAllPendingTravelersTrip(travelAgent){
    const pendingTrips = travelAgent.findAllPendingTrips()
    const destinations = travelAgent.destinationsData
    if(pendingTrips.length === 0){
      document.getElementById('travel-agency-all-pending-trips').insertAdjacentHTML(
        "afterbegin", `<p>There are no pending trips that need approved!</p>`) 
    } 
    else {
      pendingTrips.forEach(trip => {
        destinations.forEach(destination => {
          if(trip.destinationID === destination.id) {
            document.getElementById('travel-agency-all-pending-trips').insertAdjacentHTML(
              "beforeend", `<p>Trip Booking id: ${trip.id} for Traveler id: ${trip.userID} </p>
              <p>Location: ${destination.destination}</p><p>Total Travelers: ${trip.travelers}<p>
              <p>Trip starts: ${trip.date}, for ${trip.duration} days.<p>`) 
          }
        })
      })
    } 
  },
  
  displaySearchedTraveler(traveler, travelAgent) {
    document.getElementById(
      "display-found-traveler"
    ).insertAdjacentHTML('afterbegin',`<h3>Traveler: ${traveler.travelerData.name}</h3>`)
    const totalCost = traveler.calculateTotalCostOfAllTrips(traveler)
    const agentCut = traveler.calculateTravelAgency10PercentFee(totalCost)
    document.getElementById(
      "display-found-traveler"
    ).innerText = `Total Spent: ${totalCost}, which generated $${agentCut} in revenue`;
    traveler.tripsData.forEach(trip => {
      traveler.destinationsData.forEach(destination => {
        if(trip.destinationID === destination.id) {
          document.getElementById("display-found-traveler-trips").insertAdjacentHTML('afterbegin', `<p>
          Trip Booking id: ${trip.id}
          Location: ${destination.destination} Total Travelers: ${trip.travelers}
          Trip starts: ${trip.date}, for ${trip.duration} days.</p>`)
        }
      })
    })
  },
  
// Traveler
  displayBookTripForm() {
    document.getElementById("book-traveler-trip").classList.remove("hidden");
    document.getElementById("show-traveler-trip").classList.add("hidden");
  },

  validateDestinationID(){
    const destinationID = +document.getElementById('destination-Form-ID').value
    if((destinationID < 1 || destinationID >50) && destinationID === Nan) {
      document.getElementById('destination-Form-ID').insertAdjacentHTML('beforebegin', `<p>That is an incorrect destination id, try again.</p>`)
    }
  },

  displayTentativeTrip(trip, destinationsData) {
    document.getElementById('destination-Form-ID').addEventListener('keyup', this.validateDestinationID)
    const destination = destinationsData.find(
      (destination) => destination.id === trip.destinationID
    );
    const tripCost = this.calculateCostOfTentativeTrip(trip, destination);
    document.getElementById("book-traveler-trip").classList.add("hidden");
    document.getElementById("show-traveler-trip").classList.remove("hidden");
    document.getElementById(
      "destination-confirmation-trip-section"
    ).innerText = `Destination : ${destination.destination}`;
    document.getElementById(
      "date-confirmation-trip-section"
    ).innerText = `You are leaving on : ${trip.date} for ${trip.duration} days`;
    document.getElementById(
      "total-travelers-confirmation-trip-section"
    ).innerText = `Total travelers: ${trip.travelers}`;
    document.getElementById(
      "estimated-cost-confirmation-trip-section"
    ).innerText = `Total Cost: $${tripCost}`;
  },

  calculateCostOfTentativeTrip(trip, destination) {
    const airfareCost =
      trip.travelers * destination.estimatedFlightCostPerPerson;
    const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;
    const agent10PercentFee = (airfareCost + lodgingCost) * 0.1;
    return Number((airfareCost + lodgingCost + agent10PercentFee).toFixed(2));
  },

  displayTravelerInformation(traveler) {
    document.getElementById(
      "traveler-Header"
    ).innerHTML = `<h2>Your adventure awaits ${traveler.findTravelerFirstName()}!</h2>`;
    const singleTravelerTrips = traveler.findTravelerTrips();
    const singleTravelerDestinations = traveler.findDestinationsOfTravelersTrips();
    singleTravelerTrips.forEach((trip) => {
      singleTravelerDestinations.forEach((destination) => {
        if (trip.destinationID === destination.id && Number(trip.date.split("/")[0]) <= 2020 && trip.status !== 'pending') {
          document.getElementById("traveler-trips").insertAdjacentHTML(
            "beforeend",
            `<p>Location: ${destination.destination}<p>
          <p>Total Travelers: ${trip.travelers}<p>
          <p>Travel date: ${trip.date}, and lasted for ${trip.duration} days!<p>
          <img id="destination-image" src="${destination.image}" alt="${destination.alt}">`
          );
        }
      });
    });
    this.displayTravelerTotalCostFor2020(traveler);
    this.displayTravelerPendingTrips(traveler);
  },

  displayTravelerPendingTrips(traveler){
    const pendingTrips = traveler.findPendingTrips()
    const destinations = traveler.findDestinationsOfTravelersTrips()
    if(pendingTrips.length === 0){
      document.getElementById('pending-traveler-trips-section').insertAdjacentHTML(
        "afterbegin", `<p>There are no pending trips. Book a trip below!</p>`) 
    } 
    else {
      pendingTrips.forEach(trip => {
        destinations.forEach(destination => {
          if(trip.destinationID === destination.id) {
            document.getElementById('pending-traveler-trips-section').insertAdjacentHTML(
              "afterbegin", `<h3>Your Pending Trip/s:</h3>
              <p>Location: ${destination.destination}</p><p>Total Travelers: ${trip.travelers}<p>
              <p>Trip begins on: ${trip.date}, and will last for ${trip.duration} days!<p>`) 
          }
        })
      })
    }
  },

  displayTravelerTotalCostFor2020(traveler) {
    const flightsCost2020 = traveler.calculateTotalFlightCostPerTripThisYear();
    const lodgingCost2020 = traveler.calculateTotalLodgingCostPerTripThisYear();
    const total = traveler.calculateTotalCostOfTrips(
      lodgingCost2020,
      flightsCost2020
    );
    const travelAgencyFees = traveler.calculateTravelAgency10PercentFee(total);
    document.getElementById(
      "traveler-Cost-Section"
    ).innerText = `Your total Spent for 2020 is: ${total}, Of that total, $${lodgingCost2020} was spent on lodging, and $${flightsCost2020} was spent on flights. $${travelAgencyFees} were Travel Agency Fees`;
  },
};

export default domUpdates;
