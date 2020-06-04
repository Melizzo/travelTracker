class Traveler {
  constructor(travelerData, tripsData, destinationsData) {
    this.travelerData = this.checkIfDataIsArray(travelerData)
    this.tripsData = this.checkIfDataIsArray(tripsData)
    this.destinationsData = this.checkIfDataIsArray(destinationsData)
  }

  checkIfDataIsArray(data) {
    return data instanceof Array ? data : "Error, data for traveler\'s data cannot be found."
  }

  findTravelerTrips() {
    return this.tripsData.reduce((travelerTrips, trip) => {
     this.travelerData.forEach(traveler => {
       trip.userID === traveler.id ? travelerTrips.push(trip) : null
     })
     return travelerTrips
    }, [])
  }

  calculateTotalCostSingleTravelerTrips() {

  }

}

export default Traveler;