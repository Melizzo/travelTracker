import ApiFetch from "./apiFetch"
import domUpdates from "./domUpdates"

class Traveler {
  constructor(travelerData, tripsData, destinationsData) {
    this.travelerData = this.checkIfDataIsAnObject(travelerData)
    this.tripsData = this.checkIfDataIsArray(tripsData)
    this.destinationsData = this.checkIfDataIsArray(destinationsData)
  }

  checkIfDataIsAnObject(data) {
    return data instanceof Object ? data : "Error, data for the traveler cannot be found."
  }

  checkIfDataIsArray(data) {
    return data instanceof Array ? data : "Error, data for traveler\'s data cannot be found."
  }

  findTravelerFirstName(){
    const firstName = this.travelerData.name.split(' ')[0]
    domUpdates.displayTravelerWelcome(firstName)
  }

  findTravelerTrips() {
    const singleTravelerTrips = this.tripsData.filter(trip => {
      if(trip.userID === this.travelerData.id) {
        return trip
      } 
    })
    domUpdates.displayTravelerTrips(singleTravelerTrips, this.destinationsData)
  }

  calculateTotalLodgingCostPerTripThisYear(array) {
    const singleTravelerLodgingCost = array.reduce((totalLodging, trip) => {
      this.destinationsData.forEach(destination => {
        if(trip.destinationID === destination.id && Number(trip.date.split('/')[0]) > 2019) {
          totalLodging += trip.duration * destination.estimatedLodgingCostPerDay
        } 
      })
      return totalLodging
    }, 0)
    domUpdates.displaySingleFlightCosts(singleTravelerLodgingCost)
    return singleTravelerLodgingCost 
  }

  calculateTotalFlightCostPerTripThisYear(array) {
    const singleTravelerFlightCost =  array.reduce((totalFlightCost, trip) => {
      this.destinationsData.forEach(destination =>{
        if(trip.destinationID === destination.id && Number(trip.date.split('/')[0]) > 2019) {
          totalFlightCost += trip.travelers * destination.estimatedFlightCostPerPerson
        }
      })
      return totalFlightCost
    }, 0)
    domUpdates.displaySingleFlightCosts(singleTravelerFlightCost)
    return singleTravelerFlightCost
  }

  calculateTotalCostOfTrips(num1, num2) {
    const totalCostOfTrips = num1 + num2
    domUpdates.displayTotalCostOfTrips(totalCostOfTrips);
  }

  calculateTravelAgency10PercentFee(num) {
    return (0.10 * num)
  }

  // createNewTrip{
    // build object {} here
  //   ApiFetch(object)
  // }

}

export default Traveler;