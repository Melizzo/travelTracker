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
    } else {
      welcomePage.classList.add("hidden");
      welcomePage.classList.remove("login-area");
      travelerPage.classList.remove("hidden");
      travelerPage.classList.add("traveler-login-page");
    }
  },

  displayTentativeTrip(trip, destinationsData) {
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
        if (trip.destinationID === destination.id) {
          document.getElementById("traveler-trips").insertAdjacentHTML(
            "beforeend",
            `<p>Location: ${destination.destination}<p>
          <p>Total Travelers: ${trip.travelers}<p>
          <p>Travel date: ${trip.date}, and lasted for ${trip.duration} days!<p>`
          );
        }
      });
    });
    this.displayTravelerTotalCostFor2020(traveler);
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
