import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/traveler.js'
import travelerData from './traveler-data-test.js'
import tripsData from './tripsData-test.js';

describe('Traveler', function() {
let traveler;

beforeEach(() => {
  traveler = new Traveler(travelerData, tripsData);
});

it('should be a function', function() {
  expect(Traveler).to.be.a('function');
});

it('should be an instance of a Traveler', function() {
  expect(traveler).to.be.an.instanceof(Traveler);
});

it('should return an error message if there is no traveler data', function() {
  traveler = new Traveler()
  expect(traveler.travelerData).to.equal('Error, data for traveler\'s data cannot be found.')
});

it('should return an error message if there is no trips data', function() {
  traveler = new Traveler()
  expect(traveler.tripsData).to.equal('Error, data for traveler\'s data cannot be found.')
});

it('should have a method that determines whether data passed in is an array', function() {
  traveler = new Traveler('horse')
  expect(traveler.checkIfDataIsArray('horse')).to.equal('Error, data for traveler\'s data cannot be found.')
  expect(traveler.travelerData).to.equal('Error, data for traveler\'s data cannot be found.')

  const traveler2 = new Traveler(travelerData, tripsData)
  expect(traveler2.checkIfDataIsArray(travelerData)).to.equal(travelerData)
  expect(traveler2.checkIfDataIsArray(tripsData)).to.equal(tripsData)
  expect(traveler2.travelerData).to.deep.equal(travelerData)
  expect(traveler2.tripsData).to.deep.equal(tripsData)
});

it('should be able to find a traveler\'s trips', function() {
  expect(traveler.findTravelerTrips()).to.deep.equal([
    {
    "id": 4,
    "userID": 1,
    "destinationID": 14,
    "travelers": 2,
    "date": "2020/02/25",
    "duration": 10,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 1,
    "userID": 1,
    "destinationID": 49,
    "travelers": 1,
    "date": "2019/09/16",
    "duration": 8,
    "status": "approved",
    "suggestedActivities": []
    }
  ])
})

it('should be able to total the cost of all the travel\'s trips', function() {
  expect(traveler.calculateTotalCostSingleTravelerTrips()).to.equal()
})


})