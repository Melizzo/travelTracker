// QuerySelectors

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

  displayTravelerWelcome(firstName) {
    const travelerHeaderWelcome = document.querySelector("#traveler-Header");
    travelerHeaderWelcome.innerHTML = `<h2>Your adventure awaits ${firstName}!</h2>`;
  },

  displayTravelerTrips(singleTravelerTrips, destinationsData) {
    const singleTravelersTrips = document.querySelector("#traveler-trips");
    singleTravelerTrips.forEach(trip => {
      destinationsData.forEach(destination => {
        if(trip.destinationID === destination.id) {
          singleTravelersTrips.innerHTML += `<p>${destination.destination}: ${trip.destinationID}<p>`
        }
      })
    })
  },

  displayTotalCostOfTrips(totalCostOfTrips) {
    const travelerCosts = document.querySelector("#traveler-Cost-Section");
    travelerCosts.innerHTML = `<h3>For 2020, you have spent $${totalCostOfTrips}</h3>`;
  },

  displaySingleFlightCosts(singleTravelerLodgingCost) {
    const travelerLodgingCosts = document.querySelector("#traveler-lodging-Cost-Section");
    travelerLodgingCosts.innerHTML = `<h3>Of that total, $${singleTravelerLodgingCost} was spent on lodging,</h3>`;
  },

  displaySingleFlightCosts(singleTravelerFlightCost){
    const travelerFlightCosts = document.querySelector("#traveler-flights-Cost-Section");
    travelerFlightCosts.innerHTML = `<h3>and $${singleTravelerFlightCost} was spent on flights</h3>`;
  },

   

};

export default domUpdates;
