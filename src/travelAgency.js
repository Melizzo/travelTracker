import Traveler from '../src/traveler.js'
import moment from 'moment';

class TravelAgency extends Traveler {
  constructor(travelerData, tripsData, destinationsData, travelersData) {
    super(travelerData, tripsData, destinationsData); 
    this.travelerData = []
    this.travelersData = this.checkIfDataIsArray(travelersData)
    this.todaysDate = moment().format('YYYY/MM/DD')
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

  // searchTravelers(name) {
  //   const foundTraveler = travelAgent.findSingleTraveler(name);
  //   // use the found the traveler to get each piece of the data
  //   // instaniate the new traveler
  //   this.travelerData = [foundTraveler]
  //   console.log(foundTraveler);
  
  //   const newTraveller = new Traveler(foundTraveler.travelerData, foundTraveler.tripsData, foundTraveler.destinationsData);
  //   console.log(newTraveller);
    
        // have different functions to find the data for each traveler, ie find trips,
        // those functions would go in as arguments into the new traveler instanitation
        

  //   // console.log('SearchedTravelerData', this.travelerData);
  //   // this.tripsData = this.findTravelerTrips()
  //   // console.log(this.findTravelerTrips());
  //   // const totalLodgingCost = this.calculateTotalLodgingCost()
  //   // console.log('single traveler lodging', this.calculateTotalLodgingCost());
  //   // const totalFlightCost = this.calculateTotalFlightsCost()
  //   // console.log('single traveler flights', this.calculateTotalFlightsCost());
  //   // const totalCost = this.calculateTotalCostOfTrips(totalLodgingCost, totalFlightCost)
  //   // console.log('total cost', this.calculateTotalCostOfTrips(totalLodgingCost, totalFlightCost));
  //   // const agencyCut = this.calculateTravelAgency10PercentFee(totalCost)
  //   // console.log(agencyCut);
    
  //   // const totalTravelerData = [...this.travelerData,...this.tripsData]
  //   // console.log(totalTravelerData);
  // }

  findSingleTraveler(name) {
    const lowerCaseName = name.toLowerCase()
    return this.travelersData.find(traveler => traveler.name.toLowerCase().includes(lowerCaseName))
  }
}

export default TravelAgency;