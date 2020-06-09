import Traveler from '../src/traveler.js'
import moment from 'moment';

class TravelAgency extends Traveler {
  constructor(travelerData, tripsData, destinationsData, travelersData) {
    super(travelerData, tripsData, destinationsData); 
    // this.travelerData = []
    this.travelersData = this.checkIfDataIsArray(travelersData)
    this.todaysDate = moment().format('YYYY/MM/DD')
  }

  calculateTotalLodgingCost() {
    return this.tripsData.reduce((totalLodging, trip) => {
      this.destinationsData.forEach(destination => {
        if(trip.destinationID === destination.id &&
          Number(trip.date.split("/")[0]) > 2019) {
          totalLodging += trip.duration * destination.estimatedLodgingCostPerDay
        } 
      })
      return totalLodging
    }, 0)
  }

  calculateTotalFlightsCost() {
    return this.tripsData.reduce((totalFlights, trip) => {
      this.destinationsData.forEach(destination => {
        if(trip.destinationID === destination.id &&
          Number(trip.date.split("/")[0]) > 2019) {
          totalFlights += trip.duration * destination.estimatedFlightCostPerPerson
        } 
      })
      return totalFlights
    }, 0)
  }
  
  findAllPendingTrips() {
    return this.tripsData.filter(trip => trip.status === 'pending');
  }

  findTotalNumTravelersCurrentlyOnATrip() {
    const travelers = this.tripsData.reduce((totalTravelers, trip) => {
      trip.date === this.todaysDate ? totalTravelers.push(trip) : null
      return totalTravelers
    }, [])
    if(travelers.length === 0) {
      return `There are no current traveler\'s`
    }
    return travelers.length
  }

  findSingleTraveler(name) {
    const lowerCaseName = name.toLowerCase()
    const travelerFound = this.travelersData.find(traveler => traveler.name.toLowerCase().includes(lowerCaseName))
    if(!travelerFound) {
      alert('Traveler not found!')
    }
    console.log(travelerFound);
    
    return travelerFound
  }
}

export default TravelAgency;