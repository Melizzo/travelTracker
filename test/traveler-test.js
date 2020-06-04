import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/traveler.js'
import travelerData from './traveler-data-test.js'
import tripsData from './tripsData-test.js';

describe('Traveler', function() {
let traveler;
let travelerData;
let tripsData;

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
  expect(traveler.travelerData).to.equal('Error, data for traveler\'s cannot be found.')
});

})