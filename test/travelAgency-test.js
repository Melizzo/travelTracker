import chai from 'chai';
const expect = chai.expect;

import TravelAgency from '../src/travelAgency.js'
import travelersData from './travelersData-test.js'
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
    expect(travelAgent.travelersData).to.equal('Error, data for traveler\'s data cannot be found.')

    const travelAgent2 = new TravelAgency(travelerData, tripsData, destinationsData, travelersData)
    expect(travelAgent2.checkIfDataIsArray(travelersData)).to.equal(travelersData)
    expect(travelAgent2.travelersData).to.deep.equal(travelersData)
  });

  it('should have a method to find the total cost of lodging for all travelers', function() {
    expect(travelAgent.calculateTotalLodgingCost()).to.equal(5860)
  });

  it('should have a method to find the total cost of flights for all travelers', function() {
    expect(travelAgent.calculateTotalFlightsCost()).to.equal(38890)
  });

  it('should have a method to find the total cost of every trip', function() {
    expect(travelAgent.calculateTotalCostOfTrips(6420, 42090)).to.equal(48510)
  });

  it('should have a method to find the 10% Travel Agency fees', function() {
    expect(travelAgent.calculateTravelAgency10PercentFee(48510)).to.equal(4851)
  });

  it('should be able to find all pending Trips', function() {
    expect(travelAgent.findPendingTrips()).to.deep.equal([
      {
       "date": "2019/06/15",
       "destinationID": 5,
       "duration": 8,
       "id": 1,
       "status": "pending",
       "suggestedActivities": [],
       "travelers": 1,
       "userID": 1
      }
    ])
  });

  it('should be able to find a total of how many travelers on currently on a trip', function() {
    expect(travelAgent.findTotalNumTravelersCurrentlyOnATrip()).to.equal('There are no current traveler\'s')
  });

  it('should be able abe to find a traveler by name', function() {
    expect(travelAgent.findSingleTravelerInformation('Tiffy')).to.deep.equal({ 
     "destinationData": [
        {
          "alt": "overview of city buildings with a clear sky",
          "destination": "Lima, Peru",
          "estimatedFlightCostPerPerson": 400,
          "estimatedLodgingCostPerDay": 70,
          "id": 1,
          "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
        }
      ],
      "travelerFound": {
        "id": 5,
        "name": "Tiffy Grout",
        "travelerType": "thrill-seeker",
      },
      "tripsData": [
        {
          "date": "2019/09/16",
          "destinationID": 1,
          "duration": 8,
          "id": 1,
          "status": "approved",
          "suggestedActivities": [],
          "travelers": 1,
          "userID": 5
        }
      ]
    })
  });
})