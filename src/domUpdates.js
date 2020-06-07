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

  displayTentativeTrip(trip, destinationsData) {
    
  }

  displayTravelerWelcome(firstName) {
    const travelerHeaderWelcome = document.querySelector("#traveler-Header");
    travelerHeaderWelcome.innerHTML = `<h2>Your adventure awaits ${firstName}!</h2>`;
  },

  displayTravelerTrips(SingleTravelerTrips, destinationsData) {
    const singleTravelersTrips = document.querySelector("#traveler-trips");
    console.log(SingleTravelerTrips.length);
    return SingleTravelerTrips.map(trip => {
      console.log('trip', trip);
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
