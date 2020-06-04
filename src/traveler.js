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

  calculateTotalLodgingCostPerTrip() {
    const travelerTrips = this.findTravelerTrips()
    return travelerTrips.reduce((totalLodging, trip) => {
      this.destinationsData.forEach(destination => {
        if(trip.destinationID === destination.id) {
          totalLodging += trip.duration * destination.estimatedLodgingCostPerDay
        } 
      })
      return totalLodging
    }, 0)
  }

  calculateTotalFlightCostPerTrip() {
    const travelerTrips = this.findTravelerTrips()
    return travelerTrips.reduce((totalFlightCost, trip) => {
      this.destinationsData.forEach(destination =>{
        if(trip.destinationID === destination.id) {
          totalFlightCost += trip.travelers * destination.estimatedFlightCostPerPerson
        }
      })
      return totalFlightCost
    }, 0)
  }

  calculateTotalCostOfTrips(num1, num2) {
    return (this.calculateTotalLodgingCostPerTrip() + this.calculateTotalFlightCostPerTrip())
  }

  calculateTravelAgency10PercentFee(num) {
    return (0.10 * num)
  }

}

export default Traveler;