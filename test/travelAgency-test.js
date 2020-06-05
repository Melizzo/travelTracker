import chai from 'chai';
const expect = chai.expect;

import TravelAgency from '../src/travelAgency.js'
import travelersData from './travelersData-test.js'
// import Traveler from '../src/traveler.js'
import travelerData from './traveler-data-test.js'
import tripsData from './tripsData-test.js';
import destinationsData from './destinationData-test.js'

describe('TravelAgency', function() {
  let travelAgent;

  beforeEach(() => {
    travelAgent = new TravelAgency(travelerData, tripsData, destinationsData, travelersData);
  });

  it('should be a function', function() {
    expect(TravelAgency).to.be.a('function');
  });

  it('should be an instance of a TravelAgency', function() {
    expect(travelAgent).to.be.an.instanceof(TravelAgency);
  });

  it('should return an error message if there is no traveler data', function() {
    travelAgent = new TravelAgency()
    expect(travelAgent.travelersData).to.equal('Error, data for traveler\'s data cannot be found.')
  }); 

  it('should have a method that determines whether data passed in is an array', function() {
    travelAgent = new TravelAgency('horse')
    expect(travelAgent.checkIfDataIsArray('horse')).to.equal('Error, data for traveler\'s data cannot be found.')
    expect(travelAgent.travelerData).to.equal('Error, data for traveler\'s data cannot be found.')

    const travelAgent2 = new TravelAgency(travelerData, tripsData, destinationsData, travelersData)
    expect(travelAgent2.checkIfDataIsArray(travelersData)).to.equal(travelersData)
    expect(travelAgent2.travelersData).to.deep.equal(travelersData)
  });

  it('should have a method to find the total cost of lodging for all travelers', function() {
    expect(travelAgent.calculateTotalLodgingCost()).to.equal(6420)
  });

  it('should have a method to find the total cost of flights for all travelers', function() {
    expect(travelAgent.calculateTotalFlightsCost()).to.equal(42090)
  });

  it('should have a method to find the total cost of every trip', function() {
    expect(travelAgent.calculateTotalCostOfTrips(6420, 42090)).to.equal(48510)
  });

  it('should have a method to find the 10% Travel Agency fees', function() {
    expect(travelAgent.calculateTravelAgency10PercentFee(48510)).to.equal(4851)
  });

  it('should be able to find all pending Trips', function() {
    expect(travelAgent.findPendingTrips()).to.deep.equal([{
      "id": 2,
      "userID": 3,
      "destinationID": 2,
      "travelers": 5,
      "date": "2020/10/04",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
      },
      {
      "id": 3,
      "userID": 2,
      "destinationID": 3,
      "travelers": 4,
      "date": "2020/05/22",
      "duration": 17,
      "status": "pending",
      "suggestedActivities": []
      }
    ])
  });

  it('should be able to find a total of how many travelers on currently on a trip', function() {
    expect(travelAgent.findTotalNumTravelersCurrentlyOnATrip('2020/06/04')).to.equal(2)
  });

})