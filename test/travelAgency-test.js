import chai from 'chai';
const expect = chai.expect;

import TravelAgency from '../src/travelAgency.js'
import travelersData from './travelersData-test.js'
// import Traveler from '../src/traveler.js'
import travelerData from './traveler-data-test.js'
import tripsData from './tripsData-test.js';
import destinationData from './destinationData-test.js'

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
    expect(travelAgent.travelersData).to.equal('Error, data for all the traveler\'s cannot be found.')
  }); 

  it('should have a method that determines whether data passed in is an array', function() {
    travelAgent = new TravelAgency('horse')
    expect(travelAgent.checkIfDataIsArray('horse')).to.equal('Error, data for all the traveler\'s cannot be found.')
    expect(travelAgent.travelerData).to.equal('Error, data for all the traveler\'s cannot be found.')

    const travelAgent2 = new TravelAgency(travelerData, tripsData, destinationData, travelersData)
    expect(travelAgent2.checkIfDataIsArray(travelersData)).to.equal(travelersData)
    expect(travelAgent2.travelersData).to.deep.equal(travelersData)
  });
})