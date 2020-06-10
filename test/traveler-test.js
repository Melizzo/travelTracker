import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/traveler.js'
import travelerData from './traveler-data-test.js'
import tripsData from './tripsData-test.js';
import destinationData from './destinationData-test.js'

describe('Traveler', function() {
let traveler;

  beforeEach(() => {
    traveler = new Traveler(travelerData, tripsData, destinationData);
  });

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of a Traveler', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should return an error message if there is no traveler data', function() {
    traveler = new Traveler()
    expect(traveler.travelerData).to.equal('Error, data for the traveler cannot be found.')
  });

  it('should return an error message if there is no trips data', function() {
    traveler = new Traveler(travelerData)
    expect(traveler.tripsData).to.equal('Error, data for traveler\'s data cannot be found.')
  });

  it('should return an error message if there is no destinations data', function() {
    traveler = new Traveler(travelerData, tripsData)
    expect(traveler.destinationsData).to.equal('Error, data for traveler\'s data cannot be found.')
  });

  it('should have a method that determines whether data passed in is the correct data', function() {
    traveler = new Traveler('horse')
    expect(traveler.checkIfDataIsAnObject('horse')).to.equal('Error, data for the traveler cannot be found.')
    expect(traveler.travelerData).to.equal('Error, data for the traveler cannot be found.')

    const traveler2 = new Traveler(travelerData, tripsData, destinationData)
    expect(traveler2.checkIfDataIsAnObject(travelerData)).to.equal(travelerData)
    expect(traveler2.checkIfDataIsArray(tripsData)).to.equal(tripsData)
    expect(traveler2.checkIfDataIsArray(destinationData)).to.equal(destinationData)
    expect(traveler2.travelerData).to.deep.equal(travelerData)
    expect(traveler2.tripsData).to.deep.equal(tripsData)
    expect(traveler2.destinationsData).to.deep.equal(destinationData)
  });

  it('should find the traveler\'s first name', function() {
    expect(traveler.findTravelerFirstName()).to.equal('Ham')
  })

  it('should be able to find a traveler\'s trips', function() {
    expect(traveler.findTravelerTrips()).to.deep.equal([
      {
      "id": 4,
      "userID": 1,
      "destinationID": 4,
      "travelers": 2,
      "date": "2020/06/04",
      "duration": 10,
      "status": "approved",
      "suggestedActivities": []
      },
      {
      "id": 1,
      "userID": 1,
      "destinationID": 5,
      "travelers": 1,
      "date": "2020/06/04",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
      },
      {
        "id": 1,
        "userID": 1,
        "destinationID": 5,
        "travelers": 1,
        "date": "2019/06/15",
        "duration": 8,
        "status": "pending",
        "suggestedActivities": []
        }
    ])
  })

  it('should be able to find the destinations that match with a traveler\'s trips', function() {
    expect(traveler.findDestinationsOfTravelersTrips()).to.deep.equal([{
      id: 4,
      destination: 'Cartagena, Colombia',
      estimatedLodgingCostPerDay: 65,
      estimatedFlightCostPerPerson: 350,
      image: 'https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      alt: 'boats at a dock during the day time'
    },
    {
      id: 5,
      destination: 'Madrid, Spain',
      estimatedLodgingCostPerDay: 150,
      estimatedFlightCostPerPerson: 650,
      image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      alt: 'city with clear skys and a road in the day time'
    }])
  })

  it('should be able to find pending trips', function() {
     expect(traveler.findPendingTrips()).to.deep.equal([{
      "id": 1,
      "userID": 1,
      "destinationID": 5,
      "travelers": 1,
      "date": "2019/06/15",
      "duration": 8,
      "status": "pending",
      "suggestedActivities": []
      }])
  })

  it('should be able to total the cost of all the travel\'s lodging per trip', function() {
    expect(traveler.calculateTotalLodgingCostPerTripThisYear(traveler.findTravelerTrips())).to.equal(1850)
  })

  it('should be able to total the cost of all the traveler\'s flights per trip', function() {
    expect(traveler.calculateTotalFlightCostPerTripThisYear(traveler.findTravelerTrips())).to.equal(1350)
  })

  it('should be able to total the cost of all the traveler\'s trip for 2020', function() {
    expect(traveler.calculateTotalCostOfTrips(traveler.calculateTotalFlightCostPerTripThisYear(), traveler.calculateTotalLodgingCostPerTripThisYear())).to.equal(3200)
  })

  it('should return an error if a number is not used', function() {
    expect(traveler.calculateTotalCostOfTrips('horse', [4000])).to.equal(`something is a amiss with the arguments`)
  })

  it('should be able to calculate the total cost of all trips', function() {
    expect(traveler.calculateTotalCostOfAllTrips()).to.equal(21100)
  })

  it('should be able to show the 10% Travel Agency fees', function() {
    expect(traveler.calculateTravelAgency10PercentFee(3200)).to.equal(320)
  })

  it('should return an error if a number is not used', function() {
    expect(traveler.calculateTravelAgency10PercentFee('Hello')).to.equal('Hello is not a number')
  })
})