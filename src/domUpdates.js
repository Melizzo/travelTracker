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
    const destination = destinationsData.find(destination => destination.id === trip.destinationID)
    const tripCost = this.calculateCostOfTentativeTrip(trip, destination);
    document.getElementById('book-traveler-trip').classList.add('hidden');
    document.getElementById('show-traveler-trip').classList.remove('hidden');
    document.getElementById('destination-confirmation-trip-section').innerText = `Destination : ${destination.destination}`;
    document.getElementById('date-confirmation-trip-section').innerText = `You are leaving on : ${trip.date} for ${trip.duration} days`;
    document.getElementById('total-travelers-confirmation-trip-section').innerText = `Total travelers: ${trip.travelers}`;
    document.getElementById('estimated-cost-confirmation-trip-section').innerText = `Total Cost: $${tripCost}`;

  },

  calculateCostOfTentativeTrip(trip, destination) {
    const airfareCost = trip.travelers * destination.estimatedFlightCostPerPerson
    const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay
    const agent10PercentFee = (airfareCost + lodgingCost) * .10
    return Number((airfareCost + lodgingCost + agent10PercentFee).toFixed(2))
  },

  displayTravelerWelcome(firstName) {
    const travelerHeaderWelcome = document.querySelector("#traveler-Header");
    travelerHeaderWelcome.innerHTML = `<h2>Your adventure awaits ${firstName}!</h2>`;
  },

  displayTravelerTrips(SingleTravelerTrips, destinationsData) {
    const singleTravelersTrips = document.querySelector("#traveler-trips");
    // console.log(SingleTravelerTrips.length);
    return SingleTravelerTrips.map(trip => {
      // console.log('trip', trip);
      destinationsData.forEach(destination => {
        if(trip.destinationID === destination.id) {
         return singleTravelersTrips.insertAdjacentHTML("beforeend", `<p>Location: ${destination.destination}<p>
          <p>Total Travelers: ${trip.travelers}<p>
          <p>Travel date: ${trip.date}, and lasted for ${trip.duration} days!<p>`)  
        }
      })
    })
  },

  displayTotalCostOfTrips(totalCostOfTrips) {
    const travelerCosts = document.querySelector("#traveler-Cost-Section");
    travelerCosts.innerHTML = `<h3>For 2020, you have spent $${totalCostOfTrips} on travel</h3>`;
  },

  // displaySingleLodgingCosts(singleTravelerLodgingCost) {
  //   const travelerLodgingCosts = document.querySelector("#traveler-lodging-Cost-Section");
  //   travelerLodgingCosts.innerHTML = `<h3>Of that total, $${singleTravelerLodgingCost} was spent on lodging,</h3>`;
  // },

  // displaySingleFlightCosts(singleTravelerFlightCost){
  //   const travelerFlightCosts = document.querySelector("#traveler-flights-Cost-Section");
  //   travelerFlightCosts.innerHTML = `<h3>and $${singleTravelerFlightCost} was spent on flights</h3>`;
  // },

   

};

export default domUpdates;
