import Traveler from '../src/traveler.js'

class TravelAgency extends Traveler {
  constructor(travelerData, tripsData, destinationsData, travelersData) {
    super(travelerData, tripsData, destinationsData); 
    this.travelerData = []
    this.travelersData = this.checkIfDataIsArray(travelersData)
  }

  calculateTotalLodgingCost() {
    return this.tripsData.reduce((totalLodging, trip) => {
      this.destinationsData.forEach(destination => {
        if(trip.destinationID === destination.id) {
          totalLodging += trip.duration * destination.estimatedLodgingCostPerDay
        } 
      })
      return totalLodging
    }, 0)
  }

  calculateTotalFlightsCost() {
    return this.tripsData.reduce((totalFlights, trip) => {
      this.destinationsData.forEach(destination => {
        if(trip.destinationID === destination.id) {
          totalFlights += trip.duration * destination.estimatedFlightCostPerPerson
        } 
      })
      return totalFlights
    }, 0)
  }

  findPendingTrips() {
    return this.tripsData.filter(trip => trip.status === 'pending');
  }

  findTotalNumTravelersCurrentlyOnATrip(date) {
    const travelers = this.tripsData.reduce((totalTravelers, trip) => {
      trip.date === date ? totalTravelers.push(trip) : null
      return totalTravelers
    }, [])
    return travelers.length
  }

  searchTravelersByName() {
      const travelerInformation = this.travelersData.map(traveler => {
        tripsData.find(trip => {
          if (traveler.id === trip.id) {
            traveler['name'] = trip.name
          }
        })
        return traveler
      })
      return travelerInformation
    } 
  }
}

export default TravelAgency;