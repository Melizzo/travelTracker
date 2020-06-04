import Traveler from '../src/traveler.js'

class TravelAgency extends Traveler {
  constructor(travelerData, tripsData, destinationsData, travelersData) {
    super(travelerData, tripsData, destinationsData); 
    this.travelersData = this.checkIfDataIsArray(travelersData)
  }
  checkIfDataIsArray(data) {
    return data instanceof Array ? data : "Error, data for all the traveler\'s cannot be found."
  }

  

}

export default TravelAgency;